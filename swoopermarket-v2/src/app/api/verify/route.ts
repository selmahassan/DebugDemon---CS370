import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    // Construct the full absolute URL for redirection
    const isProduction = process.env.NODE_ENV === 'production';
    // Use HTTPS in production or HTTP in development
    const protocol = isProduction ? 'https' : 'http';
    const host = req.headers.get('host'); // Get the host from the request headers
    const baseUrl = `${protocol}://${host}`;


    if (!token) {
        return NextResponse.json({ message: "Verification token is missing." } , { status: 400 });
    }

    try {
        // Update the user's verification status based on the token
        const result = await sql`
            UPDATE user_table
            SET verified = true
            WHERE verification_token = ${token}
            RETURNING *;
        `;

        if (result.rows.length > 0) {
            // Redirect to the login page using the full absolute URL
            const loginUrl = `${baseUrl}/login?isVerifySuccess=true`;
            return NextResponse.redirect(loginUrl);
        } else {
            return NextResponse.json({ message: "Invalid or expired token." }, { status: 404 });
        }
    } catch (error) {
        console.log("Caught error", error);
        return NextResponse.json({ message: "Error during verification process" }, { status: 500 });
    }
};
