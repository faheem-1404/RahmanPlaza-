/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { gsap } from "gsap";

interface FloorDetail {
  id: number;
  name: string;
  category: string;
  description: string;
  items: string[];
  materials: string[];
  images: string[];
}

const floorData: Record<number, FloorDetail> = {
  1: {
    id: 1,
    name: "Ground Floor",
    category: "Luxury Watches & Gems",
    description: "The Grand Entrance. Discover our signature gold collection and heritage exhibition hall in an environment designed to welcome you into our rich legacy.",
    items: ["Heritage Gold", "Signature Necklaces", "VIP Welcome Salon", "Legacy Exhibition"],
    materials: ["Italian Statuario Marble", "Hand-brushed Brass Filigree", "Soft Alabaster Sconces"],
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop"],
  },
  2: {
    id: 2,
    name: "First Floor",
    category: "High Fashion Curation",
    description: "A secure, private sanctuary featuring premium solitaires, flawless diamond couture, and highly personalized bespoke jewellery curation suites.",
    items: ["Solitaire Gallery", "Diamond Couture Suite", "Heritage Chokers", "Personal Curation Suite"],
    materials: ["Deep Velvet Drapery", "Frosted Rose Glass Panels", "Indirect Amber LED Coves"],
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"],
  },
  3: {
    id: 3,
    name: "Second Floor",
    category: "Bespoke Craftsmanship",
    description: "Exquisite contemporary silver artistry, modern statement pieces, and design innovations tailored for modern elegance.",
    items: ["Premium Silverwear", "Fashion Statements", "Silver Artistry", "Modern Curation Gallery"],
    materials: ["Polished Platinum Accents", "Monochrome Full-grain Leathers", "Smoked Mirror Glass"],
    images: ["https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop"],
  },
  4: {
    id: 4,
    name: "Accessories",
    category: "Curated Statements",
    description: "Curated luxury accompaniments. High-fashion timepieces, designer statements, and hand-woven silk accessories.",
    items: ["Luxury Handbags", "Timepieces", "Designer Eyewear", "Silk Scarves"],
    materials: ["Bespoke French Oak", "Warm Spotlights", "Gold-leaf Trim Accents"],
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"],
  },
  5: {
    id: 5,
    name: "Bridal Collections",
    category: "The Crown Jewel",
    description: "Our crown jewel. An ultra-exclusive bridal parlour showcase presenting royal wedding sets and historic family gold sets.",
    items: ["Royal Bridal Sets", "Heritage Chokers", "Bespoke Bridal Consultations", "Ancestral Jewellery Gallery"],
    materials: ["Plush Crimson Silks", "Gold-leaf Wall Filigree", "Warm Crystal Sconces"],
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"],
  },
};

