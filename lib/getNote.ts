import { notesType } from "@/app/page";

export async function getNote(
  noteId: string,
  setNote: (note: notesType) => void
): Promise<void> {
  try {
    const res = await fetch(`/api/note/getNote/${noteId}`);
    const targetNote = await res.json();
    setNote(targetNote);
  } catch (error) {
    console.log(error)
  }
}
