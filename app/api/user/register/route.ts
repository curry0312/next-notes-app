import { connectToDB } from "@/db/connectToDB";
import bcrypt from "bcrypt";
import User from "@/models/user";

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
      return new Response(JSON.stringify(newUser), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}
