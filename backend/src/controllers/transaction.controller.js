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
                returnDate:null,
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

export const returnBook = async (req, res) => {
    const { id: transactionId } = req.params; // Get transaction ID from params
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        // Find the transaction by transactionId and ensure it's borrowed by the current user
        const transaction = await Transaction.findOne({
            _id: transactionId,
            userId,
            returnDate: null,
        });

        if (!transaction) {
            return res.status(400).json({ message: "No active borrowed record found for this transaction." });
        }

        // Update returnDate
        transaction.returnDate = new Date();
        await transaction.save();

        // Update the book's availability
        const book = await Book.findById(transaction.bookId);
        if (book) {
            book.availabilityStatus = true;
            await book.save();
        }

        res.status(200).json({ message: "Book returned successfully", data: transaction });
    } catch (error) {
        console.error("Error in returning a book:", error.message);
        res.status(500).json({ message: "Failed to return book, please try again later." });
    }
};


export const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id; // Access user ID directly from req.user
        const transactions = await Transaction.find({ userId, returnDate: null });
        
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error in getting user transactions: ", error.message);
        res.status(500).json({ message: "Failed to get user transactions, please try again later" });
    }
};


export const getAllTransactions=async(req,res)=>{
    try {
        const transactions=await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error in getting all transactions. ",error.message);
        res.status(500).json({message:"Failed to get all transactions , please try again later"});
    }
}