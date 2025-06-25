
import { NextResponse , NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPath = path === "/login" || path === "/signup" || path ==="/verifyEmail";

    const token = request.cookies.get("token")?.value || "";
    
    if(publicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }
    if(!token && !publicPath){
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/singup",
    "/profile/:path*",
    "/verifyEmail"
  ],
}