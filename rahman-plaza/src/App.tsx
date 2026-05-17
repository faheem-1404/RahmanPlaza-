/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Hero from "./components/Hero";
import BuildingReveal from "./components/BuildingReveal";
import FloorExplorer from "./components/FloorExplorer";
import StoreDetail from "./components/StoreDetail";
import RahmanPalladium from "./components/RahmanPalladium";
import BehindTheSuccess from "./components/BehindTheSuccess";

type ViewState = "home" | "plaza" | "palladium" | "khalifa";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("home");

  useEffect(() => {
    // Only use Lenis on home page for smooth scroll reveal
    if (currentView !== "home") {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [currentView]);

  if (currentView !== "home") {
    if (currentView === "palladium") {
      return <RahmanPalladium onBack={() => setCurrentView("home")} />;
    }
    
    return (
      <StoreDetail
        branch={currentView as "plaza" | "palladium" | "khalifa"}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-warm-white selection:bg-gold/30 selection:text-gold">
      <Hero />

      <BuildingReveal onSelectBranch={(branch) => setCurrentView(branch)} />

      <BehindTheSuccess />

      {/* Premium Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#030a06]/80 backdrop-blur-md relative overflow-hidden">
        {/* Soft Background Green/Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0A2E1C]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-12 relative z-10">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-display font-medium uppercase tracking-[0.2em]">
              RAHMAN <span className="text-gold font-semibold italic">PLAZA</span>
            </h2>
            <p className="text-warm-white/40 text-sm md:text-base font-light tracking-wide max-w-sm">
              Elevating the luxury retail experience.
            </p>
          </div>

          {/* Real Brand Logo Icons (WhatsApp, Instagram, Facebook) */}
          <div className="flex items-center justify-center gap-6">
            {/* WhatsApp */}
            <a 
              href="https://api.whatsapp.com/message/TYQIYELJTZJFB1?autoload=1&app_absent=0&utm_source=ig" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 hover:border-gold/50 flex items-center justify-center text-warm-white/60 hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-1"
              aria-label="WhatsApp Client Service"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.797 1.451 5.485.002 9.948-4.468 9.95-9.959.002-2.66-1.033-5.159-2.915-7.043C16.538 1.718 14.05 .68 11.393.68c-5.484 0-9.95 4.467-9.952 9.96 0 2.004.52 3.96 1.503 5.66l-.997 3.64 3.738-.98c1.61.879 3.23 1.334 4.875 1.334z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/rahmanpalladium" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 hover:border-gold/50 flex items-center justify-center text-warm-white/60 hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-1"
              aria-label="Instagram Profile"
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/people/Rahman-Palladium/61587511828514/?ref=PROFILE_EDIT_xav_ig_profile_page_web" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 hover:border-gold/50 flex items-center justify-center text-warm-white/60 hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-1"
              aria-label="Facebook Page"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Standard Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm font-medium tracking-[0.1em] text-warm-white/50 border-t border-white/5 pt-8 w-full max-w-xl">
            <a href="https://www.instagram.com/rahmanpalladium" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#architecture" className="hover:text-gold transition-colors">Architecture</a>
            <a href="#privacy" className="hover:text-gold transition-colors">Privacy</a>
          </div>

          {/* Copyright Section */}
          <p className="text-warm-white/20 text-xs tracking-[0.2em] uppercase font-light">
            &copy; {new Date().getFullYear()} RAHMAN PLAZA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}

