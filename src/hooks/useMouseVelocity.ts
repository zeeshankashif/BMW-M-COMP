/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface MouseState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  velocity: number;
  smoothedVelocity: number;
  angle: number;
}

export function useMouseVelocity() {
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    velocity: 0,
    smoothedVelocity: 0,
    angle: 0,
  });

  const lastCoords = useRef({ x: 0, y: 0, t: Date.now() });
  const smoothedVel = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const targetMouse = useRef({ x: 0, y: 0, updated: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: e.clientX,
        y: e.clientY,
        updated: true,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateLoop = () => {
      const now = Date.now();
      const dt = Math.max(1, now - lastCoords.current.t); // Avoid division by zero
      
      const currX = targetMouse.current.x;
      const currY = targetMouse.current.y;
      
      const dx = currX - lastCoords.current.x;
      const dy = currY - lastCoords.current.y;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Instantaneous velocity (pixels per millisecond)
      const instantVelocity = distance / dt;
      
      // Dynamic easing: damp extreme spikes
      smoothedVel.current += (instantVelocity - smoothedVel.current) * 0.08;
      
      const angle = Math.atan2(dy, dx);

      setMouse({
        x: currX,
        y: currY,
        dx,
        dy,
        velocity: instantVelocity,
        smoothedVelocity: smoothedVel.current,
        angle,
      });

      lastCoords.current = { x: currX, y: currY, t: now };
      animationFrameId.current = requestAnimationFrame(updateLoop);
    };

    animationFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return mouse;
}
