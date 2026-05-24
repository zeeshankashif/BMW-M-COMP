/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpecCategory, PerformanceOption } from '../types';
import { Flame, Wind, Disc, Eye, ChevronRight, Check } from 'lucide-react';

// Static spec configurator dataset tying back to real-scale metrics for Matte Black BMW M4
const CONFIGURATOR_DATA = {
  engine: {
    title: 'FORGED POWERPLANT',
    subtitle: 'Calibrate mapping parameters and twin-scroll scrolls.',
    icon: Flame,
    image: '/src/assets/images/engine_engine_1779611892969.png',
    options: [
      {
        id: 'eng-oem',
        name: 'FACTORY OEM CALIBRATION',
        description: 'Original Twin-Scroll I6 setup with standard catalytic converters.',
        bhp: 503,
        torque: 650,
        zeroToSixty: 3.8,
        topSpeed: 180,
        weightSaved: 0,
        cost: 'STOCK',
        mechanicalNote: 'Factory limited parameters. 1.3 Bar peak boost gauge.',
      },
      {
        id: 'eng-stage1',
        name: 'STG-1 HIGH RECLAMP ENGINE',
        description: 'Recalibrated ignition schedules, modified exhaust backpressure.',
        bhp: 580,
        torque: 730,
        zeroToSixty: 3.4,
        topSpeed: 193,
        weightSaved: 12,
        cost: '$4,200',
        mechanicalNote: '1.7 Bar peak boost gauges. Exhaust valve active angle +15°.',
      },
      {
        id: 'eng-stage2',
        name: 'STG-2 KEVLAR TWIN SCROLLS',
        description: 'Full custom titanium intake, kevlar wastegates, high-flow decats.',
        bhp: 675,
        torque: 840,
        zeroToSixty: 2.9,
        topSpeed: 207,
        weightSaved: 38,
        cost: '$14,800',
        mechanicalNote: '2.4 Bar peak pressure. Pure mechanical symphony.',
      },
    ],
  },
  aerodynamics: {
    title: 'AERO EXPULSION TUNNELS',
    subtitle: 'Vary downward forces and laminar slip parameters.',
    icon: Wind,
    image: '/src/assets/images/m4_rear_profile_1779611872987.png',
    options: [
      {
        id: 'aero-oem',
        name: 'OEM CARBON TRIMS',
        description: 'Standard spoiler edge and stock dry carbon splitters.',
        bhp: 0,
        torque: 0,
        zeroToSixty: 0,
        topSpeed: 0,
        downforce: 120, // Downforce in kg at 150mph
        weightSaved: 0,
        cost: 'STOCK',
        mechanicalNote: 'Drag Coefficient: 0.32 cD. High-speed balance.',
      },
      {
        id: 'aero-veloce',
        name: 'ZEXAN VENTURI SYSTEM V.2',
        description: 'Asymmetric front lip spoilers, fully enclosed carbon underbody airflow floor.',
        bhp: 0,
        torque: 0,
        zeroToSixty: -0.1, // shaving 0.1s off 0-60 due to traction
        topSpeed: -2, // slight drag drop to top speed
        downforce: 340,
        weightSaved: 22,
        cost: '$8,950',
        mechanicalNote: 'Drag Coefficient: 0.34 cD. Dual venturi downforce suction tunnels.',
      },
      {
        id: 'aero-track',
        name: 'GT3 NÜRBURGRING SPLITTER',
        description: ' Swan-neck carbon wing with manual mechanical pitch adjustments.',
        bhp: 0,
        torque: 0,
        zeroToSixty: -0.2, // traction boost
        topSpeed: -6, // high downforce high drag
        downforce: 510,
        weightSaved: 35,
        cost: '$16,200',
        mechanicalNote: 'Drag Coefficient: 0.37 cD. High aerodynamic authority on curves.',
      },
    ],
  },
  wheels: {
    title: 'LIGHTWEIGHT CHASSIS ROTORS',
    subtitle: 'Alter rotational mass, width profiles, and calliper reactions.',
    icon: Disc,
    image: '/src/assets/images/chassis_wheel_1779611917546.png',
    options: [
      {
        id: 'whl-oem',
        name: 'M DOUBLE-SPOKE 826M',
        description: 'Asymmetrical forged BMW wheels. 19 inch front, 20 inch rear.',
        bhp: 0,
        torque: 0,
        zeroToSixty: 0,
        topSpeed: 0,
        weightSaved: 0,
        cost: 'STOCK',
        mechanicalNote: 'Wheel Mass: 10.8 kg. Standard sticky compound.',
      },
      {
        id: 'whl-cf',
        name: 'CARBON-BARREL FORGED V-4',
        description: 'Aerodynamic carbon fiber barrel with fully forged center face hubs.',
        bhp: 0,
        torque: 0,
        zeroToSixty: -0.1, // lighter rotating mass
        topSpeed: 1,
        weightSaved: 24, // total weight saved across 4 wheels
        cost: '$12,400',
        mechanicalNote: 'Wheel Mass: 7.6 kg. Reduced unsprung weight factor.',
      },
      {
        id: 'whl-mag',
        name: 'CENTERLOCK MONO MAGNESIUM',
        description: 'Superalloy central clamping mechanism. Zero flex tracking profile.',
        bhp: 0,
        torque: 0,
        zeroToSixty: -0.2,
        topSpeed: 3,
        weightSaved: 42,
        cost: '$19,500',
        mechanicalNote: 'Wheel Mass: 6.2 kg. Built for quick pivot transitions.',
      },
    ],
  },
  finish: {
    title: 'SPECULAR GLOSS SHIELD',
    subtitle: 'Tailor light reflection structures and heat absorption layers.',
    icon: Eye,
    image: '/src/assets/images/m4_front_hero_1779611846687.png',
    options: [
      {
        id: 'fin-oem',
        name: 'FROZEN METALLIC GREY',
        description: 'Original metallic satin factory lacquer coat.',
        bhp: 0,
        torque: 0,
        zeroToSixty: 0,
        topSpeed: 0,
        weightSaved: 0,
        cost: 'STOCK',
        mechanicalNote: 'Standard finish layer. Regular detailing required.',
      },
      {
        id: 'fin-matte',
        name: 'ZERO REFLECTION MATTE CHROME',
        description: 'Multi-layer matte silver and titanium oxide metallic paint.',
        bhp: 0,
        torque: 0,
        zeroToSixty: 0,
        topSpeed: 0,
        weightSaved: 0,
        cost: '$3,500',
        mechanicalNote: 'Semi-porous outer texture. Self-healing polymer clearcoat.',
      },
      {
        id: 'fin-stealth',
        name: 'STEALTH ZEXAN OBSIDIAN',
        description: 'Extreme deep matte black paint absorbing 99.2% of ambient reflections.',
        bhp: 0,
        torque: 0,
        zeroToSixty: 0,
        topSpeed: 0,
        weightSaved: 5, // lightweight film wrap
        cost: '$9,200',
        mechanicalNote: 'Obsidian charcoal texture. Exceptional thermal energy dispersion.',
      },
    ],
  },
};

