export async function deleteNote(noteId:string) {
  try {
    const res = await fetch(`/api/note/deleteNote/${String(noteId)}`);
    const note = await res.json()
    window.location.reload();
    console.log(note)
  } catch (error) {
    console.log(error);
  }
}
