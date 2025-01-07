import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore.js';
import Books from './pages/Books.jsx';
import BookDetailsPage from './pages/BookDetailsPage.jsx';
import MyBooksPage from './pages/MyBooksPage.jsx';


const App = () => {
  const { authUser, checkAuth, isAuthLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthLoading) {
    // Display a loading spinner while authentication is being checked
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-grow'>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/books" element={authUser ? <Books /> : <Navigate to="/login" />} />
          <Route path="/books/:id" element={authUser ? <BookDetailsPage /> : <Navigate to="/login" />} />
          <Route path="/myBooks" element={authUser ? <MyBooksPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
