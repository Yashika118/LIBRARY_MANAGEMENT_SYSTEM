import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGO_DB connect successfully: ${conn.connection.host}`);

    } catch (error) {
        console.log(`MONGO_DB connection error `,error);
    }
}