import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// post a new comment into DB
export const POST = async (req: Request, res: Response) => {
    const {comment_text, user_id, listing_id} = await req.json();
    
    let comment = String(comment_text)
    let userID = Number(user_id)
    let listingID = Number(listing_id)

    try {

        const users = await sql` SELECT First_name FROM user_table WHERE Userid = ${user_id}`;        
        const userName = users.rows[0].first_name;

        const messages = await sql`INSERT INTO comments_table (Comment_text, Listing_id, User_id, User_name) 
        VALUES (${comment}, ${listingID}, ${userID}, ${userName}) RETURNING *;`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};
