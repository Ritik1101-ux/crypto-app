import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const mongoUri: any ="mongodb+srv://ritiksinghrajput1101:cWDjVc4tlg3ZCxJi@crypto.qh3iv43.mongodb.net/?retryWrites=true&w=majority&appName=crypto";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;
