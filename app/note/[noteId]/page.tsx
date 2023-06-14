"use client";

import { notesType } from "@/app/page";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="font-Nunito min-h-screen">
      {/*note content*/}
      <div className="flex flex-col px-4 py-4 bg-white min-h-screen">
        <h1 className="text-black text-8xl font-bold font-Nunito break-words">
          {note?.title}
        </h1>
        <p className="text-black text-3xl font-Nunito break-words my-4">
          {note?.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {note?.tags?.map((tag) => {
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
        <Link href={`/note/updateNote/${note?.noteId}`} className="self-start mt-auto px-4 py-2 rounded-lg text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white transtion duration-300 ease-in-out">Edit Note</Link>
      </div>
    </div>
  );
}