export default function FloorExplorer() {
  const [activeFloorId, setActiveFloorId] = useState<number>(1);
  const [showGallery, setShowGallery] = useState<number | null>(null);
  const [showItems, setShowItems] = useState<number | null>(null);

  // 3D Tilt Card effect
  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card-explorer");
    cards.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1200,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: "power3.out",
          duration: 1,
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [activeFloorId]);

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-black text-warm-white border-t border-white/5">
      {/* Background Ambient Lighting & Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[30%] right-[10%] w-[50vw] h-[50vw] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[45vw] h-[45vw] bg-[#0A2E1C]/15 rounded-full blur-[180px]" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 min-h-[750px] items-center lg:items-stretch">
        
        {/* Left Side: Editorial Floor Menu */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center gap-12 relative z-20 self-center lg:self-auto">
          <div className="space-y-4">
            <span className="text-gold text-xs uppercase tracking-[0.5em] font-semibold block">The Showroom</span>
            <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-tighter leading-none">
              Explore <br />
              <span className="font-semibold italic text-gold">The Floors</span>
            </h2>
            <p className="text-warm-white/40 text-sm max-w-sm font-light leading-relaxed">
              Discover our signature store layouts. Every floor is architected for an unparalleled experiential journey.
            </p>
          </div>

          {/* Luxury Vertical Divider-separated List */}
          <div className="flex flex-col border-t border-white/10 mt-6 w-full">
            {[1, 2, 3, 4, 5].map((floorId) => {
              const isActive = activeFloorId === floorId;
              return (
                <button
                  key={floorId}
                  onClick={() => setActiveFloorId(floorId)}
                  className="group relative flex items-center justify-between py-8 border-b border-white/10 text-left transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-display text-xs tracking-widest transition-colors duration-500 ${isActive ? "text-gold" : "text-warm-white/30 group-hover:text-gold/50"}`}>
                      0{floorId}
                    </span>
                    <span className={`font-display text-xl md:text-2xl uppercase tracking-wider transition-all duration-500 transform ${isActive ? "text-warm-white translate-x-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "text-warm-white/40 group-hover:text-warm-white/80 group-hover:translate-x-1"}`}>
                      {floorData[floorId].name}
                    </span>
                  </div>
                  {/* Subtle Neon Glow Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicatorExplorer"
                      className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_#D4AF37]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Immersive Cinematic Showroom Preview */}
        <div className="w-full lg:w-[65%] flex flex-col justify-center min-h-[550px] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFloorId}
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-10 h-full justify-between"
            >
              {/* Cinematic Showcase Card */}
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/15 bg-white/[0.02] p-2 group tilt-card-explorer">
                <div className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative">
                  {/* Visual Background */}
                  <img
                    src={floorData[activeFloorId].images[0]}
                    alt={floorData[activeFloorId].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-out opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                  {/* Soft Warm Lighting reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent opacity-60 pointer-events-none mix-blend-color-dodge z-15" />

                  {/* Floating Glassmorphic Details Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="text-gold text-xs uppercase tracking-widest font-semibold block mb-2">Level 0{activeFloorId}</span>
                      <h3 className="text-2xl md:text-3xl font-display font-medium uppercase tracking-tight text-warm-white drop-shadow-md">
                        {floorData[activeFloorId].name} Showcase
                      </h3>
                    </div>
                    
                    {/* Tiny Floating Detail Card */}
                    <div className="glass px-6 py-4 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md max-w-xs shadow-xl hidden md:block">
                      <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold block mb-1">Curation Detail</span>
                      <p className="text-[11px] text-warm-white/70 font-light leading-relaxed">
                        Features {floorData[activeFloorId].materials[0]} and curated {floorData[activeFloorId].items[0]}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Description and Premium CTAs */}
              <div className="space-y-8 px-2">
                <p className="text-warm-white/60 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                  {floorData[activeFloorId].description}
                </p>

                {/* Curved Pill Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setShowGallery(activeFloorId)}
                    className="flex items-center gap-3 px-8 py-3.5 bg-gold text-charcoal rounded-full font-medium text-sm uppercase tracking-widest hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Explore Floor</span>
                  </button>

                  <button
                    onClick={() => setShowItems(activeFloorId)}
                    className="flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 text-warm-white rounded-full font-medium text-sm uppercase tracking-widest hover:bg-white/10 hover:border-gold/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View Collections</span>
                  </button>

                  <button
                    onClick={() => {
                      alert("Step into our bespoke curated digital walkthrough experience.");
                    }}
                    className="flex items-center gap-3 px-8 py-3.5 bg-transparent border border-white/10 text-warm-white/60 rounded-full font-light text-sm uppercase tracking-widest hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-pointer"
                  >
                    <span>Experience Store</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Item Details Popup */}
      <AnimatePresence>
        {showItems && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/85 backdrop-blur-md">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] p-10 relative border border-white/10"
                >
                    <button 
                        onClick={() => setShowItems(null)}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="mb-10">
                        <span className="text-gold text-xs uppercase tracking-[0.3em] block mb-2">Director's Summary</span>
                        <h2 className="text-4xl font-display font-medium uppercase text-warm-white">{floorData[showItems].name} Details</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-gold font-medium mb-4 uppercase tracking-widest text-sm">Key Attractions</h4>
                            <div className="space-y-3">
                                {floorData[showItems].items.map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-warm-white/60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-gold font-medium mb-4 uppercase tracking-widest text-sm">Finishing Materials</h4>
                            <div className="space-y-3">
                                {floorData[showItems].materials.map((material) => (
                                    <div key={material} className="flex items-center gap-3 text-warm-white/60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                        <span>{material}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-warm-white/40 leading-relaxed italic">
                        "Designed with precision and luxury in mind, {floorData[showItems].name} represents our core values of retail excellence."
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Gallery Popup */}
      <AnimatePresence>
        {showGallery && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative flex items-center justify-center"
                >
                    <button 
                        onClick={() => setShowGallery(null)}
                        className="absolute top-10 right-10 p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20 cursor-pointer"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="max-w-6xl w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10">
                        <img 
                            src={floorData[showGallery].images[0]} 
                            alt="Gallery" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="glass px-8 py-4 rounded-full text-gold font-display text-xl tracking-widest uppercase">
                                Cinematic First Look
                            </p>
                        </div>
                    </div>
                </motion.div>
             </div>
        )}
      </AnimatePresence>
    </section>
  );
}
