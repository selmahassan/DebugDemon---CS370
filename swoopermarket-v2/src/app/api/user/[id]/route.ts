import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// get listings for a specific user
export const GET = async (req: Request) => {
    try {
        const url_id = req.url.split("api/user/")[1];
        
        const messages =  await sql`SELECT userid, first_name, last_name, email, phone, profile_img, bio FROM user_table WHERE userid = ${url_id};`; 
        const user = messages.rows;

        if(user.length == 0){
            return NextResponse.json({message: "User not found: ", user}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", user}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};

// edit a user's info
export const PUT = async (req: Request, res: Response) => {
    const {first_name, last_name, phone, image, bio} = await req.json();
    
    try {
        const url_id = req.url.split("api/user/")[1];

        const messages =  await sql`UPDATE user_table 
            SET first_name = ${first_name}, 
                last_name = ${last_name},
                phone = ${phone},
                profile_img = ${image},
                bio = ${bio}
            WHERE userid = ${url_id} 
            RETURNING *;`;
        const product = messages.rows;

        if(product.length == 0){
            return NextResponse.json({message: "User not found: ", product}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", product}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

// delete a user
export const DELETE = async (req: Request, res: Response) => {
    try {
        const url_id = req.url.split("api/user/")[1];

        const messages =  await sql`DELETE FROM user_table WHERE userid = ${url_id} RETURNING *;`; 
        const user = messages.rows;

        if(user.length == 0){
            return NextResponse.json({message: "User not found: ", user}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", user}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};