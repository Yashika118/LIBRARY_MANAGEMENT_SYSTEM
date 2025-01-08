import React, { useEffect } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';

const TransactionsPage = () => {
    const { transactions, getAllTransactions, isLoading, error } = useTransactionStore();

    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]);

    if (isLoading) {
        return <p className=" text-center mt-10 text-xl">Loading transactions...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-xl text-red-500">
                Error: {error}
            </p>
        );
    }

    return (
        <div className="w-[80%] mx-auto my-10 mt-20 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">📄 All Transactions</h1>

            {transactions.length === 0 ? (
                <p className="text-center text-gray-500">No transactions found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Transaction ID</th>
                            <th className="border border-gray-300 p-2">Book ID</th>
                            <th className="border border-gray-300 p-2">User ID</th>
                            <th className="border border-gray-300 p-2">Borrow Date</th>
                            <th className="border border-gray-300 p-2">Return Date</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id} className="hover:bg-gray-50">
                                {/* Transaction ID */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {transaction._id || 'N/A'}
                                </td>

                                {/* Book ID */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {transaction.bookId || 'N/A'}
                                </td>

                                {/* User ID */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {transaction.userId || 'N/A'}
                                </td>

                                {/* Borrow Date */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {transaction.borrowDate
                                        ? new Date(transaction.borrowDate).toLocaleString()
                                        : 'N/A'}
                                </td>

                                {/* Return Date */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {transaction.returnDate
                                        ? new Date(transaction.returnDate).toLocaleString()
                                        : 'Not Returned'}
                                </td>

                                {/* Status */}
                                <td
                                    className={`border border-gray-300 p-2 text-center ${
                                        transaction.returnDate
                                            ? 'text-green-500'
                                            : 'text-blue-500'
                                    }`}
                                >
                                    {transaction.returnDate ? 'Returned' : 'Borrowed'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionsPage;
