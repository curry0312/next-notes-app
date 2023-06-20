"use client";

import { notesType, tag } from "@/app/page";
import ReactSelect from "@/components/ReactSelect";
import { deleteNote } from "@/lib/deleteNote";
import { getNote } from "@/lib/getNote";
import { updateNote } from "@/lib/updateNote";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const { noteId } = useParams();
  const [tags, setTags] = useState<tag[]>([]);
  const [note, setNote] = useState<notesType>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { push } = useRouter();

  useEffect(() => {
    getNote({ noteId, setNote, setTags });
  }, []);

  async function handleNoteDelete(note: notesType) {
    await deleteNote(note?.noteId);
    push("..");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const updateNotePromise = updateNote({
      noteId,
      titleRef,
      tags,
      descriptionRef,
    });
    toast.promise(updateNotePromise, {
      loading: "Updating note...",
      success: "Updating completely!",
      error: "Error when updating note...",
    });
    updateNotePromise.then().catch((err) => [console.log(err)]);
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
          className="rounded-xl bg-blue-600 px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-300 hover:text-black"
        >
          Update Note
        </button>
        <button
          type="button"
          onClick={() => handleNoteDelete(note!)}
          className="w-full rounded-xl bg-red-600 px-4 py-2 text-center text-white transition duration-300 ease-in-out hover:bg-red-300 hover:text-black"
        >
          Delete Note
        </button>
        <div className="flex gap-5">
          <Link
            href="/"
            className="w-full rounded-xl bg-slate-600 px-4 py-2 text-center text-white transition duration-300 ease-in-out hover:bg-slate-300 hover:text-black"
          >
            Back to Home Page
          </Link>
          {/* <Link
            href={`/note/${note?.noteId}`}
            className="flex-1 rounded-xl bg-blue-300 px-4 py-2 text-center transition duration-300 ease-in-out hover:bg-blue-600 hover:text-black"
          >
            Back to Note
          </Link> */}
        </div>
      </form>
    </div>
  );
}
