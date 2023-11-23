import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// post a new comment into DB
export const POST = async (req: Request, res: Response) => {
    const {comment_text, user_id, listing_id} = await req.json();

    console.log(comment_text)
    console.log(user_id)
    console.log(listing_id)
    let comment = String(comment_text)
    let userID = Number(user_id)
    let listingID = Number(listing_id)

    try {
        const messages = await sql`INSERT INTO comments_table (Comment_text, Listing_id, User_id) 
        VALUES (${comment}, ${listingID}, ${userID});`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};