import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// get listings for a specific user
export const GET = async (req: Request) => {
    try {
        const url_id = req.url.split("api/userlistings/")[1];
        
        const messages =  await sql`SELECT * FROM product_listing WHERE userid = ${url_id};`; 
        const user = messages.rows;

        return NextResponse.json({message: "Messages: ", user}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};