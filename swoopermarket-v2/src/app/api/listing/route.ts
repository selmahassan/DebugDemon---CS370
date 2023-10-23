import { getListings, postListing } from "@/app/api/types/listingType";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Connection } from "pg";
import { json } from "stream/consumers";

export const GET = async (req: Request, res: Response) => {
    try {
        const messages =  await sql`SELECT * FROM messages;`;
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

export const POST = async (req: Request, res: Response) => {
    const {id, title, description, image, category, condition, price, pickup} = await req.json();
    console.log({title}, {description}, {image}, {category}, {price}, {pickup});

    let listing_id = 123
    let user_id = "selma"
    let product_name = String(title)
    let hard_description = String(description)
    let category_id = 1
    let hard_price = Number(price)

    try {
        const messages =  await sql`INSERT INTO product_listing (Listing_id, Userid, Product_name, Descr, Category_id, Price) VALUES (${listing_id}, ${user_id}, ${product_name}, ${hard_description}, ${category_id}, ${hard_price});`;
        
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};