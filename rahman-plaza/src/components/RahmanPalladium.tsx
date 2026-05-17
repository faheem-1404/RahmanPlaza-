import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, MessageCircle, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onBack: () => void;
}

const heroImages = [
  "/edited_hero.png",
  "/elegent.png",
  "/hero_rotate_2.jpeg",
];

const syntheticItems = [
  { id: 1, name: "Gold Covering Necklace", price: "₹799" },
  { id: 2, name: "Korean Butterfly Earrings", price: "₹249" },
  { id: 3, name: "Bridal Temple Set", price: "₹1899" },
  { id: 4, name: "Pearl Layer Chain", price: "₹599" },
  { id: 5, name: "Premium Bangles", price: "₹349" },
  { id: 6, name: "Statement Earrings", price: "₹299" },
  { id: 7, name: "Luxury Bridal Combo", price: "₹2499" },
  { id: 8, name: "Korean Accessories", price: "₹199" },
  { id: 9, name: "Gold Plated Choker", price: "₹999" },
  { id: 10, name: "Emerald Drop Earrings", price: "₹499" },
  { id: 11, name: "Ruby Studded Bangle", price: "₹1199" },
  { id: 12, name: "Diamond Cuts Ring", price: "₹399" },
  { id: 13, name: "Royal Antique Haram", price: "₹2799" },
  { id: 14, name: "Traditional Anklets", price: "₹299" },
  { id: 15, name: "Zirconia Pendant Set", price: "₹699" }
];

