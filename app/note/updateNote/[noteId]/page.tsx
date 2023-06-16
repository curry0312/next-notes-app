"use client";

import { notesType, tag } from "@/app/page";
import ReactSelect from "@/components/ReactSelect";
import { getNote } from "@/lib/getNote";
import { updateNote } from "@/lib/updateNote";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function page() {
  const { noteId } = useParams();
  const [tags, setTags] = useState<tag[]>([]);
  const [note, setNote] = useState<notesType>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getNote({ noteId, setNote, setTags });
    // get();
    // async function get() {
    //   const res = await fetch(
    //     `/api/note/getNote/${noteId}`
    //   );
    //   const targetNote = await res.json();
    //   setNote(targetNote);
    //   console.log(targetNote);
    //   setTags(targetNote.tags);
    // }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await updateNote({ noteId, titleRef, tags, descriptionRef });
  }
  return (
    <div className="flex min-h-screen items-center justify-center font-Nunito">
      <form
        onSubmit={handleSubmit}
        className="flex min-w-[70%] flex-col gap-4 rounded-2xl bg-blue-500 px-5 py-10"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-bold">
            Title:
          </label>
          <input
            defaultValue={note?.title}
            ref={titleRef}
            id="title"
            type="text"
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-bold">Tag:</label>
          <div className="text-sm text-black">
            <ReactSelect tags={tags} setTags={setTags} />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-xl font-bold">
            description:
          </label>
          <textarea
            defaultValue={note?.description}
            ref={descriptionRef}
            id="description"
            rows={5}
            cols={20}
            className="input text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-blue-300 px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-black"
        >
          Update Note
        </button>
        <div className="flex gap-5">
          <Link
            href="/"
            className="flex-1 rounded-xl bg-blue-300 px-4 py-2 text-center transition duration-300 ease-in-out hover:bg-blue-600 hover:text-black"
          >
            Back to Home Page
          </Link>
          <Link
            href={`/note/${note?.noteId}`}
            className="flex-1 rounded-xl bg-blue-300 px-4 py-2 text-center transition duration-300 ease-in-out hover:bg-blue-600 hover:text-black"
          >
            Back to Note
          </Link>
        </div>
      </form>
    </div>
  );
}
