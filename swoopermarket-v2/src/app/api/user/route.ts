import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // 

// add a new user to the DB with hashed password
export const POST = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone } = await req.json();

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const result = await sql`
            INSERT INTO user_table (first_name, last_name, email, pass, phone)
            VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${phone);
        `;
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