interface PerformanceCustomizerProps {
  onStateChange: (updatedSpecs: {
    engine: PerformanceOption;
    aerodynamics: PerformanceOption;
    wheels: PerformanceOption;
    finish: PerformanceOption;
  }) => void;
}

export default function PerformanceCustomizer({ onStateChange }: PerformanceCustomizerProps) {
  const [activeTab, setActiveTab] = useState<SpecCategory>('engine');
  
  // Track current configuration choices for all 4 categories
  const [currentSpecs, setCurrentSpecs] = useState({
    engine: CONFIGURATOR_DATA.engine.options[0],
    aerodynamics: CONFIGURATOR_DATA.aerodynamics.options[0],
    wheels: CONFIGURATOR_DATA.wheels.options[0],
    finish: CONFIGURATOR_DATA.finish.options[0],
  });

  // Calculate cumulative calculated spec outcome
  const consolidatedMetrics = useMemo(() => {
    const baseBhp = currentSpecs.engine.bhp;
    const baseTorque = currentSpecs.engine.torque;
    const baseDownforce = currentSpecs.aerodynamics.downforce || 120;
    
    // Total weight saved accumulative sum
    const totalWeightSaved = 
      currentSpecs.engine.weightSaved + 
      currentSpecs.aerodynamics.weightSaved + 
      currentSpecs.wheels.weightSaved + 
      currentSpecs.finish.weightSaved;

    // Time reductions
    // Base 0-60 is determined by engine, adjusted by wheel traction and aero downforce traction
    const engineTime = currentSpecs.engine.zeroToSixty;
    const aeroAdjust = currentSpecs.aerodynamics.zeroToSixty || 0;
    const wheelAdjust = currentSpecs.wheels.zeroToSixty || 0;
    const finalZeroToSixty = Math.max(2.4, Number((engineTime + aeroAdjust + wheelAdjust).toFixed(2)));

    // Cumulative Top Speed
    const engineTopSpeed = currentSpecs.engine.topSpeed;
    const aeroAdjustSpeed = currentSpecs.aerodynamics.topSpeed || 0;
    const wheelAdjustSpeed = currentSpecs.wheels.topSpeed || 0;
    const finalTopSpeed = Math.max(160, engineTopSpeed + aeroAdjustSpeed + wheelAdjustSpeed);

    return {
      bhp: baseBhp,
      torque: baseTorque,
      zeroToSixty: finalZeroToSixty,
      topSpeed: finalTopSpeed,
      downforce: baseDownforce,
      weightSaved: totalWeightSaved,
    };
  }, [currentSpecs]);

  // Handle choice update
  const handleOptionSelect = (category: SpecCategory, option: PerformanceOption) => {
    const updated = {
      ...currentSpecs,
      [category]: option,
    };
    setCurrentSpecs(updated);
    onStateChange(updated);
  };

  const activeCategoryData = CONFIGURATOR_DATA[activeTab];

  return (
    <section id="customizer-section" className="relative min-h-screen py-16 px-6 md:px-16 bg-matte-black text-white selection:bg-white selection:text-black">
      {/* Backlighting Ambient Spots */}
      <div className="absolute top-24 left-1/3 w-[300px] h-[300px] bg-veloce-coral/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Track Guidelines */}
      <div className="absolute left-8 top-0 w-[1px] h-full bg-white/[0.03] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 relative">
        <span className="font-mono text-xs text-veloce-coral tracking-[0.2em] font-medium block mb-2">
          // PERFORMANCE METRICS SYSTEM [CTRL_MODULE_2]
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white">
            SPEC-TAILORING RIG
          </h2>
          <p className="max-w-md text-sm text-matte-gray-400 font-sans font-light leading-relaxed">
            Toggle telemetry categories below to rebuild engine curves, chassis balance, core traction, and structural specular finishes. All gauges update instantly.
          </p>
        </div>
      </div>

      {/* Dual Column Workshop Dashboard Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-20">
        
        {/* LEFT COMPILER: Tab Switches and Option Cards (Spans 7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* High-End Tab Switch Grid (Tailwind Custom Layout) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#111111] p-1.5 border border-white/5 grid-pattern">
            {(Object.keys(CONFIGURATOR_DATA) as SpecCategory[]).map((category) => {
              const tabInfo = CONFIGURATOR_DATA[category];
              const Icon = tabInfo.icon;
              const isSelected = activeTab === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative flex flex-col items-center justify-center p-4 py-6 border transition-all duration-300 rounded-none group cursor-pointer ${
                    isSelected 
                    ? 'bg-white border-white text-matte-black' 
                    : 'bg-transparent border-transparent text-matte-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2.5 transition-transform duration-300 ${
                    isSelected ? 'text-veloce-coral scale-110' : 'text-matte-gray-400 group-hover:text-white'
                  }`} />
                  <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                    {category}
                  </span>
                  
                  {/* Miniature bottom dot selector */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeTabUnderdot"
                      className="absolute bottom-2 h-1 w-1 rounded-full bg-veloce-coral" 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Category Header Label */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-veloce-coral tracking-[0.2em] font-bold uppercase">
              SELECTION WINDOW / / {activeTab} BLOCK
            </span>
            <p className="text-xs text-matte-gray-400">
              {activeCategoryData.subtitle}
            </p>
          </div>

          {/* List of Spec Target Cards */}
          <div className="space-y-4">
            {activeCategoryData.options.map((option) => {
              const isChosen = currentSpecs[activeTab].id === option.id;
              
              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(activeTab, option)}
                  className={`relative p-5 border cursor-pointer select-none transition-all duration-300 ${
                    isChosen 
                    ? 'border-veloce-coral bg-veloce-coral/[0.02]' 
                    : 'border-white/[0.06] bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Selection Indicator Pill */}
                  <div className={`absolute top-5 right-5 w-4 h-4 flex items-center justify-center border text-[9px] ${
                    isChosen ? 'border-veloce-coral bg-veloce-coral text-white' : 'border-white/30 text-transparent'
                  }`}>
                    {isChosen && <Check className="w-3 h-3 stroke-[3px]" />}
                  </div>

                  <div className="space-y-2 max-w-[85%]">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-display font-bold text-sm tracking-wide">
                        {option.name}
                      </h4>
                      {isChosen && (
                        <span className="font-mono text-[9px] bg-veloce-coral/20 text-veloce-coral px-1.5 py-0.5 tracking-wider font-semibold">
                          ACTIVE INSTALLED
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-matte-gray-400 leading-relaxed font-sans font-light">
                      {option.description}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] text-matte-gray-400 pt-2">
                      <span className="flex items-center">
                        <span className="text-white font-semibold mr-1">COST:</span> {option.cost}
                      </span>
                      {option.weightSaved > 0 && (
                        <span className="text-green-400">
                          -{option.weightSaved} KG ROTATIONAL REDUCTION
                        </span>
                      )}
                      {option.bhp > 0 && (
                        <span className="text-veloce-coral font-bold">
                          +{option.bhp} BHP OVERLOAD
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-[9px] text-[#888888] italic pt-1 border-t border-white/[0.03] mt-2">
                      Telemetry Node: {option.mechanicalNote}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT PREVIEW & CUMULATIVE SPECS GAUGES PANEL (Spans 5 columns) */}
        <div className="lg:col-span-5 space-y-8 bg-[#111111] p-6 border border-white/5 grid-pattern sticky top-8">
          
          {/* Title block */}
          <div className="border-b border-white/[0.06] pb-4">
            <h3 className="font-mono text-xs text-matte-white-950 font-bold tracking-widest uppercase flex items-center justify-between">
              <span>REAL-TIME TELEMETRY</span>
              <span className="text-veloce-coral px-2 py-0.5 bg-veloce-coral/10 text-[9px] font-bold">CONNECTED</span>
            </h3>
            <p className="text-[11px] text-matte-gray-400 font-sans mt-1">
              Live feedback modeling structural outputs with custom tuning coefficients applied.
            </p>
          </div>

          {/* Active Category Image Visual with dynamic animated key changes */}
          <div className="relative aspect-[16/10] bg-matte-gray-900 border border-white/[0.08] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-white/50 bg-matte-black/70 px-2 py-0.5 border border-white/10 uppercase">
              MODULE FEED: {activeCategoryData.title}
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeCategoryData.image}
                src={activeCategoryData.image}
                alt={activeCategoryData.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
          </div>

          {/* Real-time calculated telemetry dials/bars */}
          <div className="space-y-6">
            
            {/* BHP Gauge Card */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-matte-gray-400 tracking-wide">
                  ENGINE OUTPUT (BHP)
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  {consolidatedMetrics.bhp}{' '}
                  <span className="text-[10px] text-veloce-coral font-mono font-medium">BHP</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(consolidatedMetrics.bhp / 720) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutBezier }}
                  className="h-full bg-gradient-to-r from-veloce-coral to-cyan-400"
                />
              </div>
              <div className="flex justify-between text-[9px] text-[#555555] font-mono">
                <span>OEM BASE (503 BHP)</span>
                <span>MAX TUNED COOPER (720 BHP)</span>
              </div>
            </div>

            {/* Torque Gauge Card */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-matte-gray-400 tracking-wide">
                  TURBO PRESSURE SYSTEM (TORQUE)
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  {consolidatedMetrics.torque}{' '}
                  <span className="text-[10px] text-veloce-coral font-mono font-medium">Nm</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(consolidatedMetrics.torque / 900) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutBezier }}
                  className="h-full bg-white"
                />
              </div>
              <div className="flex justify-between text-[9px] text-[#555555] font-mono">
                <span>OEM BASE (650 Nm)</span>
                <span>STAGE 2 MAX (900 Nm)</span>
              </div>
            </div>

            {/* 0-60 Time Gauge Card */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-matte-gray-400 tracking-wide">
                  0-60 MPH ACCELERATION
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  {consolidatedMetrics.zeroToSixty}{' '}
                  <span className="text-[10px] text-veloce-coral font-mono font-medium">SEC</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] overflow-hidden">
                {/* For acceleration, smaller is better, so invert width calculation */}
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${(4.2 - consolidatedMetrics.zeroToSixty) / (4.2 - 2.4) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutBezier }}
                  className="h-full bg-gradient-to-r from-veloce-coral via-transparent to-white"
                />
              </div>
              <div className="flex justify-between text-[9px] text-[#555555] font-mono">
                <span>OEM BASE (3.8s)</span>
                <span>NÜRBURGRING TARGET (2.4s)</span>
              </div>
            </div>

            {/* Downforce Gauge Card */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-matte-gray-400 tracking-wide">
                  AERODYNAMIC DOWNFORCE (AT 150 MPH)
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  {consolidatedMetrics.downforce}{' '}
                  <span className="text-[10px] text-veloce-coral font-mono font-medium">KG</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(consolidatedMetrics.downforce / 550) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutBezier }}
                  className="h-full bg-veloce-coral/60"
                />
              </div>
              <div className="flex justify-between text-[9px] text-[#555555] font-mono">
                <span>STOCK EDGE (120 KG)</span>
                <span>GT3 SWAN-NECK MAXIMUM (550 KG)</span>
              </div>
            </div>

          </div>

          {/* Calculated Output Footer summary */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#888888]">
            <span className="uppercase text-green-400">
              ⚡ ESTIMATED MASS SAVED:
            </span>
            <span className="text-white font-bold text-sm">
              -{consolidatedMetrics.weightSaved} KG
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

// Cubic bezier array for visual motion sync
const easeOutBezier = [0.16, 1, 0.3, 1];
