"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
}

const isTouch = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
};

const TiltCard = ({ children, className, style, maxTilt = 9 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isTouch()) return;
    const el = ref.current;
    const glow = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    if (glow) {
      glow.style.opacity = "1";
      glow.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(224,123,76,0.18), transparent 65%)`;
    }
  };

  const handleLeave = (): void => {
    const el = ref.current;
    const glow = glowRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    if (glow) glow.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className ?? ""}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s",
        willChange: "transform",
        ...style,
      }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.3s", borderRadius: "inherit" }}
      />
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
