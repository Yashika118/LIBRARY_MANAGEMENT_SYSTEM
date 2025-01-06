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
        },
        bookImage:{
            type:String,
            default:"",
        }
    },
    {timestamps:true}
);

const Book=mongoose.model("Book",bookSchema);
export default Book;