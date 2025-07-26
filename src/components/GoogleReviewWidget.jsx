// GoogleReviewWidget.js
import React, { useEffect } from 'react';

const GoogleReviewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.trustindex.io/loader.js?68d88a15062878948c96a514e38";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <h2 className="text-2xl font-bold text-center mb-4">Visitor Reviews</h2>

      {/* This is the placeholder Trustindex will fill */}
      <div className="ti-widget ti-widget--68d88a15062878948c96a514e38"></div>
    </div>
  );
};

export default GoogleReviewWidget;
