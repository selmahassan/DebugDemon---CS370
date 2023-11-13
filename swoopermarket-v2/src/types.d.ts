export type Listing = {
    title: string,
    description: string,
    category: number,
    condition: string,
    price: number,
    pickup: string,
    image: string
}

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    bio: string,
    phone: string,
}
