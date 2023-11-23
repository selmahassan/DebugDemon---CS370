import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// fetch specific listing
export const GET = async (req: Request) => {
    try {
        const url_id = req.url.split("api/listing/")[1];
        let listing_id = parseInt(url_id);

        const messages =  await sql`SELECT * FROM product_listing WHERE Listing_id = ${listing_id};`; 
        const product = messages.rows;

        if(product.length == 0){
            return NextResponse.json({message: "Listing not found: ", product}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", product}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};

// edit listing 
export const PUT = async (req: Request, res: Response) => {
    const {title, description, category, condition, price, pickup, image, sold} = await req.json();
    
    try {
        const url_id = req.url.split("api/listing/")[1];
        let listing_id = parseInt(url_id);

        const messages =  await sql`UPDATE product_listing 
            SET product_name = ${title}, 
                descr = ${description}, 
                category_id = ${category}, 
                price = ${price},
                modified_at = NOW(),
                listing_img = ${image},
                pickup = ${pickup},
                condition = ${condition},
                sold = ${sold}
            WHERE listing_id = ${listing_id} 
            RETURNING *;`;
        const product = messages.rows;

        if(product.length == 0){
            return NextResponse.json({message: "Listing not found: ", product}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", product}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

// delete specific listing
export const DELETE = async (req: Request, res: Response) => {
    try {
        const url_id = req.url.split("api/listing/")[1];
        const listing_id = parseInt(url_id);

        const messages =  await sql`DELETE FROM product_listing WHERE listing_id = ${listing_id} RETURNING *;`; 
        const product = messages.rows;

        if(product.length == 0){
            return NextResponse.json({message: "Listing not found: ", product}, {status: 200});
        } else {
            return NextResponse.json({message: "Messages: ", product}, {status: 200});
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};