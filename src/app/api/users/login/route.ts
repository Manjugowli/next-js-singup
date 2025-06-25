import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModule";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const { email , password} = reqBody
        console.log(reqBody);

        // check if user exist 
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 });
        }
        // validaet password
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }
        
        // create tooken data
        const tokenData = { id : user._id , username : user.username , email : user.email }
        // create tooken
        const token = await jwt.sign( tokenData , process.env.TOKEN_SECRET!, {expiresIn : "1d"})

        const response = NextResponse.json({
            message : "Login Successfull",
            success : true
        })

        response.cookies.set("token", token ,{
            httpOnly : true,
        })
        return response;
    }catch (error: unknown) {
        console.error("Login Uncaught error:", error);
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
          return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
      }
}