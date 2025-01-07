import Transaction from "../models/transaction.model.js";
import Book from "../models/book.model.js";

export const borrowBook=async(req,res)=>{
    const {bookId}=req.body;
    const userId=req.user.id;
    try {
        const book=await Book.findById(bookId);
        // console.log(book);
        if(!book || !book.availabilityStatus){
            return res.status(400).json({Message:"Book is not available now."});
        }
        const transaction=await Transaction.create(
            {
                bookId,
                userId,
                borrowDate:new Date(),
            }
        )

        book.availabilityStatus=false;
        await book.save();
        res.status(200).json({message:"Book borrowed successfully",data:transaction});

    } catch (error) {
        console.log("Error in borrowing book. ",error.message);
        res.status(500).json({message:"Failed to borrow book , please try again later"});
    }
}

export const returnBook=async(req,res)=>{
    const {bookId}=req.body;
    const userId=req.user.id;
    try {
        const transaction=await Transaction.findOne(
            {
                userId,
                bookId,
                returnDate:null
            }
        )
        if(!transaction){
            return res.status(400).json({message:"No active borrowed record found"});
        }
        transaction.returnDate=new Date();
        await transaction.save();
        const book=await Book.findById(bookId);
        if(book){
            book.availabilityStatus=true;
            await book.save();
        }

        res.status(200).json({message:"Book return successfully",data:transaction});
    } catch (error) {
        console.log("Error in returning a book. ",error.message);
        res.status(500).json({message:"Failed to return book , please try again later"});
    }
}


export const getAllTransactions=async(req,res)=>{
    try {
        const transactions=await Transaction.find();
        res.status(200).json({data:transactions,count:transactions.length});
    } catch (error) {
        console.log("Error in getting all transactions. ",error.message);
        res.status(500).json({message:"Failed to get all transactions , please try again later"});
    }
}