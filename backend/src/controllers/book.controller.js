import Book from "../models/book.model.js";


export const getBooks=async(req,res)=>{
    try {
        const book=await Book.find();
        res.status(200).json(book);
    } catch (error) {
        
    }
}

export const addBook=async(req,res)=>{
    res.send("addBook route");
}

export const updateBook=async(req,res)=>{
    res.send("updateBook route");
}

export const deleteBook=async(req,res)=>{
    res.send("deleteBook route");
}