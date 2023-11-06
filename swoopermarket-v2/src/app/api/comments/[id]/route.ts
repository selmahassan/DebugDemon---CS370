import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// fetch comments of specific listing
export const GET = async (req: Request) => {
    try {
        const url_id = req.url.split("api/listing/")[1];
        let listing_id = parseInt(url_id);

        const messages =  await sql`SELECT * FROM comments WHERE Listing_id = ${listing_id} ORDER BY created_at ASC;`; 
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

// post a new comment into DB
export const POST = async (req: Request, res: Response) => {
    const {commentText, userId, listingId} = await req.json();
    
    let comment = String(commentText)

    try {

        const url_id = req.url.split("api/listing/")[1];
        let listing_id = parseInt(url_id);

        const messages = await sql`INSERT INTO comments (Comment_text, Product_listing_id, User_id) 
        VALUES (${comment}, ${listingId}, ${userId});`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

// delete specific comment TODO : need comment_id & user_id + call from frontend
export const DELETE = async (req: Request, res: Response) => {
    const {listingId, userId, timestamp} = await req.json();

    let user_Id = 3

    try { // TODO : how do I know which comment to delete if they commented multiple times?? Can you add to cookies the comments' comment_id?
        const url_id = req.url.split("api/listing/")[1];
        const listing_id = parseInt(url_id);

        const comment = await sql`DELETE FROM comments WHERE Listing_id = ${listingId} AND User_id = ${user_Id} AND Created_at = ${timestamp} RETURNING *;`; 
        const comments = comment.rows;

        if(comments.length == 0){
            return NextResponse.json({message: "Comment not found: ", comments}, {status: 200});
        } else {
            return NextResponse.json({message: "Comment Deleted: ", comments}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};