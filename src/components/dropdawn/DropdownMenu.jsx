import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

function DropdownMenu() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <li className="relative">
      <ul
        ref={dropdownRef}
        className={`absolute left-0 mt-2 bg-blue-700 ${
          isOpen ? "block" : "hidden"
        } z-10 px-2 w-[200px] py-4`}
      >
        <li className="mt-4 md:mt-0">
          <div onClick={handleLinkClick}>
            <button
              onClick={() => changeLanguage("en")}
              className="block text-white p-2 hover:bg-blue-500 w-full"
            >
              English
            </button>
          </div>
          <div onClick={handleLinkClick}>
            <button
              onClick={() => changeLanguage("fr")}
              className="block text-white p-2 hover:bg-blue-500  w-full"
            >
              Français
            </button>
          </div>
          <div onClick={handleLinkClick}>
            <button
              onClick={() => changeLanguage("es")}
              className="block text-white p-2 hover:bg-blue-500  w-full"
            >
              Español
            </button>
          </div>
          <div onClick={handleLinkClick}>
            <button
              onClick={() => changeLanguage("rw")}
              className="block text-white p-2 hover:bg-blue-500  w-full"
            >
              Kinyarwanda
            </button>
          </div>
          <div onClick={handleLinkClick}>
            <button
              onClick={() => changeLanguage("ar")}
              className="block text-white p-2 hover:bg-blue-500  w-full"
            >
              العربية
            </button>
          </div>
        </li>
      </ul>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white flex items-center text-2xl"
        title="Language Translation"
      >
        <FaGlobe className="text-xl cursor-pointer " />{" "}
        <span className="font-semibold-200 text-xl">Translate</span>
      </button>
    </li>
  );
}

export default DropdownMenu;
