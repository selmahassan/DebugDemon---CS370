export type Listing = {
    listingid: number,
    title: string,
    description: string,
    category: number,
    condition: string,
    price: number,
    pickup: string
}

export type User = {
    userid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    bio: string
}

export type Comment = {
    comment_id : number;
    comment_text : string;
    listing_id : number;
    user_id : number;
}