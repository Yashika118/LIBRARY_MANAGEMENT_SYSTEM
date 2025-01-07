import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import bookRouter from "./src/routes/book.route.js";
import transactionRouter from "./src/routes/transaction.route.js";
import cors from "cors";


dotenv.config();

const app=express();
const port=process.env.PORT;



app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",authRouter);
app.use("/api/book",bookRouter);
app.use("/api/transaction",transactionRouter);











app.listen(port,()=>{
    console.log(`Server is running on port ${port} successfully`);
    connectDB();
})