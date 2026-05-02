"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface TerminalLine {
  text: string;
  type: "prompt" | "info" | "blocked" | "ok";
}

const TERMINAL_LINES: ReadonlyArray<TerminalLine> = [
  { text: "$ agent.run(task='Summarize customer query #4821')", type: "prompt" },
  { text: "→ planning intent: read_ticket, summarize", type: "info" },
  { text: "→ tool_call: READ /tickets/4821 ✓", type: "ok" },
  { text: "→ tool_call: READ /billing/all-records", type: "blocked" },
];

const Hero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showBlocked, setShowBlocked] = useState<boolean>(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6 })
        .from(headingRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(cardRef.current, { x: 40, opacity: 0, duration: 0.9 }, "-=0.5");

      gsap.to(blob1.current, {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(blob2.current, {
        x: -25,
        y: 25,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= TERMINAL_LINES.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setShowBlocked(true), 400);
      }
    }, 700);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen pt-28 md:pt-32 pb-16 overflow-hidden bg-hero-gradient"
    >
      {/* grid + blobs */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden />
      <div
        ref={blob1}
        aria-hidden
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--primary-glow), transparent 70%)" }}
      />
      <div
        ref={blob2}
        aria-hidden
        className="absolute bottom-10 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(45,45,45,0.18), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{
              background: "rgba(224,123,76,0.1)",
              color: "var(--primary)",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              border: "1px solid rgba(224,123,76,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--primary)" }} />
            INTENT-BASED AGENT SECURITY
          </div>

          <h1
            ref={headingRef}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-balance"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
          >
            Stop AI agents from{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary), #f0a07a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              going rogue.
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--text-light)", fontWeight: 300 }}
          >
            ArmorIQ is the control fabric for autonomous agents — intercepting plans,
            enforcing policy, and blocking unauthorized actions before they execute.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#cta"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-[1.03]"
              style={{
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 500,
                boxShadow: "0 12px 32px -10px var(--primary-glow)",
              }}
            >
              Book a Demo →
            </a>
            <a
              href="#platform"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-colors"
              style={{
                background: "transparent",
                color: "var(--text-dark)",
                fontWeight: 500,
                border: "1px solid var(--border-soft)",
              }}
            >
              See the Platform
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs" style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}>
            <span>SOC2 ready</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-light)" }} />
            <span>Sub-ms intercept</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-light)" }} />
            <span>Cryptographic intent</span>
          </div>
        </div>

        {/* Right — terminal card */}
        <div ref={cardRef} className="relative">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#fff",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 30px 80px -30px rgba(45,45,45,0.25), 0 0 0 1px rgba(224,123,76,0.06)",
            }}
          >
            {/* card header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface-soft)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f0a07a" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e0c47a" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#9bc78a" }} />
                </div>
                <span className="text-xs" style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-light)" }}>
                  agent-runtime · live
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-medium)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#3fbf7f" }} />
                support-bot · active
              </div>
            </div>

            {/* task */}
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-soft)" }}>
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}>
                Sanctioned Intent
              </div>
              <div className="text-sm" style={{ color: "var(--text-dark)", fontWeight: 500 }}>
                Summarize customer query #4821
              </div>
            </div>

            {/* terminal body */}
            <div className="px-5 py-5 min-h-[220px]" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px" }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, idx) => {
                if (line.type === "prompt") {
                  return (
                    <div key={idx} className="mb-2" style={{ color: "var(--text-dark)" }}>
                      {line.text}
                    </div>
                  );
                }
                if (line.type === "info") {
                  return (
                    <div key={idx} className="mb-2" style={{ color: "var(--text-light)" }}>
                      {line.text}
                    </div>
                  );
                }
                if (line.type === "ok") {
                  return (
                    <div key={idx} className="mb-2" style={{ color: "#3fbf7f" }}>
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="mb-2 flex items-center gap-2">
                    <span style={{ color: "#d94a4a", textDecoration: "line-through" }}>{line.text}</span>
                  </div>
                );
              })}

              {showBlocked && (
                <div
                  className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg animate-pulse-glow"
                  style={{
                    background: "rgba(224,123,76,0.1)",
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    fontWeight: 500,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  ACTION BLOCKED · out-of-intent tool call
                </div>
              )}
            </div>
          </div>

          {/* floating chip */}
          <div
            className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-xs"
            style={{
              background: "#fff",
              border: "1px solid var(--border-soft)",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--text-medium)",
              boxShadow: "0 12px 30px -12px rgba(45,45,45,0.2)",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} /> 12,481 actions verified today
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
