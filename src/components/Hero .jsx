import React from "react";
export const Hero = () => {
  return (
    <section
      className="hero bg-cover bg-center h-96"
      style={{
        backgroundImage: "url('../kivu-image/mtb-bg-image.jpg')",
        opacity: 0.9,
        filter: "brightness(80%)",
      }}
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            Explore Rwanda: A 6-Day MTB Adventure
          </h1>
          <p className="text-lg">Through the Land of a Thousand Hills</p>
        </div>
      </div>
    </section>
  );
};
