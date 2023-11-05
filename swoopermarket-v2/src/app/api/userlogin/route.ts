import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (req: Request, res: Response) => {
    const { email, pass } = await req.json();

    try {
        // Fetch the user from the database based on the provided email
        const result = await sql`SELECT email, pass FROM user_table WHERE email = ${email};`;

        // If user is not found, return an error response
        if (result.rows.length === 0) {
            return NextResponse.json({ message: "User Not Found, Please sign up" }, { status: 404 });
        }
        
        const user = result.rows[0];

        // Compare the hashed password from the DB with the provided password
        const passwordMatch = await bcrypt.compare(pass, user.pass);
        if (passwordMatch) {
            // Passwords match, login successful
            return NextResponse.json({ message: "Logged in successfully" }, { status: 200 });
        } else {
            // Passwords don't match, login failed
            return NextResponse.json({ message: "Invalid password, Please Try Again" }, { status: 401 });
        }

    } catch (error) {
        console.log("Caught error:", error);
        return NextResponse.json({ message: "Please Try Again", error }, { status: 500 });
    }
};

