import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModule";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        // get the id bu token
        const userId = await getDataFromToken(request);

        // get user info
        const user = await User.findOne({_id : userId}).select("-password");
        return NextResponse.json({
            message : "User Found",
            data : user
        })
    } catch (error: unknown) {
        console.error("Error in get user Info:", error);
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
          return NextResponse.json({ error: "An unknown error occurred" }, { status: 400 });
        }
      }
}