import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SmartBackButton = () => {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // If document.referrer is same origin and not the current page, assume we can go back
    const fromSameOrigin = document.referrer && new URL(document.referrer).origin === window.location.origin;
    setCanGoBack(fromSameOrigin);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1); // Go to previous page
    } else {
      navigate("/"); // Fallback to home
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-blue-600 text-xl border-2 border-gray-200 shadow-md rounded-lg px-2 py-1 hover:text-blue-800 transition-300 font-medium"
    >
      ← Back
    </button>
  );
};

export default SmartBackButton;
