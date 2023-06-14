"use client";

import Note from "@/components/Note";
import { getUserId } from "@/lib/getUserId";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export type tag = {
  id: string;
  label: string;
};

export type notesType = {
  userId: string;
  noteId: string;
  title: string;
  tags: tag[];
  description: string;
};

export default function Home() {
  const [notes, setNotes] = useState<notesType[]>([]);

  const [filteredText, setFilteredText] = useState<string>("");

  const filteredNotes = notes.filter((note) => {
    return (filteredText === "" || note.title.toLowerCase().includes(filteredText.toLowerCase()))
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      getUserNotes();
    }
  }, [session]);

  async function getUserNotes(): Promise<any> {
    const userId = await getUserId(session);
    const res = await fetch(
      `http://localhost:3000/api/note/getNotes/${userId}`
    );
    const userNotes = await res.json();
    console.log("userNotes:", userNotes);
    setNotes(userNotes);
  }
  return (
    <section className="px-4 py-4">
      <div className="flex flex-col gap-5 text-center font-bold">
        <p className="text-8xl ">Notes App</p>
        <span>
          You can take notes here whenever you like and we will keep them
          forever as well
        </span>
      </div>
      {/*search bar section*/}
      <div className="flex justify-center items-center py-5">
        <input
          type="text"
          placeholder="Search the notes..."
          className="input w-[50%]"
          onChange={(e) => setFilteredText(e.target.value)}
        />
      </div>
      {/*Notes display section*/}
      <div className="grid grid-cols-1 gap-4 text-white px-4 py-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {notes.length !== 0 &&
          filteredNotes.map((note) => {
            return <Note key={note.noteId} note={note} />;
          })}
      </div>
    </section>
  );
}
