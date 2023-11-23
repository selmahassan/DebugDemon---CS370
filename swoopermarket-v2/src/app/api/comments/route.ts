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

export const DELETE = async (req: Request, res: Response) => {
    const {comment_id, user_id} = await req.json();
    let commentId = Number(comment_id)

    try {
        const result = await sql`DELETE FROM comments_table WHERE Comment_id = ${commentId} RETURNING *;`; 
        const deletedComment = result.rows;

        if(deletedComment.length == 0){
            return NextResponse.json({message: "Comment not found: ", deletedComment}, {status: 200});
        } else {
            return NextResponse.json({message: "Comment Deleted: ", deletedComment}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};
