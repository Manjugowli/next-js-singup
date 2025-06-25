import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request : NextRequest)=>{
    try {
       const token = request.cookies.get("token")?.value || "";
       // decode the token to get data
       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

       if (typeof decodedToken === "object" && decodedToken.id!) {
        return decodedToken.id;
      }
      throw new Error("Invalid token payload");
    } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Error occurred Fetching the Data from Token: ${error.message}`);
        } else {
          throw new Error("An unexpected error occurred Fetching the Data from Token");
        }
      }
}