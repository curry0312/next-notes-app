import { RefObject } from "react";
import { tag } from "./../app/page";

type updateNoteParams = {
  noteId: string;
  titleRef: RefObject<HTMLInputElement>;
  tags: tag[];
  descriptionRef: RefObject<HTMLTextAreaElement>;
};

export async function updateNote({
  noteId,
  titleRef,
  tags,
  descriptionRef,
}: updateNoteParams):Promise<void> {
  try {
    await fetch(`/api/note/updateNote/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current!.value,
        tags: tags,
        description: descriptionRef.current!.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
