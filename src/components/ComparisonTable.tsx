/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComparisonRow } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus, Wrench, ShieldAlert } from 'lucide-react';

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    parameter: 'ENGINE CORE / INDUCTION',
    unit: 'Induction Specs',
    factoryValue: '3.0L twin-turbo I6 (1.3 Bar Press)',
    veloceValue: '3.0L twin scroll forged I6 (2.4 Bar Press)',
    delta: 'Stage II Dual Scroll Turbines',
    deltaStatus: 'positive',
  },
  {
    parameter: 'MAXIMUM ENGINE POWER',
    unit: 'Brake Horsepower',
    factoryValue: '503 BHP @ 6,250 RPM',
    veloceValue: '675 BHP @ 7,150 RPM',
    delta: '+172 BHP over OEM standard',
    deltaStatus: 'positive',
  },
  {
    parameter: 'CRANKSHAFT TORQUE OUTPUT',
    unit: 'Newton-meters',
    factoryValue: '650 Nm @ 2,750 RPM',
    veloceValue: '840 Nm @ 3,100 RPM',
    delta: '+190 Nm torque multiplier',
    deltaStatus: 'positive',
  },
  {
    parameter: '0-62 MPH SPRINT RATE',
    unit: 'Time in seconds',
    factoryValue: '3.8 Seconds',
    veloceValue: '2.9 Seconds',
    delta: '-0.9 Seconds shaved',
    deltaStatus: 'negative', // negative is positive in timesaving terms! Let's format nicely.
  },
  {
    parameter: 'V-MAX TERMINAL TOP SPEED',
    unit: 'Miles per hour',
    factoryValue: '180 MPH (Stock electronically governed)',
    veloceValue: '207 MPH (Full drag balance release)',
    delta: '+27 MPH ceiling unlock',
    deltaStatus: 'positive',
  },
  {
    parameter: 'UNSPRUNG ROTATIONAL COILS',
    unit: 'Total mass in kg',
    factoryValue: '242 kg fully configured wheel layout',
    veloceValue: '200 kg carbon-ceramic track alloy spec',
    delta: '-42 kg mass reduction',
    deltaStatus: 'negative',
  },
  {
    parameter: 'AERODYNAMIC CORNER FORCE',
    unit: 'Downforce weight at 150mph',
    factoryValue: '120 kg front-rear balance',
    veloceValue: '510 kg dual swan-neck ground suck',
    delta: '+390 kg vertical adherence load',
    deltaStatus: 'positive',
  },
  {
    parameter: 'DECELERATION BRAKING RATIO',
    unit: '100-0 MPH Stop span',
    factoryValue: '35.4 Meters (Steel composite rotors)',
    veloceValue: '30.1 Meters (Active titanium ceramic calipers)',
    delta: '-5.3 Meters optimal stopping distance',
    deltaStatus: 'negative',
  },
  {
    parameter: 'VALVE FLOW BACKPRESSURE',
    unit: 'Exhaust gas resistance',
    factoryValue: '1.8 Bar (Multi-chamber catalytic filter)',
    veloceValue: '0.2 Bar (Custom dry titanium decats)',
    delta: '-1.6 Bar friction removal',
    deltaStatus: 'neutral', // using neutral helper
  },
];

export default function ComparisonTable() {
  return (
    <section id="comparison-specs" className="relative py-20 px-6 md:px-16 bg-matte-black text-white border-t border-white/[0.04] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-veloce-coral tracking-[0.2em] font-medium block mb-2">
              // LABORATORY AUDIT REPORT [RUN_SHEET_V2]
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic transform -skew-x-6">
              GAP <span className="text-outline">ANALYSIS.</span>
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-matte-gray-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>DIAGNOSTICS ENFORCED // GERMAN COMPLIANCE COMPATIBLE</span>
          </div>
        </div>

        {/* Audit Sheet Table */}
        <div className="overflow-x-auto border border-white/5 bg-[#111111] grid-pattern">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] text-matte-gray-400 uppercase tracking-widest">
                <th className="py-4 px-6 font-bold flex items-center space-x-2">
                  <Wrench className="w-3.5 h-3.5 text-veloce-coral" />
                  <span>MECHANICAL COMPONENT / PARAMETER</span>
                </th>
                <th className="py-4 px-6 font-bold">M4 BASE FACTORY SPECIFICATION</th>
                <th className="py-4 px-6 font-bold text-white">ZEXAN MENCY CALIBRATION SPEC</th>
                <th className="py-4 px-6 font-bold text-right">MAPPED GAP VARIANCE</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.04]">
              {COMPARISON_ROWS.map((row, index) => {
                // Formatting helper for the variation status column
                const isPositive = row.deltaStatus === 'positive';
                const isNegative = row.deltaStatus === 'negative';
                
                return (
                  <tr 
                    key={index} 
                    className="group transition-colors duration-200 hover:bg-white/[0.02]"
                  >
                    {/* Component Title */}
                    <td className="py-5 px-6 font-display font-bold text-xs tracking-wider pr-4">
                      <span className="text-[#646464] group-hover:text-veloce-coral transition-colors mr-2">
                        0{index + 1} //
                      </span>
                      {row.parameter}
                      <span className="block font-mono text-[9px] text-[#555555] mt-0.5 uppercase tracking-wide">
                        Unit of telemetry: {row.unit}
                      </span>
                    </td>

                    {/* OEM Base spec */}
                    <td className="py-5 px-6 text-xs font-sans text-matte-gray-400">
                      {row.factoryValue}
                    </td>

                    {/* Veloce Specs with highlights */}
                    <td className="py-5 px-6 text-xs text-white font-semibold">
                      <span className="inline-flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-veloce-coral animate-pulse" />
                        <span>{row.veloceValue}</span>
                      </span>
                    </td>

                    {/* Variance Badge */}
                    <td className="py-5 px-6 text-right text-xs font-mono">
                      <div className="inline-flex items-center space-x-2 text-right">
                        {isPositive ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            {row.delta}
                          </span>
                        ) : isNegative ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-veloce-coral/10 text-veloce-coral text-[10px] font-bold border border-veloce-coral/20">
                            <ArrowDownRight className="w-3 h-3 mr-0.5" />
                            {row.delta}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 bg-white/5 text-matte-gray-400 text-[10px] font-bold border border-white/10">
                            <Minus className="w-3 h-3 mr-0.5" />
                            {row.delta}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

        {/* Gap Audit Footer Warning Indicator */}
        <div className="mt-8 p-5 bg-white/[0.01] border border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-[#888888] font-sans">
            <ShieldAlert className="w-5 h-5 text-veloce-coral shrink-0" />
            <p className="leading-relaxed font-light">
              <span className="text-white font-bold">WARRANTY EXCLUSION NOTE:</span> Standard BMW OEM mechanical warranty coverage blocks might undergo localized suspension voids on ECU Stage II mapping. Owners assume absolute torque control values.
            </p>
          </div>
          <button className="text-xs font-mono font-bold tracking-widest uppercase py-2 px-4 border border-white/20 hover:border-white/50 text-white hover:bg-white text-matte-black transition-all cursor-pointer whitespace-nowrap">
            DOWNLOAD COMPLIANCE CERTIFICATE PDF
          </button>
        </div>

      </div>
    </section>
  );
}
