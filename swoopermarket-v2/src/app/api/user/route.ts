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
            host: 'smtp.gmail.com',
            port: 465, // or 465 if you're using SSL
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        await transporter.verify();
        // Email user a verification link
        // Determine if the environment is production
        const isProduction = process.env.NODE_ENV === 'production';
        // Use HTTPS in production or HTTP in development
        const protocol = isProduction ? 'https' : 'http';
        // Construct the verification link
        const verificationLink = `${protocol}://${req.headers.get('host')}/api/verify?token=${verificationToken}`;
        const mailOptions = {
            from: '"SwooperMarket"',
            to: email,
            subject: 'Verify Your Email',
            text: `Hello ${firstName},\nYour SwooperMarket Journey awaits!\nPlease click on the following link to verify your email: ${verificationLink}`,
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
