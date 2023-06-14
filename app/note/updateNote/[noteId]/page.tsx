"use client";

import { notesType } from "@/app/page";
import ReactSelect from "@/components/ReactSelect";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export type Option = {
  id: string;
  label: string;
};

export default function page() {
  const { noteId } = useParams();
  const [values, setValues] = useState<Option[]>([]);
  const [note, setNote] = useState<notesType>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    get();
    async function get() {
      const res = await fetch(
        `http://localhost:3000/api/note/getNote/${noteId}`
      );
      const targetNote = await res.json();
      setNote(targetNote);
      console.log(targetNote);
      setValues(targetNote.tags);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/note/updateNote/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current!.value,
          tags: values,
          description: descriptionRef.current!.value,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center font-Nunito min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-blue-500 px-5 py-10 rounded-2xl min-w-[70%]"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-xl">
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
          <label className="font-bold text-xl">Tag:</label>
          <div className="text-black text-sm">
            <ReactSelect values={values} setValues={setValues} />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-xl">
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
          className="bg-blue-300 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-black transition duration-300 ease-in-out"
        >
          Update Note
        </button>
        <div className="flex gap-5">
          <Link
            href="/"
            className="flex-1 text-center bg-blue-300 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-black transition duration-300 ease-in-out"
          >
            Back to Home Page
          </Link>
          <Link
            href={`/note/${note?.noteId}`}
            className="flex-1 text-center bg-blue-300 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-black transition duration-300 ease-in-out"
          >
            Back to Note
          </Link>
        </div>
      </form>
    </div>
  );
}
