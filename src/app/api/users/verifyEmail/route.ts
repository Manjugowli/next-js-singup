import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModule";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken : token,
            verifyTokenExpiry : {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({ error : "User Not Found"} , { status : 400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return  NextResponse.json({ message : "user verified successfully"});
    } catch (error: unknown) {
        console.error("Error in verifying Email:", error);
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
          return NextResponse.json({ error: "An unknown error occurred" }, { status: 400 });
        }
      }
}