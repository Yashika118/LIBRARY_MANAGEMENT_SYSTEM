import cloudinary from "../lib/cloudinary.js";
import Book from "../models/book.model.js";

//  sari books milengi
export const getBooks = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Failed to get books ", error: error.message });
    }
}


// view a particular book
export const viewBook=async(req,res)=>{
    const {id}=req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Failed to view book ", error: error.message });
    }
}




// admin only ------------>

// add a particular book

export const addBook = async (req, res) => {
    const { title, author, publicationYear,bookImage } = req.body;
    try {
        if (!title || !author || !publicationYear) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let bookImageLink = '';
        if (bookImage) {
            const uploadResponse = await cloudinary.uploader.upload(bookImage);
            bookImageLink = uploadResponse.secure_url;
        }

        const newBook = new Book({
            title,
            author,
            publicationYear,
            availabilityStatus: true,
            bookImage:bookImageLink,
        });

        if (newBook) {
            await newBook.save();
            res.status(201).json(newBook);
        }
        else {
            res.status(500).json({ message: "Book does not found" });
        }


    } catch (error) {
        res.status(500).json({ message: "Failed to add book ", error: error.message });
    }
}


//  update a particular book
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publicationYear, availabilityStatus ,bookImage} = req.body;
    
    try {
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }

        let bookImageLink = '';
        if (bookImage) {
            const uploadResponse = await cloudinary.uploader.upload(bookImage);
            bookImageLink = uploadResponse.secure_url;
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.publicationYear = publicationYear || book.publicationYear;
        book.availabilityStatus = availabilityStatus || book.availabilityStatus;
        book.bookImage=bookImageLink;

        const updateBook = await book.save();
        res.status(200).json(updateBook);

    } catch (error) {
        console.error("Error updating book:", error.message);
        res.status(500).json({ message: "Failed to update book. Please try again later." });
    }
}



// delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ messge: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error.message);
        res.status(500).json({ message: "Failed to delete book. Please try again later." });
    }
}