"use client";

import Note from "@/components/Note";
import { getAllNotes } from "@/lib/getAllNotes";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  const {status,data:session} = useSession();
  console.log(data)

  useEffect(() => {
    if (session) {
      getAllNotes({ session, setNotes });
    }
  }, [session]);

  const filteredNotes = notes.filter((note) => {
    return (
      filteredText === "" ||
      note.title.toLowerCase().includes(filteredText.toLowerCase())
    );
  });

  if(!session) return <div className="flex justify-center items-center h-screen w-full text-4xl font-bold">Sign in to take notes!</div>
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
      <div className="flex items-center justify-center py-5">
        <input
          type="text"
          placeholder="Search the notes..."
          className="input w-[50%]"
          onChange={(e) => setFilteredText(e.target.value)}
        />
      </div>

      {/*Notes display section*/}
      {!session ? (
        <>
          <div className="h-full text-center text-xl font-bold text-white">
            Sign in or create you own account
          </div>
        </>
      ) : (
        <>
          {notes.length == 0 ? (
            <div className="h-full text-center text-xl font-bold text-white">
              You don't have any notes yet. Let's create your notes now!!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 px-4 py-5 text-white sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {filteredNotes.map((note) => {
                return <Note key={note.noteId} note={note} />;
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
