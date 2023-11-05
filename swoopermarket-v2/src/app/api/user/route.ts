import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // You can adjust the number of rounds as necessary

// add a new user to the DB with hashed password
export const POST = async (req: Request, res: Response) => {
    const { userid, firstName, lastName, email, password } = await req.json();

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const result = await sql`
            INSERT INTO user_table (userid, first_name, last_name, email, pass)
            VALUES (${userid}, ${firstName}, ${lastName}, ${email}, ${hashedPassword});
        `;
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
