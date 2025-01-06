import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app=express();
const port=process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);










app.listen(port,()=>{
    console.log(`Server is running on port ${port} successfully`);
    connectDB();
})