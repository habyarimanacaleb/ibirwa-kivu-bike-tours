import React from 'react'
import { motion } from "framer-motion";

function ValueSection({staggerContainer,fadeUp,values,RevealOnScroll}) {
  return (
    <section className="bg-slate-50 px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
                Why Ride With Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950">
                What We Stand For
              </h2>
            </RevealOnScroll>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer(0.12, 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 30px rgba(30,77,140,0.12)",
                    transition: { duration: 0.25 },
                  }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 transition-colors duration-200 cursor-default"
                >
                  <motion.div
                    className="text-3xl mb-4"
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.4 },
                    }}
                  >
                    {v.icon}
                  </motion.div>
                  <h3 className="text-base font-bold text-blue-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
  )
}

export default ValueSection