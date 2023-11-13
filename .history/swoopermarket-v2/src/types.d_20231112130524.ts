export type Listing = {
    title: string,
    description: string,
    category: number,
    condition: string,
    price: number,
    pickup: string,
    userid: number
}

export type User = {
    userid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    bio: string,
    phone: string,
}
