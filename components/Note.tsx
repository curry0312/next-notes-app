import { notesType } from "@/app/page";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { deleteNote } from "@/lib/deleteNote";

type NoteProps = {
  note: notesType;
};

export default function Note({ note }: NoteProps) {
  async function handleNoteDelete(note: notesType) {
    await deleteNote(note?.noteId);
  }

  return (
    <div className="relative">
      <IconButton
        className="absolute right-1 top-1 z-20"
        onClick={() => handleNoteDelete(note)}
      >
        <CloseIcon sx={{ fontSize: "20px", color: "black" }} />
      </IconButton>
      <Link
        href={`/note/${note.noteId}`}
        key={note.noteId}
        className="transtion relative flex flex-col rounded-2xl bg-white px-4 py-4 text-center duration-200 ease-in-out"
      >
        <h1 className="break-words font-Nunito text-2xl font-bold text-black line-clamp-1">
          {note.title}
        </h1>
        <p className="my-4 break-words px-2 font-Nunito text-black line-clamp-3">
          {note.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {note.tags.map((tag) => {
            return (
              <span
                key={tag.id}
                className="rounded-xl bg-blue-500 px-4 py-1 font-Nunito font-bold"
              >
                {tag.label}
              </span>
            );
          })}
        </div>
      </Link>
    </div>
  );
}
