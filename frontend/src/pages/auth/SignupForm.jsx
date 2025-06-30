import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from 'lucide-react'
import { signup } from '../../features/authSlice';
const SignupForm = () => {
  const [selected, setSelected] = useState("ROLE_CANDIDAT")
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
    "username": "",
    "role": selected
  })
  const [formData2, setFormData2] = useState({
    "confirmPassword": "",
    "agreed": false
  })
  const [showPassword, setShowPassword] = useState(false);

  const { isSigningup, isLoggingIn } = useSelector((state) => state.authSlice)


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    if (formData.password !== formData2.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Form submitted:', formData);
    dispatch(signup({ data: formData, Navigate }))
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl p-6 space-y-6">

        <div className="text-center">
          <h2 className="text-3xl font-extrabold">
            <span className="text-yellow-400 font-bold">Rekrute</span>
            <span className="ml-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">IT</span>
          </h2>
        </div>

        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Create an account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-around ">
            <button
              type="button"
              onClick={() => {
                setSelected("ROLE_RECRUTEUR")
                setFormData((prev) => ({ ...prev, role: "ROLE_RECRUTEUR" }))
              }}
              className={`px-3 py-2 rounded text-xs font-medium capitalize transition flex items-center justify-center space-x-1 ${selected == "ROLE_RECRUTEUR" ? "bg-blue-200" : ""
                }`}

            >
              recruteur
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected("ROLE_CANDIDAT")
                setFormData((prev) => ({ ...prev, role: "ROLE_CANDIDAT" }))
              }}
              className={`px-3 py-2 rounded text-xs font-medium capitalize transition flex items-center justify-center space-x-1 ${selected == "ROLE_CANDIDAT" ? "ring-2 bg-blue-200" : ""
                }`}
            >
              candidat
            </button>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-10`}
              placeholder="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-base-content/40" />
              ) : (
                <Eye className="h-5 w-5 text-base-content/40" />
              )}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-10`}
              placeholder="confirmPassword"
              value={formData2.confirmPassword}
              onChange={(e) => setFormData2({ ...formData2, confirmPassword: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-base-content/40" />
              ) : (
                <Eye className="h-5 w-5 text-base-content/40" />
              )}
            </button>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg font-medium"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/Login" className="text-blue-600 hover:underline dark:text-blue-400">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
