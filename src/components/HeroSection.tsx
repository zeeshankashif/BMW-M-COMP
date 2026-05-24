/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Cpu, Compass, Sliders, Shield } from 'lucide-react';
import m4FrontHero from '../assets/images/m4_front_hero_1779611846687.png';

interface HeroSectionProps {
  onScrollToCustomizer: () => void;
}

export default function HeroSection({ onScrollToCustomizer }: HeroSectionProps) {
  // Anim-bezier for sleek premium mechanical snaps
  const easeOutBezier = [0.16, 1, 0.3, 1];

  return (
    <section id="portal-hero" className="relative min-h-screen flex flex-col justify-between px-6 py-8 md:px-16 md:py-12 bg-matte-black overflow-hidden select-none">
      {/* Structural Frame Borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.03]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03]" />
      <div className="absolute top-0 left-8 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute top-0 right-8 w-[1px] h-full bg-white/[0.02]" />

      {/* Top Header Rail */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end mb-8 z-20 border-b border-white/10 pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-1">Research & Development // Laboratory</span>
          <h1 className="text-3xl font-black tracking-tighter leading-none text-white">ZEXAN MENCY<span className="text-veloce-coral font-bold">.</span></h1>
        </div>
        <nav className="flex gap-6 md:gap-12 text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mt-4 md:mt-0 font-display">
          <span className="text-white border-b-2 border-white pb-1 font-bold">Configurator</span>
          <span className="hover:text-white transition-colors">Dynamics</span>
          <span className="hover:text-white transition-colors">Propulsion</span>
          <span className="hover:text-white transition-colors font-mono">V.26 CONCEPT</span>
        </nav>
      </div>

      {/* Main Massive Asymmetrical Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 my-auto pt-12 md:pt-4 z-20">
        
        {/* Left Column: Bold Asymmetric Typography Panel (Spans 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
          
          <div className="space-y-4">
            {/* Tiny technical accent bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1, ease: easeOutBezier }}
              className="h-[3px] bg-veloce-coral"
            />
            
            <p className="font-mono text-xs text-veloce-coral tracking-[0.25em] uppercase">
              // EXPERIMENTAL MONUMENTS
            </p>
          </div>

          <h1 className="font-display text-6xl md:text-7xl xl:text-9xl font-black leading-[0.82] tracking-tighter uppercase italic transform -skew-x-6 text-white pb-2">
            <span className="block overflow-hidden">
              <motion.span
                className="block cursor-pointer select-none origin-left transition-colors duration-300 hover:text-veloce-coral"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: easeOutBezier }}
                whileHover={{ x: 16, skewX: -4 }}
              >
                M4 COMP.
              </motion.span>
            </span>
            <span className="block overflow-hidden text-outline uppercase">
              <motion.span
                className="block cursor-pointer select-none origin-left transition-all duration-300 hover:text-veloce-coral hover:[-webkit-text-stroke:1px_#00f0ff]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: easeOutBezier }}
                whileHover={{ x: 16, skewX: -4 }}
              >
                STG. III
              </motion.span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: easeOutBezier }}
            className="text-sm md:text-base text-matte-gray-400 font-sans font-light max-w-xl leading-relaxed"
          >
            A high-contrast manifestation of automotive force and composite aerodynamics. Built out of dry-vacuum baked carbon fiber, tailored for radical thermal regulation, and calibrated on the Nürburgring Nordschleife.
          </motion.p>

          {/* Quick Technical Specs Overlay Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: easeOutBezier }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.05]"
          >
            <div className="space-y-1">
              <span className="block font-mono text-[10px] text-matte-gray-400 tracking-wider">0-60 MPH</span>
              <span className="block font-display text-2xl font-semibold tracking-tight text-white">2.9 <span className="text-xs text-veloce-coral font-mono">SEC</span></span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] text-matte-gray-400 tracking-wider">POWER</span>
              <span className="block font-display text-2xl font-semibold tracking-tight text-white">675 <span className="text-xs text-veloce-coral font-mono">BHP</span></span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] text-matte-gray-400 tracking-wider">WEIGHT</span>
              <span className="block font-display text-2xl font-semibold tracking-tight text-white">-115 <span className="text-xs text-veloce-coral font-mono">KG</span></span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] text-matte-gray-400 tracking-wider">AERO SYSTEM</span>
              <span className="block font-display text-2xl font-semibold tracking-tight text-white">ACTIVE</span>
            </div>
          </motion.div>

          {/* Interactive Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            <button
              onClick={onScrollToCustomizer}
              className="group relative inline-flex items-center space-x-3 bg-white text-matte-black font-mono text-xs font-bold tracking-widest uppercase py-3.5 px-7 rounded-none overflow-hidden transition-all duration-300 hover:pr-9 active:scale-[0.98] cursor-pointer"
            >
              {/* Corner slash detail */}
              <div className="absolute right-0 top-0 h-4 w-4 bg-matte-black translate-x-3 -translate-y-3 rotate-45 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
              <span>LAUNCH SPEC CUSTOMIZER</span>
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </motion.div>

        </div>

        {/* Right Column: Premium High-Fidelity Car Rendering Display (Spans 5 cols) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          
          {/* Subtle Outer Frame Grid Indicators */}
          <div className="absolute -top-4 -left-4 font-mono text-[8px] text-white/20 select-none">[FRAME_SEC_R4]</div>
          <div className="absolute -bottom-4 -right-4 font-mono text-[8px] text-white/20 select-none">[503BHP_STG2]</div>
          
          <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 font-mono text-xs font-bold z-30 tracking-widest uppercase">
            V03-CORE-ENGINEERING
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: easeOutBezier }}
            className="relative w-full h-full aspect-[16/10] lg:aspect-[4/3] bg-matte-gray-900 border border-white/[0.08] p-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* Tech details on overlay */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-white/50 tracking-wider bg-matte-black/60 backdrop-blur-sm px-2 py-1 border border-white/10 uppercase">
              M4 EXPERIMENTAL SPEC // CHASSIS V-4
            </div>

            <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
              <span className="flex h-1.5 w-1.5 mt-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-veloce-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-veloce-coral"></span>
              </span>
              <span className="font-mono text-[10px] text-white/60">INTELLIGENT AERODYNAMIC RIG</span>
            </div>

            {/* Front quarter generated image */}
            <img 
              src={m4FrontHero} 
              alt="Matte Black M4 Competition Concept - front quarter rendering" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-700 hover:scale-105 hover:grayscale-0"
            />
          </motion.div>

        </div>

      </div>

      {/* Hero Footer: Scrolling Guideline / Downward Indicator */}
      <div className="relative flex justify-between items-end border-t border-white/[0.04] pt-6 z-20 mt-12 md:mt-0">
        <div className="flex items-center space-x-6 text-matte-gray-400 font-mono text-[10px] tracking-widest">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-veloce-coral" />
            <span>TUNED: V-LABS COUTURE STAGE II</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5" />
            <span>WARRANTY PROTECTED ARCHITECTURE</span>
          </div>
        </div>

        <button 
          onClick={onScrollToCustomizer}
          className="group flex flex-col items-center space-y-2 text-matte-white-950/70 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">SCROLL ENGINE DISCOVERY</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="p-1 px-[5px] border border-white/20 rounded-full group-hover:border-white/50 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5 text-veloce-coral" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
