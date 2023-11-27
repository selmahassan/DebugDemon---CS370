import { sql } from "@vercel/postgres";
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!; // Ensure this is set in your .env.local file

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not set');
}

// Check valid user during login
export const POST = async (req: Request, res: Response) => {
    const { email, pass } = await req.json();

    try {
        // Fetch the user from the database
        const result = await sql`SELECT * FROM user_table WHERE email = ${email};`;

        // If user is not found, return an error response
        if (result.rows.length === 0) {
            return NextResponse.json({ message: "User not found. Please sign up." }, { status: 404 });
        }

        const user = result.rows[0];
      
        if (!user.verified) {
            // User's email is not verified, return an error message
            return NextResponse.json({ message: "Please verify email first. You may need to check spam folder" }, { status: 403 });
        }
        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(pass, user.pass);
        if (!passwordMatch) {
            // Passwords do not match, return an error message
            return NextResponse.json({ message: "Incorrect password. Please try again." }, { status: 401 });
        }

        // Passwords match, generate a JWT
        const token = jwt.sign({ id: user.userid,}, JWT_SECRET_KEY, {
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

        // After a successful password match
        const userData = {
            userid: user.userid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone
        };
        
        // Include userData in the JSON response
        const response = new NextResponse(JSON.stringify({
            message: "Logged in successfully",
            user: userData
        }), {
            headers: {
            'Set-Cookie': serializedCookie,
            },
            status: 200,
        });
        
        return response;
  

    } catch (error) {
        console.log("Caught error:", error);
        return NextResponse.json({ message: "Please try again.", error }, { status: 500 });
    }
};

// Fetch all users
export const GET = async (req: Request, res: Response) => {
    try {
        const result = await sql`SELECT * FROM user_table`;
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
