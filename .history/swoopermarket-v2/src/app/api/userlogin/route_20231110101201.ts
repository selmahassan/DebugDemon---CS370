import { sql } from "@vercel/postgres";
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!; // Ensure this is set in your .env.local file

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not set');
}

export const POST = async (req: Request, res: Response) => {
    const { userid, email, pass, first_name } = await req.json();

    try {

        // Fetch the user from the database
        const result = await sql`SELECT * FROM user_table WHERE email = ${email};`;

        // If user is not found, return an error response
        if (result.rows.length === 0) {
            return NextResponse.json({ message: "User Not Found, Please sign up" }, { status: 404 });
        }

        const user = result.rows[0];

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(pass, user.pass);
        if (!passwordMatch) {
            // Passwords do not match, return an error message
            return NextResponse.json({ message: "Incorrect password. Please Try Again" }, { status: 401 });
        }

        // Passwords match, generate a JWT
        const token = jwt.sign({ id: user.id, email: user.email, name: user.first_name }, JWT_SECRET_KEY, {
            expiresIn: '2h', // Token expires in 2 hours
        });

        // Serialize the token into a cookie
        const serializedCookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7200, // 2 hours in seconds
            sameSite: 'strict',
            path: '/',
        });

        // Create a NextResponse object for a successful login
        const response = new NextResponse(JSON.stringify({ message: "Logged in successfully" }), {
            headers: {
                'Set-Cookie': serializedCookie,
            },
            status: 200,
        });

        // Return the response
        return response;

    } catch (error) {
        console.log("Caught error:", error);
        return NextResponse.json({ message: "Please Try Again", error }, { status: 500 });
    }
};
