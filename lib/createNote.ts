import { tag } from "@/app/page";
import { RefObject } from "react";
import { v4 as uuidV4 } from "uuid";

type createNoteParams = {
  session: any;
  titleRef: RefObject<HTMLInputElement>;
  tags: tag[];
  descriptionRef: RefObject<HTMLTextAreaElement>;
};

export async function createNote({
  session,
  titleRef,
  tags,
  descriptionRef,
}: createNoteParams):Promise<void> {
  try {
    await fetch("/api/note/createNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.userId,
        noteId: uuidV4(),
        title: titleRef.current!.value,
        tags: tags,
        description: descriptionRef.current!.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
