import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore';

const AddBookPage = () => {
    const { addBook, isLoading, error } = useBookStore();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationYear: '',
        bookImage: null,
    });
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle Form Changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');

        if (!formData.title || !formData.author || !formData.publicationYear) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            await addBook(formData);
            setSuccess('Book added successfully!');
            setTimeout(() => navigate('/books'), 1500); // Redirect to books page
        } catch (err) {
            console.error('Failed to add book:', err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Add a New Book</h1>

            {/* Success Message */}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Book Form */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Author Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Publication Year Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Publication Year</label>
                    <input
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Book Image Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Book Image (Optional)</label>
                    <input
                        type="file"
                        name="bookImage"
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        accept="image/*"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-4 py-2 px-4 text-white font-semibold rounded-md ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {isLoading ? 'Adding Book...' : 'Add Book'}
                </button>
            </form>

            {/* Back Button */}
            <div className="text-center mt-4">
                <button
                    onClick={() => navigate('/admin')}
                    className="text-blue-500 hover:underline"
                >
                    ← Back to Admin Panel
                </button>
            </div>
        </div>
    );
};

export default AddBookPage;
