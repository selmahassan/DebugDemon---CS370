import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server';

export type Listing = {
    listingid: number,
    title: string,
    description: string,
    category: string,
    condition: string,
    price: number,
};

let listings: Listing[] = [];

//handlers
export const getListings = () => listings;

export const postListing = (listing: Listing) => {
    
    listings.push(listing)
};

export const deleteListing = (id: number) => {
    listings = listings.filter((listing) => listing.listingid !== id);
};

export const updateListing = (id: number, title: string, description: string, price: number) => {
    const listing = listings.find((listing) => listing.listingid === id);

    if(listing){
        listing.title = title;
        listing.description = description;
        listing.price = price;
    } else {
        throw new Error("No such listing found");
    }
};

export const getByID = (id: number) => {
    return listings.find((listing) => listing.listingid === id);
};

