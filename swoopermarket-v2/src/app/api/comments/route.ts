import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// post a new comment into DB
export const POST = async (req: Request, res: Response) => {
    const {comment_text, user_id, listing_id} = await req.json();

    console.log("POST reached")
    console.log(comment_text)
    console.log(user_id)
    console.log(listing_id)
    
    let comment = String(comment_text)
    let userID = Number(user_id)
    let listingID = Number(listing_id)

    try {
        const messages = sql`INSERT INTO comments_table (Comment_text, Listing_id, User_id) 
        VALUES (${comment}, ${listingID}, ${userID});`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

// fetch comments of specific listing
// export const GET = async (req: Request) => {
//     console.log("reached api");
//     try {
//         const url_id = req.url.split("api/comment/")[1];
//         let listing_id = parseInt(url_id);
//         console.log(listing_id);

//         const messages = sql`SELECT * FROM comments_table WHERE Listing_id = ${listing_id} ORDER BY created_at ASC;`; 
//         const comments = messages.rows;

//         if(comments.length == 0){
//             return NextResponse.json({message: "No Comments: ", comments}, {status: 200});
//         } else {
//             return NextResponse.json({message: "Messages: ", comments}, {status: 200});
//         }

//     } catch (error) {
//         return NextResponse.json({message: "Error", error}, {status: 500});
//     }

// };