import React from 'react'
import { motion } from "framer-motion";

function StorySection({RevealOnScroll,fadeUp,staggerContainer}) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        <RevealOnScroll>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 leading-snug mb-6">
            Born on the shores of Lake Kivu
          </h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            Ibirwa — meaning <em>"islands"</em> in Kinyarwanda — was founded in 2018
            by local cycling enthusiast Jean-Pierre Habimana. Growing up cycling the
            hills of Rubavu, he noticed that tourists rarely saw the western province
            the way locals do: by road, by trail, and by saddle.
          </p>
          <p className="text-slate-500 leading-relaxed">
            What started as weekend rides with friends has grown into a full touring
            operation — with carefully curated routes, professional guides, and an
            unshakeable commitment to showing visitors the real Rwanda.
          </p>
        </RevealOnScroll>

        {/* info cards — staggered */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {[
            { label: "Founded",   value: "2018",             cls: "bg-blue-50",  labelCls: "text-blue-500",  valueCls: "text-blue-950" },
            { label: "Base",      value: "Rubavu, Rwanda",    cls: "bg-blue-900", labelCls: "text-blue-300",  valueCls: "text-white"    },
            { label: "Specialty", value: "Lake Kivu Routes",  cls: "bg-blue-700", labelCls: "text-blue-200",  valueCls: "text-white"    },
            { label: "Language",  value: "EN · FR · RW",     cls: "bg-blue-50",  labelCls: "text-blue-500",  valueCls: "text-blue-950" },
          ].map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              className={`${card.cls} rounded-2xl p-5 cursor-default`}
            >
              <span className={`text-xs font-semibold tracking-widest uppercase ${card.labelCls} block mb-2`}>
                {card.label}
              </span>
              <span className={`text-lg font-bold ${card.valueCls}`}>{card.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>
  )
}

export default StorySection