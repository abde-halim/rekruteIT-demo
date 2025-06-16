import React from 'react'

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
            &copy; {new Date().getFullYear()} RekruteIT. All rights reserved.
        </footer>
    )
}

export default Footer