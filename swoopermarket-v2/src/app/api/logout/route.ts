import { serialize } from 'cookie';
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) =>  {
    const response = NextResponse.next();

    // Use the cookie serializer to create the cookie string
    const cookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
    });

    // Set the cookie header
    response.headers.set('Set-Cookie', cookie);

    return NextResponse.json({ message: 'Logged out successfully' }, {status: 200});
};
