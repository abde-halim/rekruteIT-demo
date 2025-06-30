import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from 'lucide-react'
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    "usernameOrEmail": "",
    "password": ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ data: formData, Navigate }))
    } catch (e) {
      console.log(e.message);
    }

  }
  const { isSigningup, isLoggingIn } = useSelector((state) => state.authSlice)

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
          Login to your account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-10`}
              placeholder="Email"
              value={formData.usernameOrEmail}
              onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
            />
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-10`}
                placeholder="••••••••"
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
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg font-medium"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
