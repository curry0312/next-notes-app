import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId:{
    type:String,
    required: [true, "userId is required"],
  },
  noteId:{
    type:String,
    required: [true, "noteId is required"],
    unique: [true, "noteId is unique"]
  },
  title: {
    type: String,
    required: [true, "Note's title is required"],
  },
  tags:{
    type: Array
  },
  description: {
    type: String,
    required: [true, "Note's description is required"],
  },
});

const Note = mongoose.models.Note || mongoose.model("Note",NoteSchema)
export default Note
