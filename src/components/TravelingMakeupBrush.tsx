import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface Waypoint {
  progress: number; // 0.0 to 1.0 spanning strictly from Explosive Pigments & Kit to Bridal Runway
  xPercent: number;
  yPercent: number;
  rotation: number;
  scale: number;
  opacity: number;
  isPuffing?: boolean;
}

export const TravelingMakeupBrush: React.FC = () => {
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const brushContainerRef = useRef<HTMLDivElement | null>(null);

  // Smooth interpolated position state
  const [journeyProgress, setJourneyProgress] = useState(-1); // -1 = outside/hidden
  const [brushState, setBrushState] = useState({
    x: -20,
    y: 50,
    rotation: -25,
    scale: 1,
    opacity: 0,
    isVisible: false,
  });

  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const velocityRef = useRef(0);
  const isMovingRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Waypoints: Strictly designed for:
  // START: Explosive Pigments & Kit (#bridal-makeup)
  // JOURNEY: Fluid calligraphy S-curves dusting the pigments, compacts, and runway stage
  // END: Bridal Runway (#runway) grand flourish exit
  const waypoints: Waypoint[] = useMemo(
    () => [
      // 0.00: Hidden off-screen just as Explosive Pigments & Kit enters viewport
      { progress: 0.00, xPercent: -12, yPercent: 42, rotation: -32, scale: 0.9, opacity: 0 },
      // 0.06: Glides gracefully into the Explosive Pigments header with initial bristle tilt
      { progress: 0.06, xPercent: 16, yPercent: 36, rotation: -24, scale: 1.05, opacity: 0.9, isPuffing: true },
      // 0.16: Dips into the central mineral pigment explosion (artisan powder puff)
      { progress: 0.16, xPercent: 34, yPercent: 48, rotation: -12, scale: 1.15, opacity: 1, isPuffing: true },
      // 0.26: Sweeps across the high-impact lip gloss & eye foil compacts
      { progress: 0.26, xPercent: 72, yPercent: 38, rotation: 18, scale: 1.18, opacity: 1, isPuffing: true },
      // 0.36: Gentle downward swoop across the moisture-matte lipstick bullet
      { progress: 0.36, xPercent: 54, yPercent: 62, rotation: -6, scale: 1.12, opacity: 1, isPuffing: true },
      // 0.46: Calligraphic S-curve glide transitioning into The Bridal Runway stage
      { progress: 0.46, xPercent: 24, yPercent: 52, rotation: -22, scale: 1.08, opacity: 1 },
      // 0.58: Sweeps onto the Bridal Runway spotlight bride
      { progress: 0.58, xPercent: 44, yPercent: 40, rotation: 10, scale: 1.16, opacity: 1, isPuffing: true },
      // 0.70: Glides across the 4K banquet lighting and temple eye details
      { progress: 0.70, xPercent: 74, yPercent: 48, rotation: 24, scale: 1.2, opacity: 1, isPuffing: true },
      // 0.82: Elegant swirl across veil & jewelry anchoring features
      { progress: 0.82, xPercent: 38, yPercent: 56, rotation: -16, scale: 1.1, opacity: 1, isPuffing: true },
      // 0.90: Prepares for grand finale flourish, tilting gracefully upward
      { progress: 0.90, xPercent: 64, yPercent: 35, rotation: 16, scale: 1.05, opacity: 0.95 },
      // 0.96: Spectacular upward arc leaving final stardust trail
      { progress: 0.96, xPercent: 88, yPercent: 24, rotation: 32, scale: 0.98, opacity: 0.75 },
      // 1.00: Completes runway finale and vanishes before packages/footer
      { progress: 1.00, xPercent: 110, yPercent: 15, rotation: 44, scale: 0.85, opacity: 0 },
    ],
    []
  );

  // Calculate current brush position from normalized progress [0, 1]
  const interpolatePosition = useCallback(
    (progress: number) => {
      if (progress < 0 || progress > 1) {
        return {
          x: progress < 0 ? waypoints[0].xPercent : waypoints[waypoints.length - 1].xPercent,
          y: progress < 0 ? waypoints[0].yPercent : waypoints[waypoints.length - 1].yPercent,
          rotation: progress < 0 ? waypoints[0].rotation : waypoints[waypoints.length - 1].rotation,
          scale: 1,
          opacity: 0,
          isVisible: false,
        };
      }

      // Find waypoint bracket
      let i = 0;
      while (i < waypoints.length - 1 && waypoints[i + 1].progress <= progress) {
        i++;
      }

      if (i >= waypoints.length - 1) {
        const last = waypoints[waypoints.length - 1];
        return {
          x: last.xPercent,
          y: last.yPercent,
          rotation: last.rotation,
          scale: last.scale,
          opacity: 0,
          isVisible: false,
        };
      }

      const wp0 = waypoints[i];
      const wp1 = waypoints[i + 1];
      const range = wp1.progress - wp0.progress;
      const rawT = range > 0 ? (progress - wp0.progress) / range : 0;
      const t = Math.max(0, Math.min(1, rawT));

      // Luxurious smooth cubic Hermite / ease-in-out curve
      const easeT = t * t * (3 - 2 * t);

      const x = wp0.xPercent + (wp1.xPercent - wp0.xPercent) * easeT;
      const y = wp0.yPercent + (wp1.yPercent - wp0.yPercent) * easeT;
      const rotation = wp0.rotation + (wp1.rotation - wp0.rotation) * easeT;
      const scale = wp0.scale + (wp1.scale - wp0.scale) * easeT;
      const opacity = wp0.opacity + (wp1.opacity - wp0.opacity) * easeT;

      return {
        x,
        y,
        rotation,
        scale,
        opacity,
        isVisible: opacity > 0.02,
      };
    },
    [waypoints]
  );

  // Precise Section Tracking: Explosive Pigments & Kit (#bridal-makeup) -> Bridal Runway (#runway)
  useEffect(() => {
    let animFrame: number;
    let targetProgress = -1;
    let currentFilteredProgress = -1;

    const updateBoundsAndScroll = () => {
      const startEl = document.getElementById('bridal-makeup');
      const endEl = document.getElementById('runway');

      if (!startEl || !endEl) {
        return;
      }

      const windowH = window.innerHeight;
      const scrollY = window.scrollY;

      // Start position: when top of Explosive Pigments & Kit enters lower third of screen
      const startRect = startEl.getBoundingClientRect();
      const startAbsoluteTop = scrollY + startRect.top;
      const startTrigger = startAbsoluteTop - windowH * 0.45;

      // End position: when bottom of Bridal Runway exits past upper third of screen
      const endRect = endEl.getBoundingClientRect();
      const endAbsoluteBottom = scrollY + endRect.bottom;
      const endTrigger = endAbsoluteBottom - windowH * 0.25;

      const journeyDistance = endTrigger - startTrigger;

      if (journeyDistance <= 0) return;

      if (scrollY < startTrigger) {
        // Above Explosive Pigments (e.g. Hero section) -> Brush is completely off/hidden
        targetProgress = -0.05;
      } else if (scrollY > endTrigger) {
        // Below Bridal Runway (e.g. Packages, About, Contact) -> Brush has exited
        targetProgress = 1.05;
      } else {
        // Actively within the journey from Explosive Pigments to Bridal Runway
        targetProgress = (scrollY - startTrigger) / journeyDistance;
        targetProgress = Math.max(0, Math.min(1, targetProgress));
      }

      // Track scroll velocity for kinetic rotation & powder physics
      const now = Date.now();
      const dt = Math.max(16, now - lastScrollTime.current);
      const dy = Math.abs(scrollY - lastScrollY.current);
      const instantVelocity = dy / dt;

      velocityRef.current = velocityRef.current * 0.8 + instantVelocity * 0.2;
      setScrollVelocity(velocityRef.current);

      if (instantVelocity > 0.02) {
        isMovingRef.current = true;
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          isMovingRef.current = false;
        }, 120);
      }

      lastScrollY.current = scrollY;
      lastScrollTime.current = now;
    };

    // Smooth animation loop with spring-like progressive smoothing (butter-smooth 60/120fps)
    const animate = () => {
      if (currentFilteredProgress === -1 && targetProgress !== -1) {
        currentFilteredProgress = targetProgress;
      } else {
        // High-fidelity progressive ease towards target
        currentFilteredProgress += (targetProgress - currentFilteredProgress) * 0.12;
      }

      if (Math.abs(currentFilteredProgress - targetProgress) > 0.0001 || Math.abs(velocityRef.current) > 0.01) {
        setJourneyProgress(currentFilteredProgress);
        const nextPos = interpolatePosition(currentFilteredProgress);
        setBrushState(nextPos);
      }

      animFrame = requestAnimationFrame(animate);
    };

    updateBoundsAndScroll();
    window.addEventListener('scroll', updateBoundsAndScroll, { passive: true });
    window.addEventListener('resize', updateBoundsAndScroll, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', updateBoundsAndScroll);
      window.removeEventListener('resize', updateBoundsAndScroll);
      cancelAnimationFrame(animFrame);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [interpolatePosition]);

  // Canvas Powder & Stardust Trail Emission
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

    interface Stardust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      decay: number;
      sparkle: boolean;
    }

    const stardustArray: Stardust[] = [];

    // Luxury palette: Royal gold, bridal rose, champagne shimmer, violet bristle hue
    const palette = [
      'rgba(197, 160, 89, ',  // Champagne gold
      'rgba(218, 165, 32, ',  // Royal golden amber
      'rgba(235, 120, 165, ', // Bridal rose blush
      'rgba(178, 102, 255, ', // Velvet violet bristle glow
      'rgba(255, 235, 200, ', // Ivory pearl glimmer
    ];

    let lastTipX = 0;
    let lastTipY = 0;

    const renderTrail = () => {
      ctx.clearRect(0, 0, width, height);

      // Only emit when brush is visible on screen and within active journey
      if (brushState.isVisible && brushState.opacity > 0.15) {
        // Calculate the physical bristle tip in viewport coordinates
        // Bristles are located at the upper end of the tilted brush
        const rad = ((brushState.rotation - 90) * Math.PI) / 180;
        const brushLength = 80 * brushState.scale;
        const centerX = (brushState.x / 100) * width;
        const centerY = (brushState.y / 100) * height;

        const tipX = centerX + Math.cos(rad) * brushLength * 0.45;
        const tipY = centerY + Math.sin(rad) * brushLength * 0.45;

        // Calculate motion delta
        const dx = tipX - lastTipX;
        const dy = tipY - lastTipY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Emit dynamic stardust when moving or during scroll
        if (speed > 1.2 || scrollVelocity > 0.05) {
          const spawnCount = Math.min(6, Math.max(1, Math.floor(speed * 0.35 + scrollVelocity * 3)));
          for (let k = 0; k < spawnCount; k++) {
            const baseColor = palette[Math.floor(Math.random() * palette.length)];
            const angleSpread = (Math.random() - 0.5) * Math.PI * 0.6;
            const particleSpeed = Math.random() * 2.2 + 0.4;

            stardustArray.push({
              x: tipX + (Math.random() - 0.5) * 18,
              y: tipY + (Math.random() - 0.5) * 18,
              vx: Math.cos(rad + Math.PI + angleSpread) * particleSpeed + (Math.random() - 0.5),
              vy: Math.sin(rad + Math.PI + angleSpread) * particleSpeed + Math.random() * 0.8 + 0.2,
              size: Math.random() * 3.2 + 1.2,
              alpha: 0.85,
              color: baseColor,
              life: 1.0,
              decay: Math.random() * 0.025 + 0.015,
              sparkle: Math.random() > 0.4,
            });
          }
        }

        lastTipX = tipX;
        lastTipY = tipY;
      }

      // Update and draw existing stardust particles
      for (let i = stardustArray.length - 1; i >= 0; i--) {
        const p = stardustArray[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // Air resistance
        p.vy += 0.02; // Gentle gravity
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life * 0.85);

        if (p.life <= 0) {
          stardustArray.splice(i, 1);
          continue;
        }

        // Draw glowing particle
        const radius = p.sparkle ? p.size * (0.8 + Math.sin(Date.now() * 0.01 + i) * 0.3) : p.size;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.2);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(0.6, `${p.color}${p.alpha * 0.4})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderTrail);
    };

    animId = requestAnimationFrame(renderTrail);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [brushState, scrollVelocity]);

  // Gentle breathing idle float offset when paused
  const [idleFloat, setIdleFloat] = useState(0);
  useEffect(() => {
    let anim: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setIdleFloat(Math.sin(t) * 4);
      anim = requestAnimationFrame(loop);
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);

  // Determine visibility strictly: hidden when not in Explosive Pigments & Kit or Bridal Runway
  const isVisible = brushState.isVisible && brushState.opacity > 0.01;

  // Responsive scaling check for mobile screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveScale = (isMobile ? 0.78 : 1.05) * brushState.scale;

  // Calculate dynamic rotation with motion tilt
  const dynamicTilt = brushState.rotation + (scrollVelocity > 0.1 ? (brushState.rotation > 0 ? 4 : -4) : 0);

  return (
    <>
      {/* 1. Hardware-Accelerated Cosmetic Dust Canvas Trail */}
      <canvas
        ref={trailCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-35 h-full w-full"
      />

      {/* 2. Haute Couture Physical Traveling Makeup Brush */}
      <div
        ref={brushContainerRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-40 select-none will-change-transform"
        style={{
          left: `${brushState.x}%`,
          top: `calc(${brushState.y}% + ${idleFloat}px)`,
          opacity: brushState.opacity,
          visibility: isVisible ? 'visible' : 'hidden',
          display: isVisible ? 'block' : 'none',
          transform: `translate(-50%, -50%) rotate(${dynamicTilt}deg) scale(${responsiveScale})`,
          transition: 'opacity 0.25s ease-out',
          filter: `drop-shadow(0 ${16 + scrollVelocity * 8}px ${28 + scrollVelocity * 10}px rgba(15, 27, 43, 0.38))`,
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Bristle Tip Soft Violet & Champagne Aura Glow */}
          <div
            className={`absolute -top-6 h-32 w-32 rounded-full transition-all duration-300 pointer-events-none ${
              scrollVelocity > 0.1 ? 'opacity-90 scale-125' : 'opacity-50 scale-100'
            }`}
            style={{
              background:
                'radial-gradient(circle, rgba(178, 102, 255, 0.45) 0%, rgba(197, 160, 89, 0.35) 45%, rgba(235, 120, 165, 0.2) 65%, transparent 80%)',
              filter: 'blur(14px)',
            }}
          />

          {/* User's Exact Velvet Violet & Ebony Haute Couture Makeup Brush */}
          <img
            src="/assets/aistudio/cd446313-0ba0-48d5-ba47-c51f23716d7f-removebg-preview_73f42769.png"
            alt="Haute Couture Physical Makeup Brush"
            className="w-24 md:w-32 lg:w-36 h-auto max-h-[340px] object-contain select-none pointer-events-none drop-shadow-[0_18px_32px_rgba(15,27,43,0.35)] filter contrast-[1.08] brightness-[1.02]"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};
