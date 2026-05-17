/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface BuildingRevealProps {
  onSelectBranch: (branch: "plaza" | "palladium" | "khalifa") => void;
}

export default function BuildingReveal({ onSelectBranch }: BuildingRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);

  // Paths for the images provided by the user
  const leftImage = "/LEFT FINAL.png";
  const rightImage = "/RIGHT FINAL.png";

  const branches = [
    { id: "plaza", logo: "/logo_plaza.png", name: "Plaza" },
    { id: "palladium", logo: "/logo_palladium.png", name: "Palladium" },
    { id: "khalifa", logo: "/logo_khalifa.png", name: "Khalifa" },
  ] as const;

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate the two halves splitting
    tl.to(leftHalfRef.current, {
      xPercent: -100,
      ease: "none",
    }, 0)
      .to(rightHalfRef.current, {
        xPercent: 100,
        ease: "none",
      }, 0)
      // Reveal the interior
      .fromTo(interiorRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", ease: "power3.out" },
        0.2
      );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Cinematic Interior Reveal */}
      <div
        ref={interiorRef}
        className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 bg-radial-gradient from-deep-green/30 to-transparent opacity-60" />

        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]"
        />

        <h2 className="text-6xl md:text-9xl font-display font-light text-warm-white mb-2 leading-none uppercase tracking-tighter">
          Welcome <br />
          <span className="font-bold text-gold italic">Inside</span>
        </h2>

        <p className="text-gold/60 text-sm tracking-[0.5em] uppercase font-medium mt-4 mb-12">
          The Heart of Triplicane
        </p>

        {/* Branch Logos Selection */}
        <div className="flex items-center justify-center gap-8 md:gap-16 z-50">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => onSelectBranch(branch.id)}
              className="group flex flex-col items-center gap-4 transition-all hover:scale-110 active:scale-95"
            >
              <div className="glass p-4 rounded-2xl border border-white/5 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <img src={branch.logo} alt={branch.name} className="h-16 md:h-24 w-auto object-contain" />
              </div>
              <span className="text-[10px] text-warm-white/40 group-hover:text-gold uppercase tracking-[0.3em] font-medium transition-colors">
                Rahman {branch.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent" />
          <span className="text-[10px] text-warm-white/30 uppercase tracking-widest">Est. 1974</span>
        </div>
      </div>

      {/* Building Half - Left */}
      <div
        ref={leftHalfRef}
        className="absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none"
      >
        <img
          src={leftImage}
          alt="Rahman Plaza Left"
          className="w-full h-full object-cover object-right"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545459720-aac8309b4ef5?q=80&w=2000";
          }}
        />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
      </div>

      {/* Building Half - Right */}
      <div
        ref={rightHalfRef}
        className="absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none"
      >
        <img
          src={rightImage}
          alt="Rahman Plaza Right"
          className="w-full h-full object-cover object-left"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545459720-aac8309b4ef5?q=80&w=2000";
          }}
        />
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
      </div>
    </section>


  );
}
