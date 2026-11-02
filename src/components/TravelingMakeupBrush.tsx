import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface Waypoint {
  progress: number;
  xPercent: number;
  yPercent: number;
  rotation: number;
  scale: number;
  opacity: number;
  powderPuff: boolean;
}

export const TravelingMakeupBrush: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Keyframe waypoints: starts from Page 2 (Bridal Looks), NOT in the Hero section
  const waypoints: Waypoint[] = useMemo(
    () => [
      // Hero Section (Page 1) - Brush is completely hidden / not started
      { progress: 0.0, xPercent: -15, yPercent: 45, rotation: -35, scale: 0.95, opacity: 0, powderPuff: false },
      { progress: 0.13, xPercent: -10, yPercent: 45, rotation: -35, scale: 0.95, opacity: 0, powderPuff: false },
      
      // Page 2 (Bridal Looks / Aesthetics) - Brush enters from the side and sweeps across
      { progress: 0.17, xPercent: 20, yPercent: 50, rotation: -18, scale: 1.1, opacity: 1, powderPuff: true },
      { progress: 0.25, xPercent: 74, yPercent: 42, rotation: 22, scale: 1.15, opacity: 1, powderPuff: true },
      
      // Page 3 (Transformations) - Continues through transformation wipe
      { progress: 0.33, xPercent: 24, yPercent: 54, rotation: -26, scale: 1.15, opacity: 1, powderPuff: true },
      { progress: 0.40, xPercent: 70, yPercent: 46, rotation: 18, scale: 1.05, opacity: 0.9, powderPuff: true },
      
      // Graceful exit at the completion of the 2-page journey
      { progress: 0.46, xPercent: 112, yPercent: 36, rotation: 42, scale: 0.9, opacity: 0, powderPuff: false },
      
      // Remains completely hidden for remaining sections (Atelier, Portfolio, About, Contact)
      { progress: 1.0, xPercent: 120, yPercent: 36, rotation: 42, scale: 0.8, opacity: 0, powderPuff: false },
    ],
    []
  );

  const [currentPos, setCurrentPos] = useState({
    x: -15,
    y: 45,
    rotation: -35,
    scale: 0.95,
    opacity: 0,
    isPuffing: false,
  });

  // Track scroll velocity for realistic physical motion blur & powder release
  useEffect(() => {
    let animId: number;
    const checkVelocity = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();
      const dt = Math.max(16, now - lastTime.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const velocity = dy / dt;

      setScrollVelocity((prev) => prev * 0.8 + velocity * 0.2);

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
      animId = requestAnimationFrame(checkVelocity);
    };

    animId = requestAnimationFrame(checkVelocity);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Subscribe to smooth scroll progress to interpolate position
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (p: number) => {
      // Find bounding waypoints
      let i = 0;
      while (i < waypoints.length - 1 && waypoints[i + 1].progress <= p) {
        i++;
      }
      if (i >= waypoints.length - 1) {
        const last = waypoints[waypoints.length - 1];
        setCurrentPos({
          x: last.xPercent,
          y: last.yPercent,
          rotation: last.rotation,
          scale: last.scale,
          opacity: last.opacity,
          isPuffing: false,
        });
        return;
      }

      const p0 = waypoints[i];
      const p1 = waypoints[i + 1];
      const t = Math.max(0, Math.min(1, (p - p0.progress) / (p1.progress - p0.progress)));

      // Smooth cubic easing between waypoints
      const easeT = t * t * (3 - 2 * t);

      const x = p0.xPercent + (p1.xPercent - p0.xPercent) * easeT;
      const y = p0.yPercent + (p1.yPercent - p0.yPercent) * easeT;
      const rotation = p0.rotation + (p1.rotation - p0.rotation) * easeT;
      const scale = p0.scale + (p1.scale - p0.scale) * easeT;
      const opacity = p0.opacity + (p1.opacity - p0.opacity) * easeT;

      setCurrentPos({
        x,
        y,
        rotation,
        scale,
        opacity,
        isPuffing: t > 0.1 && t < 0.9,
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, waypoints]);

  // Trail canvas for real-time cosmetic dust trail emitted from brush tip
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface TrailDust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
    }

    const trailParticles: TrailDust[] = [];

    const trailColors = [
      'rgba(240, 215, 160, ', // Gold shimmer
      'rgba(245, 230, 220, ', // Champagne ivory
      'rgba(230, 190, 185, ', // Rose blush
    ];

    const renderTrail = () => {
      ctx.clearRect(0, 0, width, height);

      // Emit particles if moving
      if (scrollVelocity > 0.05 && currentPos.opacity > 0.1) {
        const tipX = (currentPos.x / 100) * width;
        const tipY = (currentPos.y / 100) * height;

        // Emit 2-4 micro-dust particles from bristle tip
        const emitCount = Math.min(5, Math.ceil(scrollVelocity * 4));
        for (let k = 0; k < emitCount; k++) {
          const colorBase = trailColors[Math.floor(Math.random() * trailColors.length)];
          trailParticles.push({
            x: tipX + (Math.random() - 0.5) * 16,
            y: tipY + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 1.2 + 0.2,
            size: Math.random() * 3 + 1,
            alpha: 0.75,
            color: colorBase,
            life: 1.0,
          });
        }
      }

      // Update and render trail
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.alpha = Math.max(0, p.life * 0.7);

        if (p.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderTrail);
    };

    animId = requestAnimationFrame(renderTrail);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [scrollVelocity, currentPos]);

  return (
    <>
      {/* Canvas for cosmetic dust trail */}
      <canvas
        ref={trailCanvasRef}
        className="pointer-events-none fixed inset-0 z-35 h-full w-full"
      />

      {/* Realistic 3D Physical Makeup Brush */}
      <div
        className="pointer-events-none fixed z-40 transition-opacity duration-300"
        style={{
          left: `${currentPos.x}%`,
          top: `${currentPos.y}%`,
          opacity: currentPos.opacity,
          display: currentPos.opacity <= 0.01 ? 'none' : 'block',
          transform: `translate(-50%, -50%) rotate(${currentPos.rotation}deg) scale(${currentPos.scale})`,
          filter: `drop-shadow(0 ${15 + scrollVelocity * 8}px ${25 + scrollVelocity * 10}px rgba(0, 0, 0, 0.65))`,
          willChange: 'transform, left, top',
        }}
      >
        <div className="relative flex flex-col items-center select-none">
          {/* Bristle Tip Soft Powder Aura / Glow */}
          <div
            className={`absolute -top-6 h-24 w-24 rounded-full transition-all duration-300 pointer-events-none ${
              scrollVelocity > 0.1 ? 'opacity-80 scale-125' : 'opacity-35 scale-100'
            }`}
            style={{
              background:
                'radial-gradient(circle, rgba(223, 190, 133, 0.45) 0%, rgba(212, 175, 55, 0.15) 45%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Master Physical Brush SVG Graphic */}
          <svg
            width="130"
            height="340"
            viewBox="0 0 130 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 md:w-28 lg:w-32 h-auto"
          >
            <defs>
              {/* Natural Goat/Silk Bristle Gradient */}
              <linearGradient id="bristleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff8f0" />
                <stop offset="18%" stopColor="#f3deb8" />
                <stop offset="55%" stopColor="#b48956" />
                <stop offset="85%" stopColor="#2b1f1a" />
                <stop offset="100%" stopColor="#140e0b" />
              </linearGradient>

              {/* Shimmer on bristle tip */}
              <linearGradient id="bristleHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="35%" stopColor="rgba(255,248,235,0.7)" />
                <stop offset="65%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
              </linearGradient>

              {/* Champagne Gold Brushed Metal Ferrule */}
              <linearGradient id="goldFerrule" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#876523" />
                <stop offset="18%" stopColor="#d4af37" />
                <stop offset="38%" stopColor="#fff4d4" />
                <stop offset="52%" stopColor="#dfbe85" />
                <stop offset="78%" stopColor="#a37b2c" />
                <stop offset="92%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#5e4514" />
              </linearGradient>

              {/* Ebony Sculpted Wood Handle */}
              <linearGradient id="ebonyHandle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#080706" />
                <stop offset="25%" stopColor="#221e1a" />
                <stop offset="45%" stopColor="#3d3731" />
                <stop offset="60%" stopColor="#1f1b18" />
                <stop offset="90%" stopColor="#0d0b09" />
                <stop offset="100%" stopColor="#050403" />
              </linearGradient>

              {/* Gold brand stamping text clip */}
              <linearGradient id="goldStamp" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffe7a3" />
                <stop offset="100%" stopColor="#c5a059" />
              </linearGradient>

              {/* Metal Crimp Line Gradient */}
              <linearGradient id="crimpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4d3a14" />
                <stop offset="50%" stopColor="#fff8e7" />
                <stop offset="100%" stopColor="#3b2b0d" />
              </linearGradient>
            </defs>

            {/* 1. Bristle Dome (Hand-crafted tapered powder brush head) */}
            <g id="bristle-head">
              {/* Outer soft dome silhouette */}
              <path
                d="M65 8 C38 8 22 45 20 105 C20 120 22 135 24 145 L106 145 C108 135 110 120 110 105 C108 45 92 8 65 8 Z"
                fill="url(#bristleGrad)"
              />

              {/* Bristle sheen overlay */}
              <path
                d="M65 8 C38 8 22 45 20 105 C20 120 22 135 24 145 L106 145 C108 135 110 120 110 105 C108 45 92 8 65 8 Z"
                fill="url(#bristleHighlight)"
                style={{ mixBlendMode: 'overlay' }}
              />

              {/* Natural fine hair texture lines */}
              <path d="M65 9 Q63 70 62 144" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.45" />
              <path d="M52 14 Q51 75 48 144" stroke="#fce6c5" strokeWidth="0.6" strokeOpacity="0.4" />
              <path d="M78 14 Q77 75 79 144" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.35" />
              <path d="M40 25 Q37 85 36 144" stroke="#e8c89b" strokeWidth="0.5" strokeOpacity="0.3" />
              <path d="M90 25 Q92 85 93 144" stroke="#f7deb6" strokeWidth="0.5" strokeOpacity="0.3" />
              <path d="M30 45 Q26 95 28 144" stroke="#2a1e17" strokeWidth="0.6" strokeOpacity="0.6" />
              <path d="M100 45 Q104 95 102 144" stroke="#1f1510" strokeWidth="0.6" strokeOpacity="0.6" />

              {/* Cosmetic powder dust clinging to tips */}
              <ellipse cx="65" cy="22" rx="22" ry="12" fill="#dfbe85" fillOpacity="0.35" filter="blur(4px)" />
              <circle cx="56" cy="18" r="1.8" fill="#fff9ed" fillOpacity="0.8" />
              <circle cx="72" cy="24" r="1.5" fill="#f5ebe1" fillOpacity="0.75" />
              <circle cx="64" cy="30" r="1.2" fill="#d4af37" fillOpacity="0.9" />
            </g>

            {/* 2. Gold Brass Ferrule (Polished cylinder with crimp indentations) */}
            <g id="ferrule">
              <path
                d="M23 144 C23 144 26 148 65 148 C104 148 107 144 107 144 L104 208 C104 211 100 213 65 213 C30 213 26 211 26 208 Z"
                fill="url(#goldFerrule)"
              />

              {/* Crimp ring detail 1 */}
              <path
                d="M24 162 C35 165 95 165 106 162"
                stroke="url(#crimpGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Crimp ring detail 2 */}
              <path
                d="M25 186 C36 189 94 189 105 186"
                stroke="url(#crimpGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Metallic specular reflection streak */}
              <rect
                x="56"
                y="144"
                width="8"
                height="65"
                fill="#ffffff"
                fillOpacity="0.65"
                filter="blur(1px)"
              />
            </g>

            {/* 3. Ergonomic Ebony Wooden Handle */}
            <g id="handle">
              <path
                d="M26 207 C26 207 35 210 65 210 C95 210 104 207 104 207 L94 322 C93 328 88 334 65 334 C42 334 37 328 36 322 Z"
                fill="url(#ebonyHandle)"
              />

              {/* Subtle handle highlight beam */}
              <path
                d="M60 210 L58 330"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeOpacity="0.12"
                filter="blur(1.5px)"
              />

              {/* Luxury Gold Branding Stamped on Handle */}
              <text
                x="65"
                y="272"
                textAnchor="middle"
                fill="url(#goldStamp)"
                fontSize="6"
                fontFamily="Cormorant Garamond, serif"
                fontWeight="600"
                letterSpacing="2.5"
                transform="rotate(90, 65, 272)"
                opacity="0.9"
              >
                ÉLÉGANCE · 04
              </text>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};
