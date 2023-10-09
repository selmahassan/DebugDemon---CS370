export type Listing = {
    listingid: string,
    title: string,
    description: string,
    image: string,
    category: string,
    condition: string,
    price: string,
    pickup: string
};

let listings: Listing[] = [];

//handlers
export const getListings = () => listings;

export const postListing = (listing: Listing) => {
    listings.push(listing)
};

export const deleteListing = (id: string) => {
    listings = listings.filter((listing) => listing.listingid !== id);
};

export const updateListing = (id: string, title: string, description: string, price: string) => {
    const listing = listings.find((listing) => listing.listingid === id);

    if(listing){
        listing.title = title;
        listing.description = description;
        listing.price = price;
    } else {
        throw new Error("No such listing found");
    }
};

export const getByID = (id: string) => {
    return listings.find((listing) => listing.listingid === id);
};

