import Book from '../models/book.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);                          // to stop node itself
  }
};

// Seed Data
const seedBooks = async () => {
  try {
    await connectDB();

    // Clear the existing Book collection
    await Book.deleteMany({});
    console.log('Cleared Book Collection');

    // Sample books to seed
    const books = [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        publicationYear: 1999,
        availabilityStatus: true,
        bookImage: "",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        publicationYear: 2008,
        availabilityStatus: true,
        bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        publicationYear: 2008,
        availabilityStatus: false,
        bookImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      },
      {
        title: "You Don’t Know JS",
        author: "Kyle Simpson",
        publicationYear: 2014,
        availabilityStatus: true,
        bookImage: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        publicationYear: 2018,
        availabilityStatus: true,
        bookImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      },
      {
        title: "Learning React",
        author: "Alex Banks",
        publicationYear: 2020,
        availabilityStatus: false,
        bookImage: "",
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        publicationYear: 1994,
        availabilityStatus: true,
        bookImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        publicationYear: 2009,
        availabilityStatus: false,
        bookImage: "",
      },
      {
        title: "Refactoring: Improving the Design of Existing Code",
        author: "Martin Fowler",
        publicationYear: 1999,
        availabilityStatus: true,
        bookImage: "",
      },
      {
        title: "Head First Design Patterns",
        author: "Eric Freeman",
        publicationYear: 2004,
        availabilityStatus: true,
        bookImage: "",
      },
    ];

    await Book.insertMany(books);
    console.log('Successfully seeded the Book collection');

    process.exit(1);

  } catch (error) {
    console.error('Error seeding books:', error.message);
    process.exit(1);
  }
};

// Run the seeding function
seedBooks();