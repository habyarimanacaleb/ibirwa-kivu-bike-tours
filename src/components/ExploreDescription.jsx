import React from "react";

export const ExploreDescription = () => {
  return (
    <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* MTB Tour Description */}
      <section className="py-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">Service Description</h2>
          <p className="text-gray-600 leading-relaxed">
            Embark on a thrilling 6-day mountain biking adventure across Rwanda’s spectacular landscapes with our expertly curated MTB tour. Designed for riders of all skill levels, this tour combines scenic trails with rich cultural encounters and natural beauty.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our professional guides will ensure your safety and provide insight into Rwanda’s history, flora, fauna, and vibrant local cultures as you ride through some of the country’s most iconic locations.
          </p>

          {/* Itinerary */}
          <div className="space-y-10">
            {[
              {
                title: "Day 1: Kigali to Jari (Beginner-Friendly Trails)",
                desc: "Start your journey in Rwanda’s vibrant capital, Kigali, and head towards Jari. This day features an easy ride through rolling hills, terraced farmlands, and local villages, offering an immersive experience of Rwanda’s rural life.",
              },
              {
                title: "Day 2-3: Jari to Musanze (Volcanoes National Park)",
                desc: "Venture into the volcanic terrain of Musanze, home to the famous Volcanoes National Park. This challenging section will test your skills as you bike through lush forests and enjoy views of the Virunga Mountains. Optional visit to mountain gorillas or cultural sites.",
              },
              {
                title: "Day 4-5: Rubavu to Kibuye (Congo Nile Trail)",
                desc: "Cycle along Lake Kivu's stunning shoreline. Forested paths, lakeside trails, and charming villages make this one of Africa’s most picturesque MTB experiences.",
              },
              {
                title: "Day 6: Mount Karongi Full-Day Trail",
                desc: "End your adventure around Mount Karongi, with stunning views of Lake Kivu and waterfalls. A perfect mix of physical challenge and natural serenity.",
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-blue-800">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services Provided</h2>
            <ul className="space-y-4 list-disc list-inside text-gray-600">
              {[
                "High-quality MTB equipment provided or bring your own.",
                "Experienced local guides with deep knowledge of terrain and culture.",
                "Support vehicle for repairs, first aid, and assistance.",
                "Lodging in scenic and comfortable accommodations.",
                "Opportunities for cultural exchange and local interaction.",
                "Customizable trail difficulties for all skill levels.",
                "Refreshments and lunch provided during longer rides.",
              ].map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Why Choose Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose This MTB Tour in Rwanda?</h2>
            <ul className="space-y-3 list-disc list-inside text-gray-600">
              <li>Diverse trails from rural routes to volcanic paths and lakeside roads.</li>
              <li>Unforgettable scenery with hills, volcanoes, forests, and lakes.</li>
              <li>Deep cultural immersion through local interaction and storytelling.</li>
              <li>Promotes sustainable tourism and community empowerment.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rwanda Overview */}
      <section className="py-12 bg-gray-100 rounded-xl mt-10 shadow-md">
        <div className="space-y-6 px-6">
          <h2 className="text-3xl font-bold text-gray-900">Overview of Rwanda</h2>
          <p className="text-gray-700 leading-relaxed">
            Rwanda, often called the "Land of a Thousand Hills," is renowned for its breathtaking scenery and resilient people. It’s a country that has gracefully emerged from its past and now stands as one of Africa’s cleanest, safest, and most welcoming destinations.
          </p>
          <p className="text-gray-700">
            Whether it’s Kigali’s modern charm, the thrill of tracking mountain gorillas in Volcanoes National Park, or the tranquil waters of Lake Kivu, Rwanda offers unforgettable experiences for all visitors.
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-4 italic text-blue-700 text-lg">
            “From mountain trails to heartfelt connections, Rwanda is where adventure meets meaning.”
          </blockquote>
        </div>
      </section>
    </main>
  );
};
