import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModule";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { EmailType } from '@/constants'

connect();  

export async function POST(request: NextRequest){

  try {
    const body = await request.json();

    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // send Email to verify the user 
    await sendEmail({email,  emailType: EmailType.VERIFY, userId: savedUser._id})
    console.log("User Created Successfully", savedUser._id);

    return NextResponse.json({ message: "User created", savedUser }, { status: 201 });
  }catch (error: unknown) {
    console.error("❌ [signup] Uncaught error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};
