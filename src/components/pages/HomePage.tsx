// HPI 1.7-V
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { ChevronDown, ArrowRight, Cross, Calendar, Users, BookOpen, Play, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Types & Interfaces ---

interface FeatureItem {
  title: string;
  description: string;
  link: string;
  delay: number;
  icon: React.ElementType;
}

// --- Canonical Data Sources ---
// Preserving original data structures and content exactly as requested.

const HERO_CONTENT = {
  title: "A Legacy of Faith Through Time",
  subtitle: "Journey through decades of spiritual heritage, sacred moments, and unwavering devotion",
  cta: "Explore Our Story",
  ctaLink: "/history"
};

const INTRO_CONTENT = {
  title: "Welcome to Our Sacred Archive",
  p1: "This digital sanctuary preserves and shares the profound history of our church—a testament to faith, community, and spiritual growth spanning generations.",
  p2: "Walk through our halls of memory, where every photograph tells a story, every milestone marks a moment of grace, and every era reflects the enduring spirit of our congregation."
};

const FEATURES_DATA: FeatureItem[] = [
  {
    title: 'Historical Eras',
    description: 'Journey through distinct periods of growth and transformation',
    link: '/history',
    delay: 0,
    icon: BookOpen,
  },
  {
    title: 'Interactive Timeline',
    description: 'Explore key milestones and sacred moments in chronological order',
    link: '/timeline',
    delay: 0.1,
    icon: Calendar,
  },
  {
    title: 'Leadership Legacy',
    description: 'Meet the shepherds who guided our spiritual community',
    link: '/leadership',
    delay: 0.2,
    icon: Users,
  },
  {
    title: 'Ministries',
    description: 'Discover programs that serve and strengthen our congregation',
    link: '/ministries',
    delay: 0.3,
    icon: Cross,
  },
  {
    title: 'Media Gallery',
    description: 'Witness our story through photographs and videos',
    link: '/media',
    delay: 0.4,
    icon: Play,
  },
  {
    title: 'Events',
    description: 'Celebrate past gatherings and upcoming occasions',
    link: '/events',
    delay: 0.5,
    icon: MapPin,
  },
];

const ASSETS = {
  // Using the provided URL. Since it's a PNG in the source but used as video, 
  // we will treat it as a high-fidelity image for the "Ken Burns" effect to ensure stability.
  heroSource: "https://static.wixstatic.com/media/a25ded_33ac2397360c4b84a0a0c6f12fb97c07~mv2.png?originWidth=1920&originHeight=1024",
  placeholder: "https://static.wixstatic.com/media/a25ded_fb6f9226c831457fb9bcfaeffcc62c7d~mv2.png?originWidth=1024&originHeight=1280"
};

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-soft-gold origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] mix-blend-overlay">
    <svg className="h-full w-full">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const ParallaxText = ({ children, className, offset = 50 }: { children: React.ReactNode, className?: string, offset?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const RevealText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
              delay: delay + i * 0.02
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const SacredGeometry = ({ className }: { className?: string }) => {
  return (
    <div className={`opacity-20 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.5" />
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
      </svg>
    </div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-clip selection:bg-soft-gold/30">
      <style>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(218, 165, 32, 0.3);
          color: transparent;
        }
        .clip-arch {
          clip-path: inset(0 0 0 0 round 200px 200px 0 0);
        }
        .clip-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
      `}</style>
      
      <ScrollProgress />
      <NoiseOverlay />
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <motion.div 
            className="w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          >
            <Image
              src={ASSETS.heroSource}
              alt="Sanctuary Background"
              className="w-full h-full object-cover brightness-[0.65]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-deep-brown/60 via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
            className="mb-8"
          >
            <span className="inline-block py-1 px-3 border border-off-white/30 rounded-full text-xs font-paragraph tracking-[0.2em] text-off-white/80 uppercase mb-6 backdrop-blur-sm">
              EST:1599
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl text-off-white leading-[0.9] tracking-tight mix-blend-overlay opacity-90">
              {HERO_CONTENT.title}
            </h1>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl text-transparent text-stroke absolute top-8 left-0 right-0 mx-auto leading-[0.9] tracking-tight pointer-events-none select-none blur-[1px]">
              {HERO_CONTENT.title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-paragraph text-lg md:text-xl text-off-white/90 max-w-2xl leading-relaxed mb-12 font-light"
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href={HERO_CONTENT.ctaLink}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-soft-gold/10 backdrop-blur-md border border-soft-gold/30 text-off-white font-paragraph tracking-wide rounded-sm overflow-hidden transition-all duration-500 hover:bg-soft-gold hover:text-deep-brown hover:border-soft-gold"
            >
              <span className="relative z-10">{HERO_CONTENT.cta}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-soft-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-off-white/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-off-white/60 font-paragraph">Scroll</span>
        </motion.div>
      </section>

      {/* --- INTRO SECTION (The Vision) --- */}
      <section className="relative py-32 lg:py-48 px-6 overflow-hidden">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 relative z-10">
              <div className="absolute -left-20 -top-20 w-64 h-64 text-soft-gold/5">
                <SacredGeometry />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="font-heading text-4xl md:text-6xl text-deep-brown mb-10 leading-tight">
                  <RevealText text={INTRO_CONTENT.title} />
                </h2>
                
                <div className="space-y-8">
                  <p className="font-paragraph text-lg text-foreground/70 leading-relaxed border-l-2 border-soft-gold/30 pl-6">
                    {INTRO_CONTENT.p1}
                  </p>
                  <p className="font-paragraph text-lg text-foreground/70 leading-relaxed pl-6">
                    {INTRO_CONTENT.p2}
                  </p>
                </div>

                <div className="mt-12 pl-6">
                  <div className="h-[1px] w-24 bg-deep-brown/20 mb-8" />
                  <div className="flex gap-12">
                    <div>
                      <span className="block font-heading text-4xl text-soft-gold mb-1">100+</span>
                      <span className="text-xs uppercase tracking-widest text-deep-brown/60">Years of History</span>
                    </div>
                    <div>
                      <span className="block font-heading text-4xl text-soft-gold mb-1">5k+</span>
                      <span className="text-xs uppercase tracking-widest text-deep-brown/60">Community Members</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Image Composition */}
            <div className="lg:col-span-7 relative">
              <ParallaxText offset={30} className="relative z-10">
                <div className="relative aspect-[4/5] w-full max-w-2xl mx-auto clip-arch overflow-hidden shadow-2xl bg-sandstone/10">
                  <Image
                    src={ASSETS.placeholder}
                    alt="Church Interior"
                    className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/40 to-transparent pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-12 right-12 bg-off-white/90 backdrop-blur p-6 max-w-xs shadow-lg border-t-4 border-soft-gold hidden md:block">
                    <p className="font-heading text-deep-brown text-xl italic">"Faith is the substance of things hoped for, the evidence of things not seen."</p>
                  </div>
                </div>
              </ParallaxText>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-20 w-96 h-96 bg-soft-gold/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY PARALLAX DIVIDER --- */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-deep-brown text-off-white clip-path-slant">
        <div className="absolute inset-0 opacity-30">
           <Image
             src={ASSETS.placeholder}
             alt="Texture"
             className="w-full h-full object-cover grayscale"
           />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6">The Living Word</h3>
            <p className="font-paragraph text-xl md:text-2xl text-soft-gold/80 max-w-3xl mx-auto">
              Connecting the past, present, and future through service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID (The Archive) --- */}
      <section className="relative py-32 px-6 bg-off-white">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-deep-brown/10 pb-8">
            <div>
              <span className="text-soft-gold font-paragraph text-sm tracking-widest uppercase mb-2 block">Explore The Archive</span>
              <h2 className="font-heading text-5xl text-deep-brown">Curated Collections</h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-deep-brown/60 max-w-md font-paragraph text-sm leading-relaxed">
                Navigate through the pillars of our community. Each section represents a vital chapter in our ongoing story.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <motion.a
                key={feature.title}
                href={feature.link}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: feature.delay, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[400px] bg-background border border-deep-brown/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Card Background Image (Subtle) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                   <Image
                     src={ASSETS.placeholder}
                     alt=""
                     className="w-full h-full object-cover grayscale"
                   />
                </div>

                {/* Content Container */}
                <div className="relative h-full p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-soft-gold/10 rounded-full text-deep-brown group-hover:bg-soft-gold group-hover:text-white transition-colors duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading text-4xl text-deep-brown/10 group-hover:text-soft-gold/20 transition-colors duration-300">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl text-deep-brown mb-4 group-hover:text-soft-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-deep-brown/20 mb-4 group-hover:w-full group-hover:bg-soft-gold/50 transition-all duration-500" />
                    <p className="font-paragraph text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-soft-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMMERSIVE CTA SECTION --- */}
      <section className="relative py-40 px-6 bg-deep-brown overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-soft-gold rounded-full mix-blend-overlay filter blur-[100px] animate-pulse" />
           <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sandstone rounded-full mix-blend-overlay filter blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 border border-soft-gold/30 rotate-45 flex items-center justify-center">
                <div className="w-12 h-12 border border-soft-gold/60 flex items-center justify-center">
                   <div className="w-2 h-2 bg-soft-gold rounded-full" />
                </div>
              </div>
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl text-off-white mb-8">
              Join Our Story
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-off-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              Be part of our continuing legacy. Connect with us and discover how you can contribute to our sacred journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="px-10 py-5 bg-soft-gold text-white font-paragraph font-medium text-lg tracking-wide hover:bg-white hover:text-deep-brown transition-all duration-300 min-w-[200px]"
              >
                Get in Touch
              </a>
              <a
                href="/events"
                className="px-10 py-5 border border-off-white/30 text-off-white font-paragraph font-medium text-lg tracking-wide hover:bg-off-white/10 transition-all duration-300 min-w-[200px]"
              >
                View Calendar
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}