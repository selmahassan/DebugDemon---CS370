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
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    bio: string,
    phone: string,
}
