/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TelemetryGridItem } from '../types';
import { Cpu, Activity, CircleAlert, Minimize2, ChevronRight } from 'lucide-react';

import chassisWheel from '../assets/images/chassis_wheel_1779611917546.png';
import engineEngine from '../assets/images/engine_engine_1779611892969.png';
import m4FrontHero from '../assets/images/m4_front_hero_1779611846687.png';
import m4RearProfile from '../assets/images/m4_rear_profile_1779611872987.png';

const MEDIA_GRID_ITEMS: TelemetryGridItem[] = [
  {
    id: 'monocoque-front',
    title: 'MONOCOQUE ANTHRACITE SHELL',
    subtitle: 'Stealth housing with dynamic active grill flow dams.',
    image: m4FrontHero,
    aspect: 'landscape',
    coordinates: 'LAT_REF_48_135[X:882]',
    frequency: '92.4 Hz vibration threshold',
    telemetry: [
      { label: 'Carbon Weave Grade', value: 'IM7 High-Modulus Dry carbon' },
      { label: 'Thermal Resistance', value: 'Sustained 680°C drag load' },
      { label: 'Lidar Aperture', value: '144° Multi-planar scan' },
      { label: 'Active Intake Flaps', value: 'Continuous adaptive pitch' },
    ],
  },
  {
    id: 'engine-thermal',
    title: 'THERMAL COMBUSTION ENGINE',
    subtitle: 'Precision twin-scroll turbine spool management core.',
    image: engineEngine,
    aspect: 'portrait',
    coordinates: 'CYL_BANK_1_6[CH:4]',
    frequency: '8,200 RPM redline ceiling',
    telemetry: [
      { label: 'Bore / Stroke ratio', value: '84.0 mm x 90.0 mm' },
      { label: 'Injection Pressure', value: '350 Bar Piezo-electric' },
      { label: 'Turbo Spool Ratio', value: 'Parallel Mono-scroll' },
      { label: 'Manifold Compound', value: 'Inconel 625 Titanium' },
    ],
  },
  {
    id: 'chassis-rotors',
    title: 'FORGED UNSPLUNG ROTORS',
    subtitle: 'Lightweight rotational magnesium and ceramic response hubs.',
    image: chassisWheel,
    aspect: 'square',
    coordinates: 'HUB_RE_L_09[RAD:20]',
    frequency: '76.2 rad/sec deflection limit',
    telemetry: [
      { label: 'Brake Disc Caliper', value: '6-piston monoblock' },
      { label: 'Rotor Composition', value: 'Carbon ceramic composite' },
      { label: 'Wheel Bolt Pattern', value: 'Precision Centerlock nut' },
      { label: 'Tire Grip Velocity', value: 'Cup 2 R compound radial' },
    ],
  },
  {
    id: 'airflow-vectorizer',
    title: 'LAMINAR VECTOR COUPLER',
    subtitle: 'Active trailing air diffuser and drag reduction spoiler.',
    image: m4RearProfile,
    aspect: 'landscape',
    coordinates: 'DIFF_AER_998[Z:114]',
    frequency: '18.4 kN vertical suction load',
    telemetry: [
      { label: 'Spoiler Pitch Angle', value: 'Manual 14° aerodynamic step' },
      { label: 'Diffuser Vortex Fins', value: 'Quad channel direct split' },
      { label: 'Exhaust Valving EQ', value: 'Piezo-damped bypass valve' },
      { label: 'Trailing Slip stream', value: 'Boundary layer adhesion active' },
    ],
  },
];

