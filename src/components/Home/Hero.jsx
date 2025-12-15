import React, { useEffect, useState } from 'react'

function Hero({localImages}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % localImages.length);
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
  return (
     <div className="services-images relative h-80 w-full overflow-hidden border-b-2 border-gray-300">
                {localImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Service ${index + 1}`}
                      className="w-full h-80 object-cover"
                      style={{ objectPosition: "center" }}
                    />
                  </div>
                ))}
              </div>
  )
}

export default Hero