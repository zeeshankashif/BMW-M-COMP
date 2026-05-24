/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PerformanceOption } from './types';
import LiquidCanvas from './components/LiquidCanvas';
import HeroSection from './components/HeroSection';
import PerformanceCustomizer from './components/PerformanceCustomizer';
import MediaGrid from './components/MediaGrid';
import ComparisonTable from './components/ComparisonTable';
import SandboxFooter from './components/SandboxFooter';
import { Cpu, Gauge, Radio, ArrowUp, X } from 'lucide-react';

export default function App() {
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [showFloatingHud, setShowFloatingHud] = useState(false);
  const [isHudDismissed, setIsHudDismissed] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Maintain active configurator state to bind back into floating HUD
  const [customizedSpecs, setCustomizedSpecs] = useState<{
    engine?: PerformanceOption;
    aerodynamics?: PerformanceOption;
    wheels?: PerformanceOption;
    finish?: PerformanceOption;
  }>({});

  // Sync data-theme with the document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 1. Loading/Calibration Sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsCalibrating(false), 300); // slight buffer for raw visual punch
          return 100;
        }
        // Increment with natural technical steps
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // 2. Track Window Scroll to reveal HUD and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      // Reveal floating HUD only if scrolled past core hero height (approx 800px)
      setShowFloatingHud(scrollY > 400);

      const totalScrollable = docHeight - winHeight;
      const pct = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;
      setScrollPercentage(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToCustomizer = () => {
    const customizerElem = document.getElementById('customizer-section');
    if (customizerElem) {
      customizerElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTable = () => {
    const tableElem = document.getElementById('comparison-specs');
    if (tableElem) {
      tableElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cumulative calculated telemetry readings
  const activeBhp = customizedSpecs.engine?.bhp || 503;
  const activeTorque = customizedSpecs.engine?.torque || 650;
  const activeWeight = (customizedSpecs.engine?.weightSaved || 0) + 
                       (customizedSpecs.aerodynamics?.weightSaved || 0) + 
                       (customizedSpecs.wheels?.weightSaved || 0) + 
                       (customizedSpecs.finish?.weightSaved || 0);

  return (
    <div className="relative text-matte-white-950 bg-matte-black font-sans selection:bg-white selection:text-black">
      
      {/* BACKGROUND FLOATING WATERMARK ACCENT (Artistic Flair theme) */}
      <div className="fixed top-[25%] left-[-5%] text-[24vw] font-display font-black tracking-tighter opacity-[0.015] leading-none pointer-events-none select-none italic transform -skew-x-12 uppercase z-0 text-white">
        RACING
      </div>
      
      {/* GLOBAL DIAGNOSTIC HANDSHAKE CALIBRATOR (LOADER) */}
      <AnimatePresence>
        {isCalibrating && (
          <motion.div
            key="calibrator-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-matte-black z-50 flex flex-col justify-between p-8 md:p-16 select-none"
          >
            {/* Top diagnostic metadata lines */}
            <div className="flex justify-between items-start font-mono text-[10px] text-matte-gray-400">
              <div className="space-y-1">
                <span>SYSTEM CORE STATUS: INTEGRATING</span>
                <span className="block text-[#666]">MODEL_HASH: M4_G82_COMPETITION_2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="animate-ping h-1.5 w-1.5 bg-veloce-coral rounded-full" />
                <span>MUNICH DEPT. SENSOR SYNC IN PROGRESS...</span>
              </div>
            </div>

            {/* Giant Center Calibrator counter */}
            <div className="my-auto max-w-2xl space-y-4">
              <span className="font-mono text-xs text-veloce-coral tracking-[0.25em] block uppercase">
                // CALIBRATING INTERACTIVES STATE
              </span>
              <h2 className="font-display font-black text-6xl md:text-8xl tracking-tighter text-white">
                {calibrationProgress}%
              </h2>
              
              {/* Progress wireline bar */}
              <div className="h-[2px] w-full bg-white/[0.05] relative overflow-hidden">
                <motion.div 
                  className="h-full bg-veloce-coral absolute left-0"
                  style={{ width: `${calibrationProgress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Progress step message */}
              <div className="flex justify-between text-[10px] font-mono text-matte-gray-400">
                <span>[ENGINE COILS / INJECTION VOLTS SYNCED]</span>
                <span>OCTANE BALANCE: 102 RON OK</span>
              </div>
            </div>

            {/* Bottom frame coordinates */}
            <div className="flex justify-between items-end font-mono text-[9px] text-[#444]">
              <span>[COORD_X: 48.1351] // [COORD_Y: 11.5820]</span>
              <span>ZEXAN MENCY INC // ALL SYSTEMS LOADED_</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER DYNAMIC LIQUID WIND-TUNNEL CANVAS LAYER */}
      <LiquidCanvas theme={theme} />

      {/* TOP SCROLL DEPTH PROGRESS HUD */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/[0.02] z-50">
        <div 
          className="h-full bg-gradient-to-r from-veloce-coral via-cyan-400 to-white transition-all duration-100 ease-out"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* PERSISTENT FLOATING SPECS HUD PORTABLE PANEL (DESKTOP) */}
      <AnimatePresence>
        {showFloatingHud && !isHudDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 15, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-8 z-40 hidden md:block bg-matte-black/90 backdrop-blur-md p-5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-80 max-w-sm rounded-none"
          >
            {/* HUD Title */}
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-3 mb-4">
              <div className="flex items-center space-x-2 font-mono text-[10px]">
                <Cpu className="w-3.5 h-3.5 text-veloce-coral animate-pulse" />
                <span className="font-bold text-white tracking-widest uppercase">M4 TELEMETRY PORT</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[8px] bg-veloce-coral/15 text-veloce-coral px-1.5 py-0.5 tracking-wider font-semibold uppercase">
                  TUNED SPEC
                </span>
                <button
                  onClick={() => setIsHudDismissed(true)}
                  className="text-matte-gray-400 hover:text-white hover:bg-white/5 transition-colors p-1"
                  title="Close panel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Diagnostic stats list */}
            <div className="space-y-3.5 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-matte-gray-400">ENGINE BULLET:</span>
                <span className="text-white font-bold">{activeBhp} BHP</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-matte-gray-400">BOOST TORQUE:</span>
                <span className="text-white font-bold">{activeTorque} Nm</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-matte-gray-400">MASS REDUCED:</span>
                <span className="text-green-400 font-bold">-{activeWeight} KG</span>
              </div>
            </div>

            {/* Dynamic Customizer jump button */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.08] grid grid-cols-2 gap-2">
              <button 
                onClick={handleScrollToCustomizer}
                className="w-full text-[9px] font-mono font-bold tracking-widest uppercase text-center py-2 bg-white text-matte-black border border-white hover:bg-black hover:text-white hover:border-white/40 transition-colors cursor-pointer"
              >
                CUSTOMIZER
              </button>
              <button 
                onClick={handleScrollToTable}
                className="w-full text-[9px] font-mono font-bold tracking-widest uppercase text-center py-2 bg-transparent text-matte-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
              >
                VIEW REPORT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="relative z-20">
        
        {/* 1. THE INITIAL HOOK: ASYMMETRICAL MOODY HERO PANEL */}
        <HeroSection 
          onScrollToCustomizer={handleScrollToCustomizer} 
          theme={theme} 
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
        />

        {/* 2. THE CUSTOMIZATION COMPILATOR CONSOLE */}
        <PerformanceCustomizer onStateChange={(specs) => setCustomizedSpecs(specs)} />

        {/* 3. ASYMMETRICAL MULTI-COLUMN MEDIA DATA GRID */}
        <MediaGrid />

        {/* 4. CLINICAL SPEC COMPARISON AUDIT TABLING */}
        <ComparisonTable />

        {/* 5. EXPERIMENTAL TEXT-WARPING FOOTER SANDBOX */}
        <SandboxFooter />

      </main>

    </div>
  );
}
