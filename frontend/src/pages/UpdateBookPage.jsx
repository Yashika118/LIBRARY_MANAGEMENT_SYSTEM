import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore';


const UpdateBookPage = () => {
    const { updateBook, isLoading, error } = useBookStore();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationYear: '',
        bookImage: null,
    });

    const [success, setSuccess] = useState('');


    // 📝 Handle Form Changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // 🚀 Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        updateBook(formData,id);
        setTimeout(() => navigate('/books'), 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Update Book</h2>

                {/* ✅ Success Message */}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                {/* ❌ Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {/* Title Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            placeholder="Enter book title"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Author Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Author</span>
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            placeholder="Enter author name"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Publication Year Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Publication Year</span>
                        </label>
                        <input
                            type="number"
                            name="publicationYear"
                            value={formData.publicationYear}
                            placeholder="Enter publication year"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Book Image Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Book Image (Optional)</span>
                        </label>
                        <input
                            type="file"
                            name="bookImage"
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            accept="image/*"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            
                            type="submit"
                            disabled={isLoading}
                            className={`btn btn-primary w-full ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Updating Book...' : 'Update Book'}
                        </button>
                    </div>
                </form>

                {/* Back Button */}
                <p className="text-center mt-4 text-sm">
                    <button
                        onClick={() => navigate('/books')}
                        className="text-blue-500 hover:underline"
                    >
                        ← Back to Book List
                    </button>
                </p>
            </div>
        </div>
    );
};

export default UpdateBookPage;