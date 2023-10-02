type Listing = {
    id: string;
    title: string;
    description: string;
    price: number;
};

let listings: Listing[] = [];

//handlers
export const getListings = () => listings;

export const postListing = (listing: Listing) => {
    listings.push(listing)
};

export const deleteListing = (id: string) => {
    listings = listings.filter((listing) => listing.id !== id);
};

export const updateListing = (id: string, title: string, description: string, price: number) => {
    const listing = listings.find((listing) => listing.id === id);

    if(listing){
        listing.title = title;
        listing.description = description;
        listing.price = price;
    } else {
        throw new Error("No such listing found");
    }
};

export const getByID = (id: string) => {
    return listings.find((listing) => listing.id === id);
};

