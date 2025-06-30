import { User } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role")
        localStorage.removeItem("valid")
        window.location.reload()
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="w-full z-50 flex justify-between items-center h-16 px-6 bg-gradient-to-r from-white via-[#f0f4ff] to-[#e0f7fa] shadow-md">
            <h2 className="text-3xl font-extrabold">
                <a href="/">
                    <span className="text-yellow-400 font-bold">Rekrute</span>
                    <span className="ml-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">IT</span>
                </a>
            </h2>
            <div className="flex items-center gap-4">
                <a href={"/offres"} className=' text-blue-900'>find jobs</a>
                <a href={"/recruteurs"} className=' text-blue-900'>companies</a>
                <div className="relative" ref={dropdownRef}>
                    {localStorage.getItem("token") ? (
                        <div className="cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <User className="text-blue-900" />
                        </div>
                    ) : (
                        <a
                            href="/login"
                            className="text-blue-950 font-semibold text-base hover:underline tracking-wide bg-[#514BEE] px-5 py-2 rounded-full underline-offset-0"
                        >
                            Login
                        </a>
                    )}

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Link
                                to="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => setLogout(true)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {logout && (
                // bg-[rgba(0,0,0,0.18)]
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 max-w-full text-center">
                        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                        <p className="mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setLogout(false)}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>

    );
}

export default Navbar;
