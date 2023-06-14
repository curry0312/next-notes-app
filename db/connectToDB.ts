import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (isConnected === true) {
    console.log("MongoDB is already connected");
  } else {
    try {
      const connect = await mongoose.connect(String(process.env.MONGO_URI));
      isConnected = true;
      console.log("Mongodb is now connected!");
      return connect;
    } catch (error) {
      console.log(error);
    }
  }
}
