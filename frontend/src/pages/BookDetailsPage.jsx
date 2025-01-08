import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore.js';
import { useTransactionStore } from '../store/useTransactionStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import PlaceholderBook from "../../public/images/placeholder_book2.jpg"




const BookDetailsPage = () => {
    const { id } = useParams();
    const { bookDetails, viewBook, setCurrentBookId,deleteBook, isLoading: bookLoading, error: bookError } = useBookStore();
    const { borrowBook, transactions, returnBook, isLoading: transactionLoading, error: transactionError } = useTransactionStore();
    const { authUser }=useAuthStore();
    const navigate = useNavigate();


    useEffect(() => {
        setCurrentBookId(id);
        viewBook();
    }, [id, viewBook, setCurrentBookId]);



    const handleBorrow = async () => {
        
        try {
            await borrowBook(id);
            console.log('Book Borrowed:', bookDetails.title);
        } catch (error) {
            console.error('Failed to borrow book:', error.message);
        }finally{
            window.location.reload();

        }

    };


    const handleDelete=async(e)=>{
        e.preventDefault();
        deleteBook();
        setTimeout(() => navigate('/books'), 100);
    }


    if (bookLoading || transactionLoading) return <p className="text-center mt-10 text-xl">Loading...</p>;
    if (bookError || transactionError)
        return <p className="text-center mt-10 text-xl text-red-500">Error: {bookError || transactionError}</p>;

    return (
        <div className="w-[80%] h-[80%] my-auto p-6 mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            {bookDetails ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book Image Section */}
                    <div className="flex justify-center">
                        <img
                            src={bookDetails.bookImage || PlaceholderBook}
                            alt={bookDetails.title}
                            className="w-72 h-96 rounded-lg shadow-l object-fit"
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
                                className={`font-medium ${bookDetails.availabilityStatus ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {bookDetails.availabilityStatus ? 'Available' : 'Not Available'}
                            </span>
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {/* Borrow Button */}

                            <button
                                onClick={handleBorrow}
                                disabled={
                                    !bookDetails.availabilityStatus ||
                                    transactionLoading 
                                }
                                className={`px-4 py-2 font-medium text-white rounded-md ${
                                    bookDetails.availabilityStatus
                                        ? 'bg-blue-500 hover:bg-blue-600'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {transactionLoading
                                    ? 'Processing...'
                                    : 'Borrow'}
                            </button>

                            {/* Admin Buttons */}
                            {authUser?.role === 'admin' && (
                                <>
                                    {/* Update Button */}
                                    <Link to={`/update-book/${id}`}>
                                    <button
                                       
                                        
                                        className={`px-4 py-2 font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-md ${bookDetails.availabilityStatus
                                            ? ''
                                            : 'bg-gray-400 cursor-not-allowed'}`}
                                    >
                                        Update
                                    </button>
                                    </Link>

                                    {/* Delete Button */}
                                    <button
                                        onClick={handleDelete}
                                        className={`px-4 py-2 font-medium text-white bg-red-500 hover:bg-red-600 rounded-md ${bookDetails.availabilityStatus
                                            ? ''
                                            : 'bg-gray-400 cursor-not-allowed'}`}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

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