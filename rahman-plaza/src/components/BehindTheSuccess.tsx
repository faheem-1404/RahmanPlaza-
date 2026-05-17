/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function BehindTheSuccess() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-black via-[#05120a] to-black text-warm-white border-t border-white/5">
      {/* Cinematic Glowing Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-[#0A2E1C]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] bg-[#D4AF37]/5 rounded-full blur-[180px]" />
      </div>

      {/* Noise Texture Overlay for Premium Depth */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-gold font-display text-xs uppercase tracking-[0.6em] mb-4 block"
          >
            Our Legacy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-display font-light uppercase leading-tight tracking-tighter"
          >
            Behind The <span className="text-gold font-semibold italic">Success</span>
          </motion.h2>
          
          {/* Glowing Luxury Divider */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "120px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6 shadow-[0_0_10px_#D4AF37]"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-warm-white/40 max-w-xl mx-auto mt-6 font-light text-base md:text-lg leading-relaxed"
          >
            The people, passion, and vision behind Raman Plaza.
          </motion.p>
        </div>

        {/* Single Premium Cinematic Showcase */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[2rem] md:rounded-[3rem] bg-white/[0.01] backdrop-blur-xl border border-white/[0.06] hover:border-[#D4AF37]/30 p-4 md:p-6 flex flex-col items-center transition-all duration-700 hover:shadow-[0_20px_50px_rgba(5,18,10,0.3)] shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Soft Inner Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Portrait Container with Float Parallax - Matches original 1555x940 aspect ratio perfectly */}
            <div className="w-full aspect-[1555/940] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:border-[#D4AF37]/40 shadow-inner relative flex items-center justify-center bg-charcoal/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-700">
              <motion.img
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
                src="/about.png.jpeg"
                alt="Behind The Success"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.8s] ease-out"
              />
            </div>

            {/* Elegant Narrative Overlay / Description */}
            <div className="mt-8 md:mt-12 px-6 md:px-12 text-center pb-4">
              <p className="text-warm-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
                "Since 1974, our journey has been defined by the hands that craft, the minds that inspire, and the collective passion that leads. A dedicated family of artisans, curators, and visionaries working in absolute harmony to elevate every detail into a timeless masterpiece."
              </p>
              
              <div className="w-8 h-px bg-gold/30 mx-auto mt-8 mb-3" />
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold">
                Crafting Trust, Elevating Heritage
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
