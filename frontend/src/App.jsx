import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route  path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />

      </Routes>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App