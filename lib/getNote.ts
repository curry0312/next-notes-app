import { notesType } from "@/app/page";

export async function getNote(
  noteId: string,
  setNote: (note: notesType) => void
): Promise<void> {
  try {
    const res = await fetch(`http://localhost:3000/api/note/getNote/${noteId}`);
    const targetNote = await res.json();
    setNote(targetNote);
  } catch (error) {
    console.log(error)
  }
}
