export type Listing = {
    title: string,
    description: string,
    category: number,
    condition: string,
    price: number,
    pickup: string,
    image: string
    userid: string
}

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    bio: string,
    phone: string,
}

export type Comment = {
    comment_text : string;
    listing_id : number;
    user_id : number;
}
