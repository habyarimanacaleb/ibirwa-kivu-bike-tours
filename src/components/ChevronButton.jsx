import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ChevronButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 30%
  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight * 0.3) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Scroll to top"
        >
          <FaChevronUp />
        </button>
      )}
    </div>
  );
};

export default ChevronButton;
