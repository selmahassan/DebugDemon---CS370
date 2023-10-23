import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const GET = async (req: Request, res: Response) => {
    try {
        const listings =  await sql`SELECT * FROM product_listing;`;
        return NextResponse.json({message: "Listings: ", listings}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

export const POST = async (req: Request, res: Response) => {
    const {Listing_id, Userid, Product_name, Descr, Category_id, Inventory_id, Price, Created_at, Modified_at, Sold_at, Listing_img} = await req.json();
    try {
        const listing = await sql`INSERT INTO product_listing ((Listing_id, Userid, Product_name, Descr, Category_id, Inventory_id, 
                Price, Created_at, Modified_at, Sold_at, Listing_img) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
                [Listing_id, Userid, Product_name, Descr, Category_id, Inventory_id, 
                    Price, Created_at, Modified_at, Sold_at, Listing_img];`;
        return NextResponse.json({message: "Listing: ", listing}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};
