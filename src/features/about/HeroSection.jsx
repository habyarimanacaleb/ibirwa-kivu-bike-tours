import React from 'react'
import { motion } from "framer-motion";


function HeroSection({staggerContainer, fadeUp}) {
  return (
     <section className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-6 py-24 md:py-36 text-center overflow-hidden">
    
            {/* animated decorative rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/10 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
              className="absolute -top-10 -right-10 w-72 h-72 rounded-full border border-white/5 pointer-events-none"
            />
            {/* left ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none"
            />
    
            {/* content staggered in */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              animate="show"
            >
              <motion.span
                variants={fadeUp}
                className="inline-block bg-white/10 text-blue-100 text-sm tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 mb-6"
              >
                At Ibirwa Kivu Bike Tours
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="inline-block bg-white/10 text-blue-100 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 mb-6"
              >
                Adventure Cycling in Rwanda
              </motion.span>
    
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
              >
                We Ride So You Can{" "}
                <span className="text-blue-300">Discover Lake Kivu</span>
              </motion.h1>
    
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-blue-100 leading-relaxed max-w-xl mx-auto"
              >
                Ibirwa Kivu Bike Tours is a Rwandan-owned cycling company based in Rubavu.
                We design tours that go beyond the surface — through villages, along
                volcanoes, and down to the shore of one of Africa's most beautiful lakes.
              </motion.p>
            </motion.div>
          </section>
  )
}

export default HeroSection