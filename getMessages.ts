import { sql } from '@vercel/postgres';
import { getMessages, sendMessage } from "@/types/messageType";
import { NextResponse } from "next/server";

// Endpoint to get messages
export const GET = async (req: Request, res: Response) => {
    try {
        const messages =  await sql`SELECT * FROM messages;`;
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};


// Endpoint to send a message
export const POST = async (req: Request, res: Response) => {
    try {
        const { message_id, userid, listing_id, text_msg } = await req.json();
        const message = await sql`INSERT INTO messages ((message_id, userid, listing_id, text_msg) VALUES ($1, $2, $3, $4)', [message_id, userid, listing_id, text_msg];`;
        return NextResponse.json({ message: "Message sent"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};


