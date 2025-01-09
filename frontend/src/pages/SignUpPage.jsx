import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    role: 'user', // default role

  })


  const { signup } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    
    if (!formData.fullname.trim()) return toast.error("Fullname is required ");
    if (!formData.email.trim()) return toast.error("Email is required ");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required ");
    if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters.");

    signup(formData);
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-8">
      <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg mt-20 mb-10">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Contact Info Field */}
          <div>
            <label className="label">
              <span className="label-text">Contact Info (Mobile Number)</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="input input-bordered w-full"
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          {/* Role Switch */}
          <div>
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <div className="flex justify-center items-center">
              <span className="mr-2">User</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={formData.role === 'admin'}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })
                }
              />
              <span className="ml-2">Admin</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-full">Signup</button>
          </div>
        </form>

        {/* Additional Links */}
        <p className="text-center mt-4 text-sm">
          Have account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage