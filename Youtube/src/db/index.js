import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const uri = `mongodb+srv://gagankumardd39:7892407180@cluster0.z9n1e.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\nMongoDB connected!! DB host: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection error", err);
    process.exit(1);
  }
};

export default connectDB;
