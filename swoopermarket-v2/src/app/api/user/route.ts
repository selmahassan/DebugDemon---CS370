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
    const {id, pass, first_name, last_name} = await req.json();

    let user_id = 1
    let password = "selma"
    let first = String(first_name)
    let last = String(last_name)

    try {
        const messages =  await sql`INSERT INTO user_table (Userid, pass, Descr, first_name, last_name) VALUES (${user_id}, ${password}, ${first}, ${last});`;
        
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};