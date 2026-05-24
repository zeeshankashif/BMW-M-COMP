/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function SandboxFooter() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  // Monitor scroll depth specifically near the footer to drive letter-spacing warping
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate global scroll percentage [0, 1]
      const totalScrollable = docHeight - winHeight;
      const progress = totalScrollable > 0 ? scrollY / totalScrollable : 0;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial trigger

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert scroll progress into structural warp parameters
  // letter-spacing widens by up to 1.8em as you hit the bottom of the page
  const letterSpacingValue = `${0.3 + scrollProgress * 1.5}em`;
  const scaleValue = 0.95 + scrollProgress * 0.1;

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#070707] py-20 px-6 md:px-16 border-t border-white/[0.06] overflow-hidden select-none"
    >
      {/* Decorative backdrop mesh grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-20">
        
        {/* UPPER PANEL: Grid with columns and lists */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/[0.04] pb-16">
          
          {/* Brand/Department Column (Spans 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <span className="font-display font-medium text-lg tracking-widest text-white">
              ZEXAN MENCY<span className="text-veloce-coral">.</span>
            </span>
            <p className="text-xs text-matte-gray-400 font-sans font-light leading-relaxed max-w-sm">
              Custom styling, aerodynamic design, and mechanical engine calibration. Engineering prototypes driven beyond baseline standard limits since 2026.
            </p>
            <div className="space-y-2 text-[11px] font-mono text-matte-gray-400">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-veloce-coral" />
                <span>Munich Industrial Park, Gate 4B, Germany</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-veloce-coral" />
                <span>+49 (89) 5800-SPEC</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-veloce-coral" />
                <span>telemetry@zexanmency.de</span>
              </div>
            </div>
          </div>

          {/* Dynamic Link Columns with Expand-from-Center hovers */}
          {/* Column 2: TUNING DIVISION (Spans 2.5 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] text-[#555555] font-bold tracking-widest uppercase">
              // SPEC LISTS
            </h4>
            <ul className="space-y-3 font-mono text-[11.5px]">
              {['ECU CALIBRATIONS', 'EXHAUST SYSTEM COILS', 'TURBO MANIFOLDS', 'TRACK AIRFLOW DESIGNS'].map((item) => (
                <li key={item}>
                  <span className="relative py-1 inline-block group cursor-pointer text-matte-gray-400 hover:text-white transition-colors">
                    {item}
                    {/* Expand from center underline border */}
                    <span className="absolute bottom-0 left-1/2 w-full h-[1px] bg-veloce-coral origin-center -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: AERODYNAMICS (Spans 2.5 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] text-[#555555] font-bold tracking-widest uppercase">
              // THE ARCHITECTURE
            </h4>
            <ul className="space-y-3 font-mono text-[11.5px]">
              {['DRY CARBON MONOCOQUE', 'VENTURI INDUCTION TUNNELS', 'ACTIVE TAIL SPOILERS', 'CHASSIS TORQUE LINKAGE'].map((item) => (
                <li key={item}>
                  <span className="relative py-1 inline-block group cursor-pointer text-matte-gray-400 hover:text-white transition-colors">
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-full h-[1px] bg-veloce-coral origin-center -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: GLOBAL OFFICE (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-[#555555] font-bold tracking-widest uppercase">
              // RESOURCES
            </h4>
            <ul className="space-y-3 font-mono text-[11.5px]">
              {['LAB AUDITS', 'COMPLIANCE SHEETS', 'WARRANTY SPECS', 'CONTACT DEPT'].map((item) => (
                <li key={item}>
                  <span className="relative py-1 inline-block group cursor-pointer text-matte-gray-400 hover:text-white transition-colors">
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-full h-[1px] bg-veloce-coral origin-center -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* MIDDLE PANEL: Massive, scroll-reactive warping title */}
        <div className="text-center py-6 border-b border-white/[0.04]">
          <h2
            style={{ 
              letterSpacing: letterSpacingValue,
              transform: `scale(${scaleValue})`,
            }}
            className="font-display font-black text-6xl md:text-8xl xl:text-9xl text-white select-none pointer-events-none transition-all duration-300 ease-out leading-none pr-0 uppercase opacity-90 inline-block w-full text-center whitespace-nowrap italic transform -skew-x-6 animate-pulse"
          >
            ZEXAN MENCY
          </h2>
        </div>

        {/* LOWER RAIL: Copyright, Status, Scroll to Top button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-[#555555]">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span>© 2026 ZEXAN MENCY INC. ALL SPEC DATA RESERVED.</span>
            <div className="flex items-center space-x-1.5 text-matte-gray-400">
              <Globe className="w-3.5 h-3.5 text-veloce-coral" />
              <span>STUTTGART // MUNICH HUB SYSTEM</span>
            </div>
          </div>

          <button 
            onClick={handleScrollToTop}
            className="group flex items-center space-x-2.5 bg-white/[0.02] hover:bg-white text-matte-gray-400 hover:text-matte-black p-2.5 px-5 border border-white/10 hover:border-white transition-all duration-300 cursor-pointer"
          >
            <span className="font-bold tracking-wider uppercase">PULL RIG TO APEX TOP</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce group-hover:scale-110" />
          </button>
        </div>

      </div>
    </footer>
  );
}
