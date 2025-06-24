import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaHome, FaTools, FaImages, FaBook, FaEnvelope, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isOpen ? "block" : "hidden"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            <aside
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0`}
            >
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>

                <nav className="mt-6">
                    <div className="flex flex-col space-y-1 text-white">
                        <Link href="/admin-panel"  className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaHome className="mr-3" />
                            <span>Home</span>
                        </Link>

                        <Link to="/create-service" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaTools className="mr-3" />
                            <span>Create Service</span>
                        </Link>

                        <Link to="/create-gallery" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaImages className="mr-3" />
                            <span>Create Gallery</span>
                        </Link>

                        <Link to="/inquiries-information" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaBook className="mr-3" />
                            <span>View Bookings</span>
                        </Link>

                        <Link to="/contact-information" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaEnvelope className="mr-3" />
                            <span>View Messages</span>
                        </Link>

                        <Link to="/user-information" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaUsers className="mr-3" />
                            <span>Our Users/Clients</span>
                        </Link>

                        <Link to="/admin-settings" className="flex items-center px-4 py-3 hover:bg-gray-700">
                            <FaCog className="mr-3" />
                            <span>Settings</span>
                        </Link>

                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 text-red-400 hover:text-red-300">
                            <FaSignOutAlt className="mr-3" />
                            <span>Logout</span>
                        </div>
                    </div>
                </nav>

            </aside>

            {/* Sidebar toggle button for mobile */}

            <button
                className="fixed top-4 left-4 z-40 md:hidden p-2 bg-gray-800 text-white rounded"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </>
    );
}
