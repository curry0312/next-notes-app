import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId:{
    type: String,
    unique: [true, "userId is already exist"],
    required: [true, "userId is required"],
  },
  email: {
    type: String,
    unique: [true, "Email is already exist"],
    required: [true, "Email is required"],
  },
  password:{
    type: String,
    required: [true, "password is required"]
  },
  username: {
    type: String,
    unique: [true, "Usernameis already exist"],
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
