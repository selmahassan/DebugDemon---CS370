import { getUsers, postUser } from "@/app/api/types/userType";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export const GET = async (req: Request, res: Response) => {
    try {
        const users = getUsers();
        return NextResponse.json({message: "Users: ", users}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

export const POST = async (req: Request, res: Response) => {
    const {userid, name, image, username} = await req.json();
    
    try {
        const user = {name, image, username, date: new Date(), userid: Date.now().toString()};
        postUser(user);
        return NextResponse.json({message: "User: ", user}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};