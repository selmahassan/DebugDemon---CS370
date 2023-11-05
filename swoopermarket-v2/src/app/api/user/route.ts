import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// get all user profiles in DB
export const GET = async (req: Request, res: Response) => {
    try {
        const messages =  await sql`SELECT * FROM user_table;`;
        const users = messages.rows

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

// add a new user to the DB
export const POST = async (req: Request, res: Response) => {
    const {userid, firstName, lastName, email, password} = await req.json();

    try {
        const messages =  await sql`INSERT INTO user_table (pass, first_name, last_name, email) VALUES (${password}, ${firstName}, ${lastName}, ${email});`;
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};
