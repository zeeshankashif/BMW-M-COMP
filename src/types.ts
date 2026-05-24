/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpecCategory = 'engine' | 'aerodynamics' | 'wheels' | 'finish';

export interface PerformanceOption {
  id: string;
  name: string;
  description: string;
  // Performance indicators relative to OEM standard
  bhp: number;
  torque: number; // in Nm
  zeroToSixty: number; // in seconds
  topSpeed: number; // in mph
  downforce?: number; // in kg
  weightSaved?: number; // in kg
  // Stylized metadata
  cost: string;
  mechanicalNote: string;
}

export interface SpecData {
  category: SpecCategory;
  title: string;
  subtitle: string;
  options: PerformanceOption[];
}

export interface TelemetryGridItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  telemetry: {
    label: string;
    value: string;
  }[];
  coordinates: string;
  frequency: string;
}

export interface ComparisonRow {
  parameter: string;
  unit: string;
  factoryValue: string;
  veloceValue: string;
  delta: string;
  deltaStatus: 'positive' | 'negative' | 'neutral';
}
