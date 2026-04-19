import React from 'react'
import { motion } from "framer-motion";


function TeamSection({team,fadeUp,staggerContainer,RevealOnScroll}) {
  return (
    <section className="bg-white px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
                The People Behind the Rides
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950">
                Meet Our Team
              </h2>
            </RevealOnScroll>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer(0.15, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="rounded-2xl overflow-hidden border border-slate-200 cursor-default"
                >
                  <div
                    className={`${member.bg} px-6 pt-8 pb-6 flex flex-col items-center gap-3`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white font-bold text-lg tracking-wide"
                    >
                      {member.initials}
                    </motion.div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">
                        {member.name}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5 tracking-wide">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-5">
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
  )
}

export default TeamSection