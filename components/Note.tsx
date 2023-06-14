import { notesType } from "@/app/page";
import Link from "next/link";
import React from "react";

type NoteProps = {
  note: notesType;
};

export default function Note({ note }: NoteProps) {
  return (
    <Link
      href={`/note/${note.noteId}`}
      key={note.noteId}
      className="flex flex-col text-center px-4 py-4 bg-white rounded-2xl"
    >
      <h1 className="text-black text-2xl font-bold font-Nunito break-words line-clamp-1">
        {note.title}
      </h1>
      <p className="text-black font-Nunito break-words line-clamp-2 px-2 my-4">
        {note.description}
      </p>
      <div className="flex items-center gap-2 flex-wrap mt-auto">
        {note.tags.map((tag) => {
          return (
            <span
              key={tag.id}
              className="px-4 py-1 bg-blue-500 rounded-xl font-bold font-Nunito"
            >
              {tag.label}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
