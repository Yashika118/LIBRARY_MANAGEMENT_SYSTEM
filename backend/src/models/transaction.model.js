import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema(
    {
        bookId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Book",
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
        borrowDate:{
            type:Date, 
        },
        returnDate:{
            type:Date,
        },
    },
    {timestamps:true}
);

const Transaction=mongoose.model("Transaction",transactionSchema);
export default transactionSchema;