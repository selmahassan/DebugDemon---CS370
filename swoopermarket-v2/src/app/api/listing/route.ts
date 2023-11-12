import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// get all listings in DB
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
    const {title, description, image, category, condition, price, pickup} = await req.json();
    let user_id = 1 // TODO: remove hardcoded user-id

    try {// TODO: product_listing table doesnt have a condition or pickup column
        const messages = await sql`INSERT INTO product_listing (Userid, Product_name, Descr, Category_id, Price, Created_at, Modified_at, Pickup, Condition) 
        VALUES (${user_id}, ${title}, ${description}, ${category}, ${price}, NOW(), NOW(), ${pickup}, ${condition});`;
                
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.log("Caught error")
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};