"use client";

import ReactSelect from "@/components/ReactSelect";
import { getUserId } from "@/lib/getUserId";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export type Option = {
  id: string;
  label: string;
};

export default function page() {
  const [values, setValues] = useState<Option[]>([]);
  const [userId, setUserId] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    async function get() {
      if (session) {
        const userId = await getUserId(session);
        setUserId(userId);
      }
    }
    get();
  }, [session]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/note/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          noteId: uuidV4(),
          title: titleRef.current!.value,
          tags: values,
          description: descriptionRef.current!.value,
        }),
      });
      titleRef.current!.value = "";
      setValues((prev) => (prev = []));
      descriptionRef.current!.value = "";
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
          <input ref={titleRef} id="title" type="text" className="input" />
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
            ref={descriptionRef}
            id="description"
            rows={5}
            cols={20}
            className="input text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-300 hover:text-black transition duration-300 ease-in-out"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}
