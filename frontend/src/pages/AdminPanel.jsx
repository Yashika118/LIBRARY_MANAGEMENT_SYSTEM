import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js'; // Auth store for logout functionality

const AdminPanel = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore(); // Assuming logout is implemented in auth store

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="my-auto mx-auto  p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-center mb-4">Manage your library resources efficiently</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* View All Books */}
                <button
                    onClick={() => navigate('/books')}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600"
                >
                    📚 View All Books
                </button>

                {/* Add a Book */}
                <button
                    onClick={() => navigate('/add-book')}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-green-500 hover:bg-green-600"
                >
                    ➕ Add a Book
                </button>

                {/* Update a Book */}
                <button
                    onClick={() => navigate('/update-book')}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-yellow-500 hover:bg-yellow-600"
                >
                    ✏️ Update a Book
                </button>

                {/* Delete a Book */}
                <button
                    onClick={() => navigate('/delete-book')}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-red-500 hover:bg-red-600"
                >
                    🗑️ Delete a Book
                </button>

                {/* View Transactions */}
                <button
                    onClick={() => navigate('/transactions')}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-purple-500 hover:bg-purple-600"
                >
                    📄 View Transactions
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 font-semibold text-white rounded-md bg-gray-500 hover:bg-gray-600"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
