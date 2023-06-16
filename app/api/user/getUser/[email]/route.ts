import { connectToDB } from '@/db/connectToDB';
import User from "@/models/user";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    await connectToDB()
    const email = params.email;
    console.log("Email:",email);
    const user = await User.findOne({ email });
    if (!user) return new Response('User not !', {
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
    return new Response(JSON.stringify({userId:user.userId}), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({error}), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}
