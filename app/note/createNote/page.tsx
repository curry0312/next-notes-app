"use client";

import { tag } from "@/app/page";
import ReactSelect from "@/components/ReactSelect";
import { createNote } from "@/lib/createNote";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function page() {
  const [tags, setTags] = useState<tag[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { push } = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      push("/");
    }
  }, [session]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await createNote({ session, titleRef, tags, descriptionRef });
    titleRef.current!.value = "";
    setTags((prev) => (prev = []));
    descriptionRef.current!.value = "";
  }
  return (
    <div className="min-h-screen font-Nunito sm:flex sm:items-center sm:justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex min-h-screen min-w-[100%] flex-col gap-4 bg-blue-500 px-5 py-10 sm:min-h-0 sm:min-w-[70%] sm:rounded-2xl"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-bold">
            Title:
          </label>
          <input ref={titleRef} id="title" type="text" className="input" />
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
            ref={descriptionRef}
            id="description"
            rows={5}
            cols={20}
            className="input text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-300 hover:text-black"
        >
          Create Note
        </button>
        <Link
          href={".."}
          type="submit"
          className="rounded-xl bg-red-600 px-4 py-2 text-white transition duration-300 ease-in-out text-center hover:bg-red-300 hover:text-black"
        >
          Back to previous page
        </Link>
      </form>
    </div>
  );
}
