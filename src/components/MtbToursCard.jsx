import React from "react";
export const MtbToursCard = () => {
  const tours = [
    {
      id: 1,
      imgSrc: "kivu-image/mtb-image-01.jpg",
      title: "Lake Kivu Boat Cruise",
      description:
        "Relax on a tranquil boat cruise along Lake Kivu, enjoying breathtaking views and serene waters.",
    },
    // {
    //   id: 2,
    //   imgSrc: "kivu-image/mtb-image-02.jpg",
    //   title: "Kayaking Adventure",
    //   description:
    //     "Paddle through scenic waters and connect with nature on an exciting kayaking experience.",
    // },
    {
      id: 3,
      imgSrc: "kivu-image/mtb-image-03.jpg",
      title: "Congo Nile Trail Biking",
      description:
        "Explore breathtaking landscapes on a scenic biking tour along the famous Congo Nile Trail.",
    },
    {
      id: 4,
      imgSrc: "kivu-image/mtb-image-04.jpg",
      title: "Nyanza Kingdom Palace Tour",
      description:
        "Step back in time and discover Rwanda’s rich royal heritage at the historic Nyanza Kingdom Palace.",
    },
    {
      id: 5,
      imgSrc: "kivu-image/mtb-image-05.jpg",
      title: "Kigali City Experience",
      description:
        "Immerse yourself in Kigali’s vibrant culture, from modern attractions to historical landmarks.",
    },
    {
      id: 6,
      imgSrc: "kivu-image/mtb-image-06.jpg",
      title: "Genocide Memorial Tour",
      description:
        "Reflect on Rwanda’s past and its journey of healing at the Genocide Memorial sites.",
    },
    {
      id: 7,
      imgSrc: "kivu-image/mtb-image-07.jpg",
      title: "Coffee & Tea Plantation Tour",
      description:
        "Witness the production process and sample Rwanda’s finest coffee and tea in the West Province.",
    },
    {
      id: 8,
      imgSrc: "kivu-image/mountain-bike-1.jpg",
      title: "Mount Karongi Biking Adventure",
      description:
        "Ride through tea and coffee plantations and visit the breathtaking Mubuga Waterfall.",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      id="mtbTourCards"
    >
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="card bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 min-w-76 p-2"
        >
          <div className="image">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={tour.imgSrc}
              alt={tour.title}
            />
          </div>
          <h2 className="text-xl font-semibold mt-3 text-gray-800">
            {tour.title}
          </h2>
          <p className="text-gray-600 mt-2">{tour.description}</p>
        </div>
      ))}
    </div>
  );
};
