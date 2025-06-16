import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ isOpen }) {

    const Navigate = useNavigate()
    const handleNavClick = (label) => {
        Link(label)
    };
    return (
        isOpen && (
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-3">
                <nav className="space-y-3">
                    <Link
                        to={"/dashboard"}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600"
                    >
                        dashboard
                    </Link>
                    <Link
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600"
                        to={"/profile"}
                    >
                        profile
                    </Link>
                    <Link
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600"
                        to={"/application"}
                    >
                        application
                    </Link>
                    <Link
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600"
                        to={"/settings"}
                    >
                        settings
                    </Link>
                    <Link
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600"
                        to={"/favoris"}
                    >
                        favoris
                    </Link>

                </nav>
            </aside>
        )
    )
}

export default Sidebar