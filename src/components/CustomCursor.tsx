"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
};

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    if (isTouchDevice()) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent): void => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const onOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, summary'
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[200] rounded-full"
        style={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          marginLeft: hovering ? -22 : -14,
          marginTop: hovering ? -22 : -14,
          border: hovering ? "1.5px solid #E07B4C" : "1px solid rgba(224,123,76,0.55)",
          background: hovering ? "rgba(224,123,76,0.12)" : "transparent",
          transition: "width 0.2s, height 0.2s, margin 0.2s, background 0.2s, border-color 0.2s",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[201] rounded-full"
        style={{
          width: hovering ? 0 : 6,
          height: hovering ? 0 : 6,
          marginLeft: hovering ? 0 : -3,
          marginTop: hovering ? 0 : -3,
          background: "#E07B4C",
          boxShadow: "0 0 10px rgba(224,123,76,0.8)",
          transition: "width 0.2s, height 0.2s, margin 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
