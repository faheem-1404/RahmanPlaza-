/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Placeholder - For Cinematic Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-deep-green/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          {/* Logo in Hero */}
          <div className="mb-12 relative group">
             <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
             <div className="relative z-10 bg-white p-6 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.15)] border-2 border-gold/40 flex items-center justify-center w-48 h-48 md:w-56 md:h-56 overflow-hidden hover:scale-105 transition-transform duration-500">
                 <img 
                    src="/logo_plaza.png" 
                    alt="Rahman Plaza Logo" 
                    className="w-[85%] h-[85%] object-contain" 
                 />
             </div>
          </div>

          <span className="text-gold font-display text-sm uppercase tracking-[0.4em] mb-4 text-glow">
            Since 1974
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter leading-none mb-8 uppercase">
            RAHMAN <br />
            <span className="font-semibold text-gold italic">PLAZA</span>
          </h1>
          <p className="text-warm-white/60 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-12">
            The heart of Triplicane. Elevating the luxury retail experience through half a century of excellence.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Enter</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