export default function RahmanPalladium({ onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [showItems, setShowItems] = useState(false);

  // Scroll to top immediately on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 3D Tilt effect logic
  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.5
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: "power3.out",
          duration: 1
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [showItems]); // Re-bind if items show up

  // Scroll lock for items pop-up modal
  useEffect(() => {
    if (showItems) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showItems]);

  useGSAP(() => {
    // Ambient entrance
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" }
    );

    // Hero Text Entrance
    const heroText = heroRef.current?.querySelectorAll(".hero-text-anim");
    if (heroText) {
      gsap.fromTo(heroText,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, delay: 0.5, ease: "power3.out" }
      );
    }

    // Scrolling cinematic reveals
    const reveals = document.querySelectorAll(".cinematic-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // Ambient floating orbs
    const orbs = document.querySelectorAll(".ambient-orb");
    orbs.forEach((orb) => {
      gsap.to(orb, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.2)",
        duration: "random(8, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, { scope: containerRef });

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      if (prev === -1) return 0;
      return (prev + 1) % heroImages.length;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      if (prev === -1) return heroImages.length - 1;
      return (prev - 1 + heroImages.length) % heroImages.length;
    });
  };

  const handleViewItems = () => {
    setShowItems(true);
  };
  const dragStartX = useRef<number | null>(null);
  const scrollLock = useRef(false);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - endX;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
    dragStartX.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only intercept horizontal scrolls or vertical scrolls inside the carousel
    if (scrollLock.current) return;

    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
      if (e.deltaX > 20 || e.deltaY > 20) {
        nextImage();
      } else {
        prevImage();
      }
      scrollLock.current = true;
      setTimeout(() => { scrollLock.current = false; }, 800);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDF9F1] text-[#2C2825] font-sans relative overflow-x-hidden selection:bg-[#E5C78A]/40 selection:text-[#2C2825]">

      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-orb absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-900/10 rounded-full blur-[120px]" />
        <div className="ambient-orb absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#D4AF37]/15 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center bg-gradient-to-b from-[#FDF9F1]/80 to-transparent backdrop-blur-sm mix-blend-normal">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors font-medium tracking-widest uppercase text-xs group text-[#2C2825]"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Directory
        </button>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Scroll to top"
          >
            <img src="/rahman_palladium_logo_new.jpg" alt="Rahman Palladium" className="h-8 md:h-12 object-contain" />
          </button>
        </div>
      </nav>

      {/* 1. New Cinematic Interactive Hero */}
      <section ref={heroRef} className="relative min-h-[100svh] w-full flex flex-col items-center justify-center pt-32 pb-20 z-10 perspective-[1200px]">

        {/* Interactive Rotating Image Carousel */}
        <div className="relative w-full max-w-7xl mx-auto h-[60vh] md:h-[70vh] flex items-center justify-center mb-8">

          <div className="relative w-[85%] md:w-[50%] lg:w-[40%] h-full flex items-center justify-center group">

            {/* Previous Image Hint (Left) */}
            <div
              onClick={prevImage}
              className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 w-32 md:w-48 aspect-[3/4] rounded-[2rem] overflow-hidden opacity-30 hover:opacity-60 blur-[4px] hover:blur-[2px] transition-all duration-700 cursor-pointer -z-10 tilt-card border border-white/20 hidden sm:block"
            >
              <img src={currentImageIndex === -1 ? heroImages[heroImages.length - 1] : heroImages[(currentImageIndex - 1 + heroImages.length) % heroImages.length]} className="w-full h-full object-cover" alt="Previous" />
            </div>

            {/* Next Image Hint (Right) */}
            <div
              onClick={nextImage}
              className="absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 w-32 md:w-48 aspect-[3/4] rounded-[2rem] overflow-hidden opacity-30 hover:opacity-60 blur-[4px] hover:blur-[2px] transition-all duration-700 cursor-pointer -z-10 tilt-card border border-white/20 hidden sm:block"
            >
              <img src={currentImageIndex === -1 ? heroImages[0] : heroImages[(currentImageIndex + 1) % heroImages.length]} className="w-full h-full object-cover" alt="Next" />
            </div>

            <div
              className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_rgba(44,40,37,0.3)] z-10 tilt-card border-[2px] border-white/50 bg-white/10 backdrop-blur-md p-2 cursor-grab active:cursor-grabbing"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onWheel={handleWheel}
            >
              <div className="w-full h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden relative">

                {/* Images Container with Crossfade */}
                <img
                  src="/hero_main.png"
                  alt="Main Jewellery Visual"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform
                    ${currentImageIndex === -1 ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'}`}
                />
                {heroImages.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Jewellery ${index}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform
                      ${index === currentImageIndex ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'}`}
                  />
                ))}

                {/* Luxury Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/80 via-[#2C2825]/10 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent mix-blend-overlay z-20 pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[2rem] md:rounded-[3.5rem] z-20 pointer-events-none" />

                {/* Interactive Controls Overlay */}
                <div className="absolute inset-0 z-30 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

              </div>
            </div>

            {/* Floating indicator dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {heroImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#2C2825]/20'}`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Hero Text */}
        <div className="relative z-20 text-center px-6 mt-8 w-full max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="hero-text-anim font-serif text-5xl md:text-7xl lg:text-8xl text-[#2C2825] mb-4 leading-[1.1] tracking-tight drop-shadow-sm">
            Elegance <br className="md:hidden" />
            <span className="italic font-light">In Motion.</span>
          </h1>
          <p className="hero-text-anim text-[#2C2825]/70 text-lg md:text-xl font-light max-w-lg mx-auto tracking-wide leading-relaxed mb-8">
            Jewellery crafted to feel timeless, modern, and unforgettable.
          </p>

          <button
            onClick={handleViewItems}
            className="hero-text-anim group relative px-8 py-3 rounded-full border border-[#D4AF37]/50 bg-white/50 backdrop-blur-sm text-[#2C2825] font-medium tracking-widest uppercase text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:border-[#D4AF37] tilt-card"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-2">
              View Items <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

      </section>



      <div ref={sectionsRef} className="relative z-10">

        {/* Collections Section - Curved Asymmetry */}
        <section className="py-32 md:py-48 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

              <div className="flex-1 w-full cinematic-reveal perspective-[1000px]">
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto tilt-card rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.2)] border border-white/60 p-2 bg-white/40 backdrop-blur-sm">
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative group">
                    <img
                      src="/silver.png"
                      alt="Curated Signatures"
                      className="cinematic-parallax w-full h-[120%] object-cover absolute top-[-10%] group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-8 cinematic-reveal text-center md:text-left">
                <span className="text-[#A68A56] uppercase tracking-[0.2em] text-xs font-semibold">Signature Pieces</span>
                <h2 className="font-serif text-4xl md:text-6xl text-[#2C2825] leading-tight">
                  Curated <br className="hidden md:block" />
                  <span className="italic font-light">Signatures</span>
                </h2>
                <div className="w-12 h-[1px] bg-[#A68A56] mx-auto md:mx-0" />
                <p className="text-[#2C2825]/70 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
                  Handpicked pieces inspired by elegance and modern tradition. Experience luxury that speaks to the soul.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Accessories Section - Floating Layout */}
        <section className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden bg-[#F5F4F0] rounded-[4rem] mx-4 md:mx-8 shadow-inner">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60%] h-[100%] bg-orange-900/5 blur-[100px] -z-10 rounded-full" />

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">

              <div className="flex-1 w-full space-y-8 cinematic-reveal text-center md:text-left relative z-10">
                <span className="text-[#A68A56] uppercase tracking-[0.2em] text-xs font-semibold">Contemporary Elegance</span>
                <h2 className="font-serif text-4xl md:text-6xl text-[#2C2825] leading-tight">
                  Modern <br className="hidden md:block" />
                  <span className="italic font-light">Statements</span>
                </h2>
                <div className="w-12 h-[1px] bg-[#A68A56] mx-auto md:mx-0" />
                <p className="text-[#2C2825]/70 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
                  Contemporary accessories inspired by global fashion aesthetics. Designed for the bold and the beautiful.
                </p>
              </div>

              <div className="flex-1 w-full cinematic-reveal perspective-[1000px]">
                <div className="relative aspect-[4/5] w-full max-w-lg ml-auto tilt-card rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(44,40,37,0.15)] border border-white/60 p-2 bg-white/30 backdrop-blur-md">
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative group">
                    <img
                      src="/frame_0_27_11f.jpeg"
                      alt="Modern Statements"
                      className="cinematic-parallax w-full h-[120%] object-cover absolute top-[-10%] group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Showroom Experience - Wide Curved Card */}
        <section className="py-32 md:py-48 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto text-center cinematic-reveal mb-16">
            <span className="text-[#A68A56] uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">The Destination</span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#2C2825] leading-tight mb-8">
              Experience <br />
              <span className="italic font-light">The Store</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#A68A56] mx-auto mb-8" />
            <p className="text-[#2C2825]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              A jewellery destination crafted with warmth, detail, and elegance. Step into a world of curated luxury.
            </p>
          </div>

          <div className="max-w-6xl mx-auto cinematic-reveal perspective-[1200px]">
            <div className="aspect-[16/9] md:aspect-[21/9] w-full tilt-card rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_rgba(44,40,37,0.2)] border-[2px] border-white/60 p-2 bg-white/40 backdrop-blur-md group">
              <div className="w-full h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden relative">
                <img
                  src="/frame_0_39_0f.jpeg"
                  alt="Experience The Store"
                  className="cinematic-parallax w-full h-[130%] object-cover absolute top-[-15%] group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/60 via-transparent to-[#2C2825]/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* The Footer */}
      <footer className="bg-[#2C2825] text-[#FDF9F1] py-24 relative z-10 rounded-t-[3rem] md:rounded-t-[5rem] mt-10 shadow-[0_-20px_50px_rgba(44,40,37,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-16 border-b border-[#FDF9F1]/10 pb-16">

          <div className="space-y-8">
            <img src="/rahman_palladium_logo_new.jpg" alt="Rahman Palladium" className="h-10 md:h-12 object-contain" />
            <p className="text-[#FDF9F1]/60 font-light text-sm max-w-sm leading-relaxed">
              Elevating everyday elegance and celebrating modern heritage in the heart of Chennai. A premium destination for curated jewellery.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-8 text-[#E5C78A] italic">Visit Us</h4>
            <div className="space-y-6 text-[#FDF9F1]/70 font-light text-sm leading-relaxed">
              <p className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#E5C78A] shrink-0 mt-0.5" />
                <span>50/267, Bharathi Salai, <br />Chepauk, Triplicane, <br />Chennai, Tamil Nadu 600005.</span>
              </p>
              <p className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-[#E5C78A] shrink-0" />
                <span>Open Daily until 10:00 PM</span>
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/RAHMAN+PALLADIUM/@13.0588743,80.2751487,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52678af15aafbb:0xc8fe3922cac3f2b0!8m2!3d13.0588743!4d80.2751487!16s%2Fg%2F11ml2n300t?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-10 pb-1 border-b border-[#E5C78A]/50 text-[#E5C78A] hover:text-white hover:border-white transition-colors text-xs tracking-[0.2em] uppercase font-medium"
            >
              Get Directions
            </a>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-8 text-[#E5C78A] italic">Connect</h4>
            <div className="flex flex-col gap-6 text-sm font-light">
              <a href="https://api.whatsapp.com/message/TYQIYELJTZJFB1?autoload=1&app_absent=0&utm_source=ig" target="_blank" rel="noreferrer" className="text-[#FDF9F1]/70 hover:text-[#E5C78A] transition-colors flex items-center gap-3 w-fit">
                WhatsApp Client Service
              </a>
              <a href="https://www.instagram.com/rahmanpalladium" target="_blank" rel="noreferrer" className="text-[#FDF9F1]/70 hover:text-[#E5C78A] transition-colors flex items-center gap-3 w-fit">
                Instagram Official
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587511828514&ref=PROFILE_EDIT_xav_ig_profile_page_web#" target="_blank" rel="noreferrer" className="text-[#FDF9F1]/70 hover:text-[#E5C78A] transition-colors flex items-center gap-3 w-fit">
                Facebook Official
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-[#FDF9F1]/40 tracking-[0.2em] uppercase font-light">
          <p>&copy; {new Date().getFullYear()} Rahman Palladium. All Rights Reserved.</p>
          <p className="mt-6 md:mt-0 italic font-serif text-[#FDF9F1]/50 capitalize tracking-normal text-sm">Elegance In Motion.</p>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <a
        href="https://api.whatsapp.com/message/TYQIYELJTZJFB1?autoload=1&app_absent=0&utm_source=ig"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#FDF9F1] border border-[#D4AF37]/30 rounded-[1.5rem] flex items-center justify-center text-[#2C2825] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 hover:bg-[#D4AF37] hover:text-white transition-all duration-500 z-50 group tilt-card"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute right-16 bg-[#2C2825] text-white text-xs px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-medium tracking-wide">
          Bespoke Service
        </span>
      </a>

      {/* 2. Luxury Items Showcase Pop-up Modal */}
      {showItems && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setShowItems(false)}
            className="absolute inset-0 bg-[#2C2825]/85 backdrop-blur-md transition-opacity duration-500 cursor-pointer animate-[fadeIn_0.5s_ease-out]"
          />

          {/* Style Block for Popup Keyframes */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes luxuryPopup {
              from {
                opacity: 0;
                transform: scale(0.92) translateY(30px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}} />

          {/* Pop-up Container */}
          <div
            className="relative w-full max-w-4xl bg-[#FDF9F1] border border-[#D4AF37]/30 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_30px_70px_rgba(44,40,37,0.5)] overflow-hidden max-h-[85vh] flex flex-col z-10 transition-all duration-500"
            style={{
              animation: 'luxuryPopup 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >

            {/* Header */}
            <div className="flex justify-between items-center px-8 md:px-12 pt-8 md:pt-12 pb-6 border-b border-[#D4AF37]/20 shrink-0">
              <div>
                <span className="text-[#A68A56] uppercase tracking-[0.2em] text-xs font-semibold block mb-2">Bespoke Collection</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#2C2825] leading-none">
                  Premium <span className="italic font-light">Selections</span>
                </h3>
              </div>
              <button
                onClick={() => setShowItems(false)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2C2825]/15 flex items-center justify-center hover:bg-[#2C2825] hover:text-white transition-all duration-500 text-lg font-light hover:rotate-90"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-4 md:gap-y-6">
                {syntheticItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-baseline justify-between py-4 border-b border-[#2C2825]/10 group hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base md:text-lg text-[#2C2825] group-hover:text-[#D4AF37] transition-colors font-medium">
                      {item.name}
                    </span>
                    <span className="flex-grow mx-2 md:mx-4 border-b border-dotted border-[#A68A56]/30 relative -top-[4px]" />
                    <span className="font-serif text-base md:text-lg text-[#A68A56] group-hover:text-[#2C2825] transition-colors font-medium text-right shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center text-xs text-[#2C2825]/40 tracking-wider">
                All prices are subject to craftsmanship and pure metal quality. Visit store for custom orders.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
