import React, { useEffect } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';

const MyBooksPage = () => {
  const { transactions, getUserTransactions, returnBook } = useTransactionStore();

  useEffect(() => {
    getUserTransactions();
  }, [getUserTransactions]);

  const handleReturn = async (transactionId) => {
    try {
      await returnBook(transactionId); // Call the store function to return the book
      getUserTransactions(); // Refresh transactions after returning the book
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

//   console.log(transactions);

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">My Borrowed Books</h1>
      {/* Check if transactions exist */}
      {transactions?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="card bg-base-100 shadow-xl p-4 border rounded-md"
            >
              <h2 className="text-lg font-semibold">
                📚 Book ID: {transaction.bookId}
              </h2>
              <p>
                <strong>Borrowed On:</strong>{' '}
                {new Date(transaction.borrowDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Return Date:</strong>{' '}
                {transaction.returnDate
                  ? new Date(transaction.returnDate).toLocaleDateString()
                  : 'Not Returned Yet'}
              </p>
              {!transaction.returnDate && (
                <button
                  onClick={() => handleReturn(transaction._id)}
                  className="btn btn-primary mt-4"
                >
                  Return
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have not borrowed any books yet.</p>
      )}
    </div>
  );
};

export default MyBooksPage;
