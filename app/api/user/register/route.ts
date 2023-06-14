import { connectToDB } from "@/db/connectToDB";
import bcrypt from "bcrypt";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request, response: Response) {
  const { userId, email, password, username, image } = await request.json();
  console.log(
    "userId:",
    userId,
    "email:",
    email,
    "password:",
    password,
    "username:",
    username,
    "image:",
    image
  );
  try {
    await connectToDB();
    const currentUser = await User.findOne({ email });
    if (currentUser) console.log("user exist");
    try {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userId,
        email,
        password: hashpassword,
        username,
        image,
      });
      return NextResponse.json({
        msg: "New user create successfully!",
        newUser,
      });
    } catch (error) {
      return NextResponse.json({ error });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
