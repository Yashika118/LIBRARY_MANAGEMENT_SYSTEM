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
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        publicationYear: 1999,
        availabilityStatus: true,
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008,
        availabilityStatus: true,
      },
      {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        publicationYear: 2008,
        availabilityStatus: true,
      },
      {
        title: 'You Don’t Know JS',
        author: 'Kyle Simpson',
        publicationYear: 2014,
        availabilityStatus: true,
      },
      {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        publicationYear: 2018,
        availabilityStatus: true,
      },
      {
        title: 'History of Golgappe',
        author: 'ynk',
        publicationYear: 2025,
        availabilityStatus: true,
        

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