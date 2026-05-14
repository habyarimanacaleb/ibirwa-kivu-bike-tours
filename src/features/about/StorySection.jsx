import React from 'react';
import { motion } from "framer-motion";

function StorySection({RevealOnScroll, fadeUp, staggerContainer}) {
  const cards = [
    { label: "Founded", value: "2018", cls: "bg-blue-50 text-blue-950", labelCls: "text-blue-500" },
    { label: "Base", value: "Rubavu, Rwanda", cls: "bg-blue-900 text-white", labelCls: "text-blue-300" },
    { label: "Specialty", value: "Kivu Routes", cls: "bg-blue-600 text-white", labelCls: "text-blue-100" },
    { label: "Language", value: "EN · FR · RW", cls: "bg-slate-100 text-slate-900", labelCls: "text-slate-500" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
      <RevealOnScroll>
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">Our Story</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">Born on the shores of Lake Kivu.</h2>
        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
          <p>
            Ibirwa — meaning <span className="text-blue-600 font-bold italic">"islands"</span> in Kinyarwanda — was founded in 2018 by local cycling enthusiast Jean-Pierre Habimana.
          </p>
          <p>
            Growing up cycling the hills of Rubavu, he noticed that tourists rarely saw the western province the way locals do: by road, by trail, and by saddle. What started as weekend rides has grown into a premier touring operation.
          </p>
        </div>
      </RevealOnScroll>

      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className={`${card.cls} rounded-[2rem] p-8 shadow-lg shadow-blue-900/5`}
          >
            <span className={`text-[10px] font-black uppercase tracking-widest ${card.labelCls} block mb-2`}>
              {card.label}
            </span>
            <span className="text-xl font-black">{card.value}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
export default StorySection;