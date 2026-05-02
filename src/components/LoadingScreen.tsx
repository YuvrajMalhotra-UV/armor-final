"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LETTERS = "ARMORIQ".split("");

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

const PARTICLES: ReadonlyArray<Particle> = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 5,
}));

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const sonarRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [visibleLetters, setVisibleLetters] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Corner brackets in
      tl.from(".loader-corner", {
        opacity: 0,
        scale: 0.4,
        x: (i) => (i % 2 === 0 ? -40 : 40),
        y: (i) => (i < 2 ? -40 : 40),
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      });

      // PHASE 1: Logo spins in (0 → 1.2s)
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.4, rotation: 0 },
        { opacity: 1, scale: 1.2, rotation: 360, duration: 1.2, ease: "power2.out" },
        0
      );

      // Sonar ping
      tl.fromTo(
        sonarRef.current,
        { scale: 0.4, opacity: 0.7 },
        { scale: 3.2, opacity: 0, duration: 1.2, ease: "power2.out", repeat: 1 },
        0.1
      );

      // PHASE 2: Logo slides left & shrinks (1.2 → 2s)
      tl.to(
        logoRef.current,
        {
          x: 0,
          y: 0,
          scale: isMobile ? 0.5 : 0.55,
          rotation: 360,
          duration: 0.8,
          ease: "power3.inOut",
        },
        1.2
      );

      // PHASE 3: Text reveal letter by letter (2 → 3.05s)
      LETTERS.forEach((_, i) => {
        tl.call(() => setVisibleLetters(i + 1), [], 2 + i * 0.15);
      });

      // PHASE 4: Hide cursor + tagline in (3.2 → 3.7s)
      tl.call(() => setShowCursor(false), [], 3.2);
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        3.2
      );

      // PHASE 5: Progress bar then fade out
      tl.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: 0.6, ease: "power1.inOut" },
        3.7
      );

      tl.to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setHidden(true);
            onComplete();
          },
        },
        4.4
      );

      // Blinking cursor
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: rootRef, dependencies: [isMobile] }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a", zIndex: 9999 }}
    >
      {/* Animated grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(224,123,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(224,123,76,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          animation: "loader-grid-shift 12s linear infinite",
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#E07B4C",
            opacity: 0.4,
            animation: `loader-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Logo + Text container */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <div className="relative flex items-center justify-center">
          {/* Sonar ring */}
          <div
            ref={sonarRef}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "200px",
              height: "200px",
              border: "2px solid #E07B4C",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          />
          <img
            ref={logoRef}
            src="/armoriq-logo.png"
            alt="ArmorIQ"
            className="relative"
            style={{
              width: "200px",
              height: "200px",
              filter: "drop-shadow(0 0 24px #E07B4C)",
              willChange: "transform, opacity",
              opacity: 0,
            }}
          />
        </div>

        {/* Text */}
        <div
          ref={textWrapRef}
          className="flex items-center"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="inline-block text-5xl sm:text-7xl md:text-8xl"
              style={{
                color: "#E07B4C",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textShadow: "0 0 20px rgba(224,123,76,0.6)",
                opacity: i < visibleLetters ? 1 : 0,
                transform: i < visibleLetters ? "translateY(0) scale(1)" : "translateY(8px) scale(0.85)",
                transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
              }}
            >
              {l}
            </span>
          ))}
          {showCursor && (
            <span
              ref={cursorRef}
              className="inline-block ml-1 text-5xl sm:text-7xl md:text-8xl"
              style={{ color: "#E07B4C", fontWeight: 700 }}
            >
              |
            </span>
          )}
        </div>
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className="absolute bottom-24 left-0 right-0 text-center text-xs sm:text-sm tracking-[0.3em] uppercase"
        style={{ color: "#6B6B6B", fontFamily: "var(--font-geist-mono)", opacity: 0 }}
      >
        Control Fabric for Autonomous Agents
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          ref={progressRef}
          className="h-full"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #E07B4C, #f0a07a, #E07B4C)",
            boxShadow: "0 0 12px rgba(224,123,76,0.7)",
            willChange: "width",
          }}
        />
      </div>

      <style>{`
        @keyframes loader-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(8px, -12px); opacity: 0.55; }
        }
        @keyframes loader-grid-shift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 48px 48px, 48px 48px; }
        }
      `}</style>
    </div>
  );
};

interface CornerBracketProps {
  position: "tl" | "tr" | "bl" | "br";
}

const CornerBracket = ({ position }: CornerBracketProps) => {
  const positions: Record<CornerBracketProps["position"], string> = {
    tl: "top-6 left-6",
    tr: "top-6 right-6",
    bl: "bottom-6 left-6",
    br: "bottom-6 right-6",
  };
  const borders: Record<CornerBracketProps["position"], React.CSSProperties> = {
    tl: { borderTop: "2px solid #E07B4C", borderLeft: "2px solid #E07B4C" },
    tr: { borderTop: "2px solid #E07B4C", borderRight: "2px solid #E07B4C" },
    bl: { borderBottom: "2px solid #E07B4C", borderLeft: "2px solid #E07B4C" },
    br: { borderBottom: "2px solid #E07B4C", borderRight: "2px solid #E07B4C" },
  };
  return (
    <div
      aria-hidden
      className={`loader-corner absolute w-12 h-12 ${positions[position]}`}
      style={{ ...borders[position], boxShadow: "0 0 12px rgba(224,123,76,0.4)" }}
    />
  );
};

export default LoadingScreen;
