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
  color: string;
  delay: number;
  duration: number;
}

const PARTICLES: ReadonlyArray<Particle> = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  color: i % 3 === 0 ? "#E07B4C" : "#6B6B6B",
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 5,
}));

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState<boolean>(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".loader-corner", {
        opacity: 0,
        scale: 0.6,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });

      tl.from(
        ".loader-letter",
        {
          opacity: 0,
          scale: 0.4,
          y: 16,
          textShadow: "0 0 0px rgba(224,123,76,0)",
          duration: 0.5,
          stagger: 0.13,
          ease: "back.out(1.6)",
        },
        "-=0.2"
      );

      tl.to(
        ".loader-letter",
        {
          textShadow:
            "0 0 24px rgba(224,123,76,0.85), 0 0 48px rgba(224,123,76,0.4)",
          duration: 0.4,
          stagger: 0.05,
        },
        "-=0.4"
      );

      tl.from(
        taglineRef.current,
        { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // Progress bar
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2.6,
        ease: "power1.inOut",
      });

      // Scanline loop
      gsap.to(scanlineRef.current, {
        y: "100vh",
        duration: 2.4,
        repeat: -1,
        ease: "power1.inOut",
      });

      // Fade out at 3s
      tl.to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setHidden(true);
            onComplete();
          },
        },
        ">"
      );
    },
    { scope: rootRef }
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          aria-hidden
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.35,
            animation: `loader-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Scanline */}
      <div
        ref={scanlineRef}
        aria-hidden
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: "-2px",
          background:
            "linear-gradient(90deg, transparent, rgba(224,123,76,0.85), transparent)",
          boxShadow: "0 0 12px rgba(224,123,76,0.6)",
        }}
      />

      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Letters */}
      <div
        className="flex items-center justify-center gap-1 sm:gap-2"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {LETTERS.map((l, i) => (
          <span
            key={i}
            className="loader-letter inline-block text-4xl sm:text-6xl md:text-7xl"
            style={{
              color: "#E07B4C",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {l}
          </span>
        ))}
      </div>

      <div
        ref={taglineRef}
        className="mt-6 text-xs sm:text-sm tracking-[0.3em] uppercase"
        style={{ color: "#6B6B6B", fontFamily: "var(--font-geist-mono)" }}
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
            background:
              "linear-gradient(90deg, #E07B4C, #f0a07a, #E07B4C)",
            boxShadow: "0 0 12px rgba(224,123,76,0.7)",
          }}
        />
      </div>

      <style>{`
        @keyframes loader-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          50% { transform: translate(8px, -12px); opacity: 0.5; }
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
      className={`loader-corner absolute w-10 h-10 ${positions[position]}`}
      style={{ ...borders[position], boxShadow: "0 0 12px rgba(224,123,76,0.4)" }}
    />
  );
};

export default LoadingScreen;
