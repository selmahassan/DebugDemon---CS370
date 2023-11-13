import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// get all listings in DB
export const GET = async (req: Request, res: Response) => {
    try {
        const { rows } =  await sql`SELECT * FROM product_listing;`;
        return NextResponse.json({ rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

// post a new listing into DB
export const POST = async (req: Request, res: Response) => {
    const { searchParams } = new URL(req.url);

    const {userid, title, description, category, condition, price, pickup, image} = await req.json();

    try {// TODO: product_listing table doesnt have a condition or pickup column
        const messages = await sql`INSERT INTO product_listing (Userid, Product_name, Descr, Category_id, Price, Created_at, Modified_at, Listing_img, Pickup, Condition)
        VALUES (${userid}, ${title}, ${description}, ${category}, ${price}, NOW(), NOW(), ${image}, ${pickup}, ${condition});`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};