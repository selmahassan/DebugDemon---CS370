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
    phoneNumber: string,
    password: string,
    bio: string
}

export type Comment = {
    comment_text : string;
    listing_id : number;
    user_id : number;
}