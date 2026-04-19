import React,{ useRef } from 'react'
import { motion, useInView } from "framer-motion";

function StatusSection({stats,staggerContainer,StatCard}) {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  return (
     <section
        ref={statsRef}
        className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4"
      >
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4"
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          animate={statsInView ? "show" : "hidden"}
        >
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              animate={statsInView}
              index={i}
            />
          ))}
        </motion.div>
      </section>
  )
}

export default StatusSection