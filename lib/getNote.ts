import { notesType, tag } from "@/app/page";

type getNoteProps = {
  noteId: string;
  setNote: (note: notesType) => void;
} & Partial<displayDefaultNoteType>;

type displayDefaultNoteType = {
  setTags: (tags: tag[]) => void;
};

export async function getNote({
  noteId,
  setNote,
  setTags,
}: getNoteProps): Promise<void> {
  try {
    const res = await fetch(`/api/note/getNote/${noteId}`);
    const targetNote = await res.json();
    setNote(targetNote);
    if(setTags) setTags(targetNote?.tags)
  } catch (error) {
    console.log(error);
  }
}
