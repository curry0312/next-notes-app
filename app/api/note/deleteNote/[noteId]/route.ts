import { connectToDB } from "@/db/connectToDB";
import Note from "@/models/note";

export async function GET(req:Request,{ params }: { params: { noteId: string } }) {
  try {
    const noteId = params.noteId;
    await connectToDB();
    const note = await Note.deleteOne({ noteId: noteId });
    return new Response(JSON.stringify(note), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
