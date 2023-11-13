import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const SALT_ROUNDS = 10; // 

// add a new user to the DB with hashed password
export const POST = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone } = await req.json();

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const verificationToken = uuidv4();

    try {
        const result = await sql`
            INSERT INTO user_table (first_name, last_name, email, pass, phone, verification_token)
            VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${phone}, ${verificationToken});
        `;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // Email user a verification link
        const verificationLink = `https://${req.headers.get('host')}/api/verify?token=${verificationToken}`;
        const mailOptions = {
            from: 'swoopermarket@gmail.com', // Replace with your email address
            to: email,
            subject: 'Verify Your Email',
            text: `Please click on the following link to verify your email: ${verificationLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return NextResponse.json({ message: "Error sending email." }, { status: 500 });
            } else {
                console.log('Verification email sent:', info.response);
                return NextResponse.json({ message: "User registered. Please check your email to verify your account." });
            }
        });


        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
