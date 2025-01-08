import Book from '../models/book.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from '../models/transaction.model.js';


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
    await Transaction.deleteMany({});
    console.log('Cleared Book Collection');
    console.log('Cleared Transaction Collection');

    // Sample books to seed
    const books = [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        publicationYear: 1999,
        availabilityStatus: true,
        bookImage: "https://res.cloudinary.com/dy2i8lt7s/image/upload/v1736346206/rwzu7vbnetqwqbgqwbit.jpg",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        publicationYear: 2008,
        availabilityStatus: true,
        bookImage: "https://images-platform.99static.com//irtuJaycfqG80g-AXkxjyCGu7h8=/0x97:812x909/fit-in/500x500/projects-files/56/5652/565254/4cba847c-57b6-41f3-9352-8f3543783531.jpg",
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        publicationYear: 2008,
        availabilityStatus: true,
        bookImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqPz1Z6su9x4JtdZplkXgYMel4WqmmexT0Pw&s",
      },
      {
        title: "You Don’t Know JS",
        author: "Kyle Simpson",
        publicationYear: 2014,
        availabilityStatus: true,
        bookImage: "https://prh.imgix.net/articles/ThePowerOfOne_Classic2_1600x800.jpg",
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        publicationYear: 2018,
        availabilityStatus: true,
        bookImage: "https://i.pinimg.com/564x/27/ed/79/27ed794081c0cca25e1d0882d59106f5.jpg",
      },
      {
        title: "Learning React",
        author: "Alex Banks",
        publicationYear: 2020,
        availabilityStatus: true,
        bookImage: "https://files.idyllic.app/files/static/2247513?width=384&optimizer=image",
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        publicationYear: 1994,
        availabilityStatus: true,
        bookImage: "https://images-platform.99static.com//OvCM0ju3BFrgUPrnsljZu6BCMSc=/401x176:1458x1234/fit-in/590x590/projects-files/182/18278/1827808/85922e8c-e238-45ab-b8d8-f836c4667e4c.jpg",
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        publicationYear: 2009,
        availabilityStatus: true,
        bookImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3RMYu1CU8I__sCvz3jLn0DxPlu2hJOHpphBipm5KyBgYKAM1ZEnVeb_y9BrRtSx1mTyHK0AzWmHBcUTov2d47YFBHe-ZuB1BwZysRG6Y8uPjdm5BeEBpXhCPEjKynPu7plW9lIs4OF-9avqOIZCHQ09mY52jv-QjnidDNrKNFrlJ0owS-EwEYfSp4zTA/s2160/The%20One%20Who%20Fell%20by%20Kerry%20Wilkinson%20Amazon.jpg",
      },
      {
        title: "Refactoring: Improving the Design of Existing Code",
        author: "Martin Fowler",
        publicationYear: 1999,
        availabilityStatus: true,
        bookImage: "https://www.thecuriousreader.in/wp-content/uploads/2019/05/One-Word-Title-2.png",
      },
      {
        title: "Head First Design Patterns",
        author: "Eric Freeman",
        publicationYear: 2004,
        availabilityStatus: true,
        bookImage: "https://static1.squarespace.com/static/5314a045e4b0e179eb01d9c4/5314a069e4b0aeaef7700a06/5fe6665f48c30047e6174c67/1677100742372/IMG_9004.JPG?format=1500w",
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