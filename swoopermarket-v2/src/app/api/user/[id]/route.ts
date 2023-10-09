import { deleteUser, getByID, updateUser } from "@/app/api/types/userType";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const userid = req.url.split("profile/")[1];
        const user = getByID(userid);

        if(!user){return NextResponse.json({message: "User does not exist"}, {status: 404});};
        return NextResponse.json({message: "User found: ", user}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }

};

export const PUT = async (req: Request, res: Response) => {
    const {name, image, username} = await req.json();
    try {
        const userid = req.url.split("profile/")[1];
        const user = getByID(userid);
        if(!user){return NextResponse.json({message: "User does not exist"}, {status: 404});};

        updateUser(userid, name, image, username);
        return NextResponse.json({message: "Updated User: ", user}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};

export const DELETE = async (req: Request, res: Response) => {
    try {
        const userid = req.url.split("profile/")[1];
        const user = getByID(userid);
        if(!user){return NextResponse.json({message: "User does not exist"}, {status: 404});};

        deleteUser(userid);
        return NextResponse.json({message: "Deleted User: ", user}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
};