import { getListings, postListing } from "@/types/listingType";
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
    const {title, description, price} = await req.json();
    try {
        const listing = {title, description, price, date: new Date(), id: Date.now().toString()};
        postListing(listing);
        return NextResponse.json({message: "Listing: ", listing}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};