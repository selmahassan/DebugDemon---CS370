import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// fetch comments for a specific listing
export const GET = async (req: Request) => {
    try {
        const url_id = req.url.split("api/comments/")[1];
        let listing_id = parseInt(url_id);

        const messages =  await sql`SELECT * FROM comments_table WHERE Listing_id = ${listing_id} ORDER BY created_at DESC;`; 
        const comments = messages.rows;

        if(comments.length == 0){
            return NextResponse.json({message: "No Comments: ", comments}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", comments}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};