import { sql } from "@vercel/postgres";
import { createClient } from '@vercel/postgres';
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const SALT_ROUNDS = 10;

// generate unique password reset token and send email to reset password
export const POST = async (req: Request, res: Response) => {
    const { email } = await req.json();

    const resetToken = uuidv4();

    // hash the reset token before saving to the database
    const hashedResetToken = await bcrypt.hash(resetToken, SALT_ROUNDS);

    // generate token expiry time (1 hour from when user submits email)
    const now = new Date();
    const oneHourInMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds
    const expiryTime = now.getTime() + oneHourInMilliseconds;

    try {
        const result = await sql`
            INSERT INTO password_reset_tokens (email, token, token_expiry)
            VALUES (${email}, ${hashedResetToken}, ${expiryTime});
        `;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // email user a unique reset password link
        const resetPasswordLink = `https://${req.headers.get('host')}/reset-password?token=${hashedResetToken}`;
        const mailOptions = {
            from: 'SwooperMarket@gmail.com',
            to: email,
            subject: 'Reset Your SwooperMarket Password',
            text: `Hello, 
Your SwooperMarket Journey awaits!
Please click on the following link to reset your password: ${resetPasswordLink}`, // DO NOT EDIT FORMATING, IT IS THIS WAY FOR THE EMAIL
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return NextResponse.json({ message: "Error sending email." }, { status: 500 });
            } else {
                console.log('Reset password email sent:', info.response);
                return NextResponse.json({ message: "An email with password reset instructions has been sent to your email address." });
            }
        });

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

// reset password (also conducts multiple checks prior to doing so)
export const PUT = async (req: Request, res: Response) => {
    const { newPassword } = await req.json();
    const url = new URL(req.url);
    const hashedToken = url.searchParams.get('token');
    const client = createClient();

    try {
        // Start a transaction to prevent race conditions
        await client.connect();
        await client.query('BEGIN');

        const result =  await client.sql`SELECT * FROM password_reset_tokens WHERE Token = ${hashedToken};`; 

        // token doesn't exist
        if(result.rows.length === 0){
            return NextResponse.json({message: "Invalid password reset token"}, {status: 500});
        }

        // token exists --> proceed forward
        const email = result.rows[0].email;
        
        // lock all rows in the table that belong to the email to prevent other transactions from altering or deleting those rows until the current transaction is completed
        const allTokensForEmail = await client.sql`SELECT * FROM password_reset_tokens WHERE Email = ${email} FOR UPDATE;`;

        // search for row that matches input token so that we know another transaction has not redeemed it already
        let matchedRow: any = null
        allTokensForEmail.rows.forEach((row :any) => {
            if(row.token === hashedToken) {
                matchedRow = row;
            }
        })

        // token has already been redeemed by another transaction
        if (matchedRow == null) {
            return NextResponse.json({message: "Invalid password reset token"}, {status: 500});
        }

        // delete all tokens belonging to email
        await client.sql`DELETE FROM password_reset_tokens WHERE Email = ${email};`;

        // check if current token has expired or not
        const now = new Date();
        const timeNow = now.getTime()
        if(matchedRow.Token_expiry < timeNow){
            await client.query('ROLLBACK');
            return NextResponse.json({message: "Token has expired. Please try again."}, {status: 400});
        }

        // after all checks: change user's password
        const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        try {
            // Fetch the user from the database using email
            const result = await client.sql`SELECT * FROM user_table WHERE email = ${email};`;

            // If user is not found, return an error response
            if (result.rows.length === 0) {
                return NextResponse.json({ message: "User not found." }, { status: 404 });
            }

            // Update the user's password in the database
            const updateResult = await client.sql`UPDATE user_table SET pass = ${hashedNewPassword} WHERE email = ${email} RETURNING *;`;

            if (updateResult.rows.length === 0) {
                return NextResponse.json({ message: "Failed to update password." }, { status: 500 });
            }

            const updatedUser = updateResult.rows[0];
            await client.query('COMMIT');

            return NextResponse.json({ message: "Password updated successfully", user: updatedUser }, { status: 200 });

        } catch (error) {
            return NextResponse.json({ message: "Error", error }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error during password resetting process.", error }, { status: 500 });
    } finally {
        await client.end();
    }
}