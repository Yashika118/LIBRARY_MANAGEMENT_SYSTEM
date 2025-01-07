import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthSore.js';

const LoginPage = () => {
  const {login}=useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.email.trim()) return toast.error("Email is required ");
    // if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    // if (!formData.password.trim()) return toast.error("Password is required ");
    // if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters.");
    
    login(formData);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Field */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>

        {/* Additional Links */}
        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage