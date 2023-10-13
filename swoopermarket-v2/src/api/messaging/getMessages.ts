import { getMessages, sendMessage } from "@/types/messageType";
import { NextResponse } from "next/server";

// Endpoint to get messages
export const GET = async (req: Request, res: Response) => {
    try {
        const messages = getMessages(); // Replace with your function to retrieve messages
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

// Endpoint to send a message
export const POST = async (req: Request, res: Response) => {
    try {
        const { sender, receiver, text } = await req.json();
        const message = {
            sender,
            receiver,
            text,
            timestamp: new Date(),
        };
        sendMessage(message);
        return NextResponse.json({ message: "Message sent"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};