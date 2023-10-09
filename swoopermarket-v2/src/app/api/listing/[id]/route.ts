import { deleteListing, getByID, updateListing } from "@/app/api/types/listingType";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("newlisting/")[1];
        const listing = getByID(id);

        if(!listing){return NextResponse.json({message: "Listing does not exist"}, {status: 404});};
        return NextResponse.json({message: "Listing found: ", listing}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};

export const PUT = async (req: Request, res: Response) => {
    const {title, description, price} = await req.json();
    try {
        const id = req.url.split("newlisting/")[1];
        const listing = getByID(id);
        if(!listing){return NextResponse.json({message: "Listing does not exist"}, {status: 404});};

        updateListing(id, title, description, price);
        return NextResponse.json({message: "Updated Listing: ", listing}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

export const DELETE = async (req: Request, res: Response) => {
    try {
        const id = req.url.split("newlisting/")[1];
        const listing = getByID(id);
        if(!listing){return NextResponse.json({message: "Listing does not exist"}, {status: 404});};

        deleteListing(id);
        return NextResponse.json({message: "Deleted Listing: ", listing}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};