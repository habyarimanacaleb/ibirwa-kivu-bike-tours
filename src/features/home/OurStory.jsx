import React from 'react';

const OurStory = () => {
  // Array of partner image filenames based on your folder structure
  const partnerLogos = [
    "africa-bike-discovering.jpeg",
    "atimic-krew.jpeg",
    "la-pause-du-cycliste.jpeg",
    "uci-kigali-rwanda.jpeg",
    "uza-gateway.jpeg",
    "visit-rwanda.jpeg",
    "visit-rwanda-2.jpeg"
  ];

  return (
    <section id="our-story" className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- PREVIOUS STORY BLOCKS (Remain Same) --- */}
        <div className="max-w-3xl mb-24">
          <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Authentically Rwandan</span>
          <h2 className="text-4xl md:text-6xl font-serif font-black mt-4 text-slate-900 leading-tight">Our Story</h2>
          <div className="mt-8 p-8 border-l-4 border-blue-600 bg-white shadow-sm italic text-xl md:text-2xl text-slate-700 leading-relaxed">
            "Cycling became a way of life, a tool for exploration, and a bridge to my community."
            <span className="block mt-4 font-bold not-italic text-sm text-blue-600 uppercase tracking-widest">— Rwibutso Jean, Founder</span>
          </div>
        </div>

        {/* Story Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-24">
          <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl">
            <img src="https://res.cloudinary.com/djaqdvqld/image/upload/v1768209066/kivu/services/file_uaba65.jpg" alt="Jean Founder" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">Born by the Lake</h3>
            <div className="w-20 h-1.5 bg-blue-600 mb-8 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              IBIRWA KIVU BIKE TOURS is a locally founded adventure company based along the stunning shores of Lake Kivu. Founded by Rwibutso Jean, a passionate guide born and raised near the lake, the company was created from a lifelong connection to the region’s hills and rural trails.
            </p>
          </div>
        </div>

        {/* Story Block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20 mb-24">
          <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl">
            <img src="https://res.cloudinary.com/djaqdvqld/image/upload/v1768207392/kivu/services/file_n1lsk9.jpg" alt="Adventure" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">Slow, Immersive Journeys</h3>
            <div className="w-20 h-1.5 bg-blue-600 mb-8 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              We believe the most meaningful way to experience Rwanda is through slow cycling journeys that connect people with nature and local life. We transform every ride into a story where visitors truly connect with Rwanda's spirit.
            </p>
          </div>
        </div>

        {/* --- UPDATED INFINITE PARTNER SLIDER --- */}
        <div className="mt-20">
          <h4 className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">
            Our Global & Local Partners
          </h4>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

            <div className="flex overflow-hidden whitespace-nowrap">
              <div className="flex animate-scroll-infinite py-4 items-center">
                {/* Loop 1 */}
                {partnerLogos.map((logo, idx) => (
                  <div key={`l1-${idx}`} className="partner-container">
                    <img src={`/patners/${logo}`} alt="Partner Logo" className="partner-img" />
                  </div>
                ))}
                {/* Loop 2 (Duplicate for seamless scroll) */}
                {partnerLogos.map((logo, idx) => (
                  <div key={`l2-${idx}`} className="partner-container">
                    <img src={`/patners/${logo}`} alt="Partner Logo" className="partner-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStory;