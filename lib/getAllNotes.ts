import { notesType } from "@/app/page";

type getAllNotesParams = {
  session: any;
  setNotes: (notes: notesType[]) => void;
};

export async function getAllNotes({
  session,
  setNotes,
}: getAllNotesParams):Promise<void> {
    try {
        const res = await fetch(
          `http://localhost:3000/api/note/getAllNotes/${session?.user?.userId}`
        );
        const userNotes = await res.json();
        console.log("userNotes:", userNotes);
        setNotes(userNotes);
    } catch (error) {
        console.log(error)
    }
}
