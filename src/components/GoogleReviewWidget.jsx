import React,{ useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    // Check if Elfsight script is already added
    const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div
        className="elfsight-app-3a7db855-6986-417c-bc2e-9255df41903e"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviews;
