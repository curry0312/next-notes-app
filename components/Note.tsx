"use client";

import { notesType } from "@/app/page";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { deleteNote } from "@/lib/deleteNote";
import { useState } from "react";

type NoteProps = {
  note: notesType;
};

export default function Note({ note }: NoteProps) {
  const [isNoteGetClicked, setIsNoteGetClicked] = useState<boolean>(false);

  return (
    <div
      key={note.noteId}
      className={
        isNoteGetClicked === true
          ? "transtion fixed bottom-20 left-20 right-20 top-20 z-50 flex flex-col rounded-2xl border border-blue-300 bg-white px-4 py-4 text-center duration-200 ease-in-out"
          : "transtion relative flex flex-col rounded-2xl bg-white px-4 py-4 text-center duration-200 ease-in-out hover:scale-105"
      }
    >
      <div className="flex justify-end">
        {isNoteGetClicked === true ? (
          <>
            <IconButton
              onClick={() =>
                setIsNoteGetClicked((current) => (current = !current))
              }
            >
              <CloseIcon sx={{ fontSize: "20px", color: "black" }} />
            </IconButton>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex h-full flex-col gap-1">
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
                className="rounded-3xl bg-blue-500 px-4 py-1 font-Nunito font-bold"
              >
                {tag.label}
              </span>
            );
          })}
        </div>
        {isNoteGetClicked === true ? (
          <></>
        ) : (
          <>
            <button
              onClick={() =>
                setIsNoteGetClicked((current) => (current = !current))
              }
              className="transtion rounded-lg border border-blue-400 px-4 py-2 font-Nunito text-blue-400 duration-150 ease-in-out hover:bg-blue-400 hover:text-white"
            >
              Show Note
            </button>
          </>
        )}
        <Link
          href={`note/updateNote/${note.noteId}`}
          className="transtion rounded-xl border border-slate-500 px-4 py-2 font-Nunito text-slate-500 duration-150 ease-in-out hover:bg-slate-500 hover:text-white"
        >
          Edit Note
        </Link>
      </div>
    </div>
  );
}
