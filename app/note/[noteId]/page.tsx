"use client";

import { notesType } from "@/app/page";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export type Option = {
  id: string;
  label: string;
};

export default function page() {
  const { noteId } = useParams();
  console.log(noteId);
  const [note, setNote] = useState<notesType>();

  useEffect(() => {
    get();
    async function get() {
      const res = await fetch(
        `http://localhost:3000/api/note/getNote/${noteId}`
      );
      const targetNote = await res.json();
      setNote(targetNote);
    }
  }, []);

  return (
    <div className="relative min-h-screen font-Nunito">
      <Link href={".."}>
        <IconButton className="absolute right-2 top-2 text-white">
          <CloseIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Link>
      {/*note content*/}
      <div className="flex min-h-screen flex-col bg-blue-600 px-4 py-4">
        <h1 className="break-words font-Nunito text-5xl font-bold text-white">
          {note?.title}
        </h1>
        <p className="my-4 break-words font-Nunito text-3xl text-white">
          {note?.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {note?.tags?.map((tag) => {
            return (
              <span
                key={tag.id}
                className="rounded-xl bg-blue-400 px-4 py-1 font-Nunito font-bold"
              >
                {tag.label}
              </span>
            );
          })}
        </div>
        <Link
          href={`/note/updateNote/${note?.noteId}`}
          className="transtion mt-auto self-start rounded-lg border border-white px-4 py-2 text-white duration-300 ease-in-out hover:bg-white hover:text-blue-600"
        >
          Edit Note
        </Link>
      </div>
    </div>
  );
}
