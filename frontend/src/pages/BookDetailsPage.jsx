import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore.js';

const BookDetailsPage = () => {
    const { id } = useParams();
    const { bookDetails, viewBook, setCurrentBookId, isLoading, error } = useBookStore();

    useEffect(() => {
        setCurrentBookId(id);
        viewBook();
    }, [id, viewBook, setCurrentBookId]);

    const handleBorrow = () => {
        console.log('Book Borrowed:', bookDetails.title);
    };

    const handleReturn = () => {
        console.log('Book Returned:', bookDetails.title);
    };

    if (isLoading) return <p className="text-center mt-10 text-xl">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-xl text-red-500">Error: {error}</p>;

    return (
        <div className="w-[80%] h-[80%] my-auto p-6 mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            {bookDetails ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book Image Section */}
                    <div className="flex justify-center">
                        <img
                            src={bookDetails.bookImage || "../../public/images/placeholder_book.png"}
                            alt={bookDetails.title}
                            className="w-72 h-96  rounded-lg shadow-l object-fit"
                        />
                    </div>

                    {/* Book Details Section */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{bookDetails.title}</h1>
                        <p className="text-gray-600"><strong>Author:</strong> {bookDetails.author}</p>
                        <p className="text-gray-600"><strong>Publication Year:</strong> {bookDetails.publicationYear}</p>
                        <p className="text-gray-600">
                            <strong>Status:</strong>{' '}
                            <span
                                className={`font-medium ${
                                    bookDetails.availabilityStatus ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {bookDetails.availabilityStatus ? 'Available' : 'Not Available'}
                            </span>
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {/* Borrow Button */}
                            <button
                                onClick={handleBorrow}
                                disabled={!bookDetails.availabilityStatus}
                                className={`px-4 py-2 font-medium text-white rounded-md ${
                                    bookDetails.availabilityStatus
                                        ? 'bg-blue-500 hover:bg-blue-600'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Borrow
                            </button>

                            {/* Return Button */}
                            {/* <button
                                onClick={handleReturn}
                                className="px-4 py-2 font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                            >
                                Return
                            </button> */}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No book details available.</p>
            )}
        </div>
    );
};

export default BookDetailsPage;
