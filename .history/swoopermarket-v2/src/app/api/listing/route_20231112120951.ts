import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

// get all listings in DB
// get all listings in DB
export const GET = async (req: Request, res: Response) => {
    try {
        const { rows } =  await sql`SELECT * FROM product_listing;`;
        return NextResponse.json({ rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

interface ListingRequestBody {
    title: string;
    description: string;
   // image: string;
    category: string;
    condition: string;
    price: number;
    pickup: string;
}

// Assuming you have an interface for the JWT payload
interface JwtPayload {
    id: string; // or whatever you named the user id field in the payload
}

// Define the structure of the response for a successful insertion
interface InsertResponse {
    // Define the structure based on your DB schema
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Extract the JWT token from the Authorization header
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
            userId = decoded.id;
        } catch (error) {
            return res.status(403).json({ message: "Invalid token." });
        }

        const { title, description, category, condition, price, pickup } = req.body as ListingRequestBody;

        try {
            // Insert the new listing into the database
            const result = await sql<InsertResponse[]>`
                INSERT INTO product_listing (userid, title, description, category, condition, price, pickup, created_at, modified_at) 
                VALUES (${userId}, ${title}, ${description}, ${category}, ${condition}, ${price}, ${pickup}, NOW(), NOW()) 
                RETURNING *;
            `;
        } catch (error) {
            console.log("Caught error", error);
            return res.status(500).json({ message: "Error inserting the listing", error });
        }
    } else {
        // If not a POST request, return method not allowed
        return res.status(405).json({ message: "Method not allowed" });
    }
}