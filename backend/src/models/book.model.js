import mongoose from "mongoose";

const bookSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publicationYear:{
            type:Number,
            required:true,
        },
        availabilityStatus:{
            type:Boolean,
        }
    },
    {timestamps:true}
);

const Book=mongoose.model("Book",bookSchema);
export default Book;