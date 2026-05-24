/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { useMouseVelocity } from '../hooks/useMouseVelocity';

export default function LiquidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouse = useMouseVelocity();
  
  // Track continuous target coordinates and local smoothing to prevent layout jumps
  const localMouse = useRef({ x: 0, y: 0, velocity: 0, angle: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let time = 0;

    // Track particles moving down the wind tunnel
    interface FlowParticle {
      x: number;
      y: number;
      speed: number;
      size: number;
      alpha: number;
    }
    const particles: FlowParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1.5 + Math.random() * 2,
      size: 1 + Math.random() * 1.5,
      alpha: 0.1 + Math.random() * 0.4,
    }));

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth * window.devicePixelRatio;
        canvas.height = entryHeight * window.devicePixelRatio;
        canvas.style.width = `${entryWidth}px`;
        canvas.style.height = `${entryHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const draw = () => {
      time += 0.005;
      
      // Clear with dark matte texture
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'; 
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate current cursor variables
      localMouse.current.x += (mouse.x - localMouse.current.x) * 0.08;
      localMouse.current.y += (mouse.y - localMouse.current.y) * 0.08;
      localMouse.current.velocity += (mouse.smoothedVelocity - localMouse.current.velocity) * 0.1;
      localMouse.current.angle += (mouse.angle - localMouse.current.angle) * 0.1;

      const mX = localMouse.current.x;
      const mY = localMouse.current.y;
      const mVel = localMouse.current.velocity;

      // Draw aerodynamic grid guidelines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal streamlined wave-guides
      const numLines = 14;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < numLines; i++) {
        const baseHeight = (height / (numLines + 1)) * (i + 1);
        ctx.beginPath();

        // Calculate flow lines utilizing beautiful sinusoidal waveforms
        const pointsCount = Math.floor(width / 30);
        for (let j = 0; j <= pointsCount; j++) {
          let ptX = (width / pointsCount) * j;
          
          // Original wavy idle wave
          let ptY = baseHeight + Math.sin(j * 0.15 + time * 6) * 15;

          // Compute absolute distance to the cursor to enforce fluid distortions
          const dx = ptX - mX;
          const dy = ptY - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 320) {
            // Strong deflecting force relative to proximity and speed
            const strength = Math.max(0, (320 - dist) / 320);
            
            // Deflect downward or upward depending on orientation, and add velocity ripples
            const push = strength * 90 * (1 + mVel * 2);
            ptY += Math.sin(localMouse.current.angle) * push * (dy < 0 ? -1 : 1) * 0.6;
            ptX += Math.cos(localMouse.current.angle) * push * 0.3;
          }

          if (j === 0) {
            ctx.moveTo(ptX, ptY);
          } else {
            ctx.lineTo(ptX, ptY);
          }
        }

        // Color transition based on cursor speed (fades in beautiful electric-blue details on extreme velocity)
        const activeRedAlpha = Math.min(1, mVel * 0.8);
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(50, 50, 50, 0.04)');
        gradient.addColorStop(0.5, `rgba(${Math.floor(50 - activeRedAlpha * 50)}, ${Math.floor(50 + activeRedAlpha * 190)}, ${Math.floor(50 + activeRedAlpha * 205)}, ${0.08 + activeRedAlpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(50, 50, 50, 0.04)');

        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      // Render slipstream aerodynamic flow grains (particles)
      particles.forEach((p) => {
        // Base drift rate + enhancement proportional to horizontal motion
        const speedMultiplier = 1 + (mVel * 1.5);
        p.x += p.speed * speedMultiplier;
        
        // Wrap edges smoothly
        if (p.x > width) {
          p.x = -10;
          p.y = Math.random() * height;
        }

        // Apply magnetic/vortextual displacement based on cursor coordinate
        const dx = p.x - mX;
        const dy = p.y - mY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let drawY = p.y;
        let drawX = p.x;

        if (dist < 260) {
          const strength = (260 - dist) / 260;
          drawY += Math.sin(localMouse.current.angle) * strength * 60 * (1 + mVel);
          drawX += Math.cos(localMouse.current.angle) * strength * 40;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        
        // Soft white ambient particles, turning into glowing electric blue tails as cursor velocity peaks
        if (mVel > 0.4 && dist < 280) {
          ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha * 1.5})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [mouse]);

  return (
    <div ref={containerRef} id="aerospace-viewport" className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
      <canvas ref={canvasRef} className="block w-full h-full opacity-70" />
    </div>
  );
}
