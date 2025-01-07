import React from 'react'
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="flex justify-center footer footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - Made By Yashika</p>
            </aside>
            <Link to="https://github.com/Yashika118">
            <Github />
            </Link>
        </footer>
    )
}

export default Footer