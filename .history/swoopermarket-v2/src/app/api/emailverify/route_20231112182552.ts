// pages/api/verify.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
        return NextResponse.json({ message: "Verification token is missing." } , { status: 400 });
    }

    try {
        // Update the user's verification status based on the token
        const result = await sql`
            UPDATE user_table
            SET verified = true
            WHERE verification_token = ${token};
        `;

        if (result.rows.length === 1) {
            return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid or expired token." }, { status: 404 });
        }
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error during verification process" }, { status: 500 });
    }
};
