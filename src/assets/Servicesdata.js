import extraimage from "/hello-image/six-island-image.jpg"
//assets/
const servicesData = [
  {
    id: 1,
    image: "kivu-image/six-island-image-2.jpg",
    title: "Six Islands Kivu Tours",
    description:
      "Discover six unique islands including Punishment, Peace, and Farm Islands. Each offers a blend of cultural heritage, lush landscapes, and recreational activities.",
    details: {
      highlights: [
        "Guided boat tour on Lake Kivu",
        "Explore Napoleon Island, Monkey Island, Peace Island, Volcano Island, Plantation Island, and Punishment Island",
        "Blend of history, culture, and natural beauty",
      ],
      tips: [
        "Soft Drinks Included",
        "Experienced Guide",
        "Affordable price for this service",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 2,
    image: "kivu-image/kayaki-image-1.jpg",
    title: "Kayaking And Biking Adventure",
    description:
      "Glide across Lake Kivu’s calm waters while enjoying stunning views of volcanic mountains. Perfect for both solo explorers and groups.",
    details: {
      highlights: [
        "Kayaking on Lake Kivu",
        "Biking through scenic routes",
        "Stunning views of volcanic mountains",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 3,
    image: "kivu-image/night-fishing.jpg",
    title: "Night Fishing Experience",
    description:
      "The Night Fishing Experience on Lake Kivu offers an unforgettable adventure, immersing participants in the traditional fishing practices of local Rwandan fishermen.",
    details: {
      highlights: [
        "Traditional fishing practices",
        "Night-time adventure",
        "Learn from local fishermen",
      ],
      tips: [
        "Wear warm clothing",
        "Bring a flashlight",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 4,
    image: "kivu-image/local-culture.jpg",
    title: "Local Cultural and Geographics",
    description:
      "Immerse yourself in Rwanda’s rich culture with traditional dances, local cuisine, and scenic tours of Nyakariba Swamp and Nkombo Island.",
    details: {
      highlights: [
        "Traditional dances",
        "Local cuisine",
        "Scenic tours of Nyakariba Swamp and Nkombo Island",
      ],
      tips: [
        "Wear comfortable shoes",
        "Bring a camera",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 5,
    image: "kivu-image/plantation-2.jpg",
    title: "Kibuye Local Plantation Tours",
    description:
      "Explore plantations of coffee, bananas, and macadamia nuts. Learn about traditional farming practices while enjoying scenic landscapes.",
    details: {
      highlights: [
        "Coffee, banana, and macadamia plantations",
        "Learn traditional farming practices",
        "Scenic landscapes",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 6,
    image: "kivu-image/long-trip.jpg",
    title: "Kibuye To Gisenyi Long Trip",
    description:
      "Embark on a boat trip along Lake Kivu’s shores. Take in breathtaking views and explore cultural attractions during this journey.",
    details: {
      highlights: [
        "Boat trip along Lake Kivu",
        "Breathtaking views",
        "Explore cultural attractions",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 7,
    image: "kivu-image/congo-nile.jpg",
    title: "Congo Nile Trail Adventures",
    description:
      "Hike, bike, or kayak along this iconic trail. Enjoy diverse landscapes, vibrant communities, and stunning lake views.",
    details: {
      highlights: [
        "Hiking, biking, or kayaking",
        "Diverse landscapes",
        "Vibrant communities",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 8,
    image: "kivu-image/night-ampibians-2.jpg",
    title: "Night Amphibians Tour",
    description:
      "Explore Nyakariba Swamp under the stars. Spot unique amphibians and learn from knowledgeable guides about this nocturnal ecosystem.",
    details: {
      highlights: [
        "Night-time exploration",
        "Spot unique amphibians",
        "Learn from knowledgeable guides",
      ],
      tips: [
        "Wear warm clothing",
        "Bring a flashlight",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 9,
    image: "kivu-image/bird-watching.jpg",
    title: "Bird Watching Experience",
    description:
      "Observe diverse bird species such as herons and kingfishers. Popular spots include Mbabara and Mafundugu Islands.",
    details: {
      highlights: [
        "Observe diverse bird species",
        "Popular spots: Mbabara and Mafundugu Islands",
        "Learn from knowledgeable guides",
      ],
      tips: [
        "Bring binoculars",
        "Wear comfortable clothing",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 10,
    image: "kivu-image/coffee-macadamia.jpg",
    title: "Coffee and Macadamia Experience",
    description:
      "Visit Kinunu’s plantations to learn about coffee and macadamia cultivation. Enjoy fresh brews and engage with local farmers.",
    details: {
      highlights: [
        "Visit Kinunu’s plantations",
        "Learn about coffee and macadamia cultivation",
        "Enjoy fresh brews",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 11,
    image: "kivu-image/nyakiriba-swamp-2.jpg",
    title: "Nyakariba Swamp Exploration",
    description:
      "Take a guided tour through the swamp’s rich biodiversity. Perfect for eco-tourists and wildlife enthusiasts.",
    details: {
      highlights: [
        "Guided tour through the swamp",
        "Rich biodiversity",
        "Perfect for eco-tourists and wildlife enthusiasts",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 12,
    image: "kivu-image/eco-tourism.jpg",
    title: "Eco-Tourism and Sustainable Travel",
    description:
      "Learn about sustainable practices while exploring Rwanda’s natural wonders. Engage with projects aimed at conservation and community development.",
    details: {
      highlights: [
        "Learn about sustainable practices",
        "Explore Rwanda’s natural wonders",
        "Engage with conservation and community development projects",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 13,
    image: "kivu-image/mountain-bike-1.jpg",
    title: "Mountain Karongi Bike Full Day",
    description:
      "The Mountain Karongi Bike Adventure was a memorable 50 km journey through Rwanda’s Western Province, blending physical challenge, natural beauty, and cultural exploration.",
    details: {
      highlights: [
        "50 km biking adventure",
        "Physical challenge",
        "Natural beauty and cultural exploration",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 14,
    image: "kivu-image/Dawn-dust-insect.jpg",
    title: "The Dawn/Dusk Insects Experience",
    description:
      "The Dawn/Dusk Insects Experience around Lake Kivu offers a unique sensory journey into the natural world.",
    details: {
      highlights: [
        "Unique sensory journey",
        "Explore insects at dawn/dusk",
        "Learn from knowledgeable guides",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring a flashlight",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 15,
    image: "kivu-image/swimming-cow-1.jpg",
    title: "Swimming Cows Experience",
    description:
      "The swimming cows of Mafundugu Island in Lake Kivu have become a captivating natural phenomenon.",
    details: {
      highlights: [
        "Observe swimming cows",
        "Unique natural phenomenon",
        "Learn from knowledgeable guides",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring a camera",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 16,
    image: "kivu-image/mountain-bike-2.jpg",
    title: "Cit Tour Experience",
    description:
      "Embark on a biking and hiking adventure along the Kivu Belt Road, an immersive journey through Rwanda's stunning West Province.",
    details: {
      highlights: [
        "Biking and hiking adventure",
        "Explore Kivu Belt Road",
        "Immersive journey through West Province",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 17,
    image: "kivu-image/local-culture-2.jpg",
    title: "Rwanda Culture And History",
    description:
      'Rwanda, often referred to as the "Land of a Thousand Hills," is a captivating destination offering a blend of breathtaking natural landscapes and rich cultural experiences.',
    details: {
      highlights: [
        "Explore Rwanda's culture and history",
        "Breathtaking natural landscapes",
        "Rich cultural experiences",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring a camera",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 18,
    image: "kivu-image/residential.jpg",
    title: "Accommodation And Car Rentals In Kibuye Rwanda",
    description:
      "Nestled along the picturesque shores of Lake Kivu, Kibuye is a serene and captivating town in Rwanda's Western Province.",
    details: {
      highlights: [
        "Accommodation options",
        "Car rentals available",
        "Explore Kibuye town",
      ],
      tips: ["Book in advance", "Check availability", "Guided tours available"],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 19,
    image: "kivu-image/Bridge-Mount-Jali.jpg",
    title: "Bridge – Mount Jali To Kibagabaga Trail",
    description:
      'The "Bridge – Mount Jali" fitness journey is an exhilarating mountain bike ride that challenges cyclists with its scenic routes and demanding terrain.',
    details: {
      highlights: [
        "Exhilarating mountain bike ride",
        "Scenic routes",
        "Demanding terrain",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
  {
    id: 20,
    image: "kivu-image/Mountain-biking-in-Musanze.jpg",
    title: "Mountain Bike Adventures In Volcano's Region",
    description:
      "Musanze, located in the northern part of Rwanda, is an adventurer's paradise, renowned for its breathtaking landscapes and a range of mountain biking trails.",
    details: {
      highlights: [
        "Mountain biking trails",
        "Breathtaking landscapes",
        "Adventurer's paradise",
      ],
      tips: [
        "Wear comfortable clothing",
        "Bring sunscreen and water",
        "Guided tours available",
      ],
      contact: {
        whatsapp: "https://wa.me/250784606393",
        email: "mailto:jeandamourrwibutso@gmail.com",
      },
    },
  },
];

/// Function to compress an image
const compressImage = (url, quality = 0.5) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedUrl = URL.createObjectURL(blob);
            resolve(compressedUrl);
          } else {
            reject("Compression failed");
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = reject;
    img.src = url;
  });
};

export const helloImagesData = [
  "/hello-image/bird-watching.jpg",
  "/hello-image/coffee-macadamia.jpg",
  "/hello-image/coffee.jpg",
  "/hello-image/congi-nile-tailler.jpg",
  "/hello-image/Dawn-dust-insect.jpg",
  "/hello-image/Dawn-insect.jpg",
  "/hello-image/eco-tourism.jpg",
  "/hello-image/flying-image.jpg",
  "/hello-image/kayaki-image.jpg",
  "/hello-image/local-culture.jpg",
  "/hello-image/long-trip.jpg",
  "/hello-image/luxury.jpg",
  "/hello-image/mtb-image.jpg",
  "/hello-image/night-ampibians-2.jpg",
  "/hello-image/night-ampibians.jpg",
  "/hello-image/night-fishing.jpg",
  "/hello-image/nyakiriba-swamp.jpg",
  "/hello-image/plantation.jpg",
  "/hello-image/six-island-image.jpg",
  "/hello-image/swimming-cow.jpg"
];

// Compress all service images in parallel and export a promise
export const  getCompressedServicesImages = async () => {
  const compressedImages = await Promise.all(
    servicesData.map(async (service) => {
      try {
        const compressedUrl = await compressImage(service.image, 0.5);
        return {
          id: service.id,
          image: compressedUrl,
          title: service.title,
          description: service.description,
        };
      } catch (error) {
        console.error(`Compression failed for ${service.image}:`, error);
        // fallback to original image
        return {
          id: service.id,
          image: service.image,
          title: service.title,
          description: service.description,
        };
      }
    })
  );

  return compressedImages;
};

// Slider data for welcome page
export const imageData = servicesData
  .map((service) => ({
    id: service.id,
    image: service.image,
    title: service.title,
    extraimage: extraimage,
  }))
  .slice(0, 10);

export default servicesData;

