import React, { useEffect, useRef } from 'react';

const GoogleReviewWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Avoid adding the script multiple times
    const existingScript = document.getElementById("trustindex-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js?68d88a15062878948c96a514e38";
      script.async = true;
      script.defer = true;
      script.id = "trustindex-script";

      if (widgetRef.current) {
        widgetRef.current.appendChild(script);
      }
    }

    // Optional: Clean up (if needed)
    // return () => {
    //   const script = document.getElementById("trustindex-script");
    //   if (script && script.parentNode) {
    //     script.parentNode.removeChild(script);
    //   }
    // };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-2" ref={widgetRef}>
      <h2 className="text-2xl font-bold text-center mb-4">Visitor Reviews</h2>

      {/* Trustindex will inject reviews here */}
      <div className="ti-widget ti-widget--68d88a15062878948c96a514e38"></div>
    </div>
  );
};

export default GoogleReviewWidget;
