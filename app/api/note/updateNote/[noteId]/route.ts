import { connectToDB } from "@/db/connectToDB";
import Note from "@/models/note";
export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
    try {
        const noteId = params.noteId;
        const { title, description, tags } = await req.json();
        await connectToDB();
        const updateNote = await Note.updateOne(
          { noteId },
          { title, description, tags }
        );
        return new Response(JSON.stringify(updateNote), {
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
