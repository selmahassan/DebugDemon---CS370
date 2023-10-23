import { getListings, postListing } from "@/app/api/types/listingType";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export const GET = async (req: Request, res: Response) => {
    try {
        const listings = getListings();
        return NextResponse.json({message: "Listings: ", listings}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

export const POST = async (req: Request, res: Response) => {
    const {id, title, description, image, category, condition, price, pickup} = await req.json();
    
    try {
        const listing = {title, description, image, category, condition, price, pickup, date: new Date(), listingid: Date.now().toString()};
        
        try{
            const messages =  await sql`SELECT * FROM messages;`;
            return NextResponse.json({ messages }, { status: 200 });
        }
        catch(error) {
            return NextResponse.json({ message: "Error", error }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};