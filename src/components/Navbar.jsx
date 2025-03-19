import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu
import { DropdownMenu } from "./dropdawn/DropdownMenu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black h-20 fixed w-full top-0 left-0 z-50 shadow-md px-2 items-center justify-center">
        <div className="container mx-auto flex justify-between items-center py-4 ">
          {/* Logo */}
          <div
            className="app-logo cursor-pointer flex items-center"
            onClick={() => navigate("/")}
          >
            <img
              src="/kivu-image/bt-logo-52.png"
              alt="Kivu Logo"
              className="h-16 w-16"
            />
            <div className="text-white text-sm font-bold flex flex-col">
              <span>Ibirwa Kivu</span>
              <span>Bike Tours</span>
              <span>We Travel IN Comfort</span>
            </div>
          </div>
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul
            className={`md:flex md:space-x-6 absolute md:static md:items-center font-semibold text-[17px] px-6  sm:bg-black md:bg-black md:w-auto w-full left-0 top-16 transition-all duration-500 ease-in-out ${
              isOpen
                ? " bg-black h-screen flex flex-col overflow-hidden opacity-100"
                : "hidden md:flex md:opacity-100"
            } z-40`}
          >
            <li className="pb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                to="/join"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-white"
                }
                onClick={closeMenu}
              >
                Sign up
              </NavLink>
            </li>
            <li className="flex">
              <span className="text-white text-md font-bold pr-2 mt-[-5px]">
                Services
              </span>
              <DropdownMenu closeMenu={closeMenu} />
            </li>
          </ul>
        </div>
      </nav>
      <div className="bg-inherit p-5">{}</div>
    </>
  );
};

export default Navbar;