export default function MediaGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeDiagnostic, setActiveDiagnostic] = useState<TelemetryGridItem | null>(null);

  const easeBezier = [0.16, 1, 0.3, 1];

  return (
    <section id="media-grid" className="relative py-20 px-6 md:px-16 bg-matte-black text-white overflow-hidden border-t border-white/[0.04]">
      {/* Visual Frame Layout indicators */}
      <div className="absolute right-12 top-6 font-mono text-[9px] text-[#444444] hidden sm:block">
        GRID: ASYMMETRIC_4_BLOCK // ACTIVE RENDERS
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-14">
          <span className="font-mono text-xs text-veloce-coral tracking-[0.2em] uppercase font-medium">
            // MECHANICAL ARCHITECTURE ARCHIVES
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white mt-1 uppercase italic transform -skew-x-6">
            SPECIMEN <span className="text-outline">ARCHIVES.</span>
          </h2>
          <p className="text-sm text-matte-gray-400 font-sans font-light max-w-xl mt-3 leading-relaxed">
            Hover over any interlocking matrix module to connect live diagnostic cables and unlock raw sensor readings, material properties, and thermal dissipation indexes.
          </p>
        </div>

        {/* Complex Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] sm:auto-rows-[300px]">
          {MEDIA_GRID_ITEMS.map((item, index) => {
            // High-contrast asymmetrical layout config
            const layoutSpan = 
              index === 0 ? 'md:col-span-8 md:row-span-1' :
              index === 1 ? 'md:col-span-4 md:row-span-2' :
              index === 2 ? 'md:col-span-4 md:row-span-1' :
              'md:col-span-8 md:row-span-1';

            return (
              <div
                key={item.id}
                className={`${layoutSpan} group relative bg-matte-gray-900 border border-white/[0.06] overflow-hidden cursor-pointer flex flex-col justify-end p-6 transition-all duration-300`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveDiagnostic(item)}
              >
                {/* High contrast interactive tab sticker indicator */}
                <div className="absolute right-0 top-0 bg-white text-black font-mono text-[9px] font-bold tracking-widest px-3 py-1 uppercase z-20 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
                  ANALYSIS.SYS
                </div>

                {/* Micro-telemetry coordinates block */}
                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-white/40 group-hover:text-white/80 transition-colors uppercase flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-veloce-coral animate-pulse transition-colors" />
                  <span>{item.coordinates}</span>
                </div>

                {/* Main Visual Image Layer */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700 ease-out z-0 pointer-events-none"
                />

                {/* Dark Linear Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/40 to-transparent z-10 pointer-events-none" />

                {/* Default Text Panel */}
                <div className="relative z-20 transition-all duration-500 transform group-hover:translate-y-1">
                  <span className="font-mono text-[9px] text-veloce-coral tracking-widest font-semibold block mb-1">
                    SYS: CODE_0X{index + 1}
                  </span>
                  <h3 className="font-display font-bold text-base md:text-lg tracking-tight text-white mb-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#999999] font-sans font-light line-clamp-1 group-hover:text-white/85 transition-colors">
                    {item.subtitle}
                  </p>
                </div>

                {/* Elegant Hover-Reveal Diagnostic Box Overlay (Desktop Overlay) */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="absolute inset-0 bg-matte-black/95 backdrop-blur-sm p-6 flex flex-col justify-between z-30 border border-veloce-coral/40"
                    >
                      {/* Top diagnostic header */}
                      <div className="flex justify-between items-start border-b border-white/[0.08] pb-3 font-mono">
                        <div>
                          <span className="text-veloce-coral text-[9px] tracking-widest font-bold block">
                            DIAGNOSTICS INITIALIZED
                          </span>
                          <span className="text-white text-[11px] font-bold">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[9px] text-white/50 bg-white/[0.05] px-2 py-0.5 uppercase">
                          {item.coordinates}
                        </span>
                      </div>

                      {/* Diagnostic details grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {item.telemetry.map((t, idx) => (
                          <div key={idx} className="space-y-0.5 border-l border-white/10 pl-2">
                            <span className="block font-mono text-[8px] text-matte-gray-400 uppercase tracking-wider">
                              {t.label}
                            </span>
                            <span className="block font-sans text-[11px] text-white font-medium">
                              {t.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Click trigger action block */}
                      <div className="border-t border-white/[0.08] pt-2.5 flex items-center justify-between font-mono text-[9px]">
                        <span className="text-matte-gray-400 italic">
                          Freq: {item.frequency}
                        </span>
                        <span className="text-veloce-coral font-bold uppercase animate-pulse flex items-center">
                          EXPAND FULL METRICS <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* COMPREHENSIVE SENSOR LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeDiagnostic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-matte-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveDiagnostic(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="bg-[#0e0e0e] border border-white/10 w-full max-w-4xl p-6 md:p-8 space-y-6 relative rounded-none overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Backglow element in modal */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-veloce-coral/5 rounded-full blur-[80px]" />

              {/* Close Button */}
              <button
                onClick={() => setActiveDiagnostic(null)}
                className="absolute top-6 right-6 p-2 text-matte-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-none transition-colors group cursor-pointer"
              >
                <Minimize2 className="w-4 h-4 group-hover:scale-95 transition-transform" />
              </button>

              {/* Grid Header */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-veloce-coral" />
                  <span className="font-mono text-[10px] text-veloce-coral tracking-[0.2em] font-bold">
                    SECURE DIAL COOPER // FULL TELEMETRY READOUT
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white uppercase">
                  {activeDiagnostic.title}
                </h3>
              </div>

              {/* Grid layout inside lightbox */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Visual rendering panel */}
                <div className="relative aspect-[16/10] bg-matte-black border border-white/10 p-2 overflow-hidden">
                  <div className="absolute bottom-4 left-4 z-20 font-mono text-[8px] text-white/45 bg-black/60 px-1.5 py-0.5">
                    RESONATOR INTERPLAY
                  </div>
                  <img
                    src={activeDiagnostic.image}
                    alt={activeDiagnostic.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 saturate-50"
                  />
                </div>

                {/* Raw technical reports */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Option values list */}
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-[#666666] block border-b border-white/[0.05] pb-1 uppercase">
                      ACTIVE SENSOR ARRAY PARAMETERS
                    </span>
                    <div className="grid grid-cols-1 gap-3">
                      {activeDiagnostic.telemetry.map((t, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-white/[0.03]">
                          <span className="text-[#888888]">{t.label}:</span>
                          <span className="text-white font-bold">{t.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational status details */}
                  <div className="p-4 bg-white/[0.01] border border-white/[0.04] space-y-2">
                    <div className="flex items-center space-x-2 text-amber-500 font-mono text-[10px] font-semibold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>COEFFICIENT RATINGS OVERVIEW</span>
                    </div>
                    <p className="text-[11px] text-matte-gray-400 font-sans font-light leading-relaxed">
                      This element has been evaluated under dynamic wind load constraints in Munich aerodynamic labs. Current threshold: <span className="text-white font-semibold">{activeDiagnostic.frequency}</span> mapped dynamically at raw frequency tolerances.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lightbox Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex justify-between items-center text-[10px] font-mono text-[#555555]">
                <span>ARRAY HOST SYSTEM ID: {activeDiagnostic.coordinates}</span>
                <span className="text-veloce-coral">ZEXAN MENCY ENGINEERING // GERMANY</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
