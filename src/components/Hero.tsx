"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TechBackground from "./TechBackground";

interface HeroProps {
  startTyping: boolean;
}

interface TerminalLine {
  prefix: string;
  text: string;
  type: "prompt" | "info" | "blocked" | "ok";
}

const TERMINAL_LINES: ReadonlyArray<TerminalLine> = [
  { prefix: "agent>", text: "support-agent-1 :: session.init()", type: "prompt" },
  { prefix: "task >", text: "Summarize customer query #4821", type: "info" },
  { prefix: "tool >", text: "READ /tickets/4821", type: "ok" },
  { prefix: "tool >", text: "READ /billing/all-records", type: "blocked" },
];

const ROGUE_TEXT = "going rogue.";

const Hero = ({ startTyping }: HeroProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);

  const [rogueTyped, setRogueTyped] = useState<string>("");
  const [showCaret, setShowCaret] = useState<boolean>(true);
  const [lineIdx, setLineIdx] = useState<number>(0);
  const [lineProgress, setLineProgress] = useState<number>(0);
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
        x: 30, y: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(blob2.current, {
        x: -25, y: 25, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    },
    { scope: rootRef }
  );

  // Heading typing effect
  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setRogueTyped(ROGUE_TEXT.slice(0, i));
      if (i >= ROGUE_TEXT.length) {
        window.clearInterval(id);
        window.setTimeout(() => setShowCaret(false), 2000);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [startTyping]);

  // Terminal sequential typing
  useEffect(() => {
    if (!startTyping) return;
    if (lineIdx >= TERMINAL_LINES.length) {
      const t = window.setTimeout(() => setShowBlocked(true), 350);
      return () => window.clearTimeout(t);
    }
    const current = TERMINAL_LINES[lineIdx].text;
    if (lineProgress < current.length) {
      const id = window.setTimeout(() => setLineProgress((p) => p + 1), 28);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLineIdx((n) => n + 1);
      setLineProgress(0);
    }, 280);
    return () => window.clearTimeout(id);
  }, [startTyping, lineIdx, lineProgress]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen pt-28 md:pt-32 pb-16 overflow-hidden bg-hero-gradient"
    >
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <TechBackground />
      </div>

      {/* Floating geometric shapes */}
      <div
        aria-hidden
        className="absolute top-[18%] left-[8%] w-24 h-24 rounded-full pointer-events-none float-geo"
        style={{ border: "1px solid rgba(224,123,76,0.18)", background: "rgba(224,123,76,0.03)" }}
      />
      <div
        aria-hidden
        className="absolute top-[60%] left-[5%] w-16 h-16 pointer-events-none float-geo"
        style={{
          border: "1px solid rgba(224,123,76,0.15)",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="absolute top-[30%] right-[12%] w-20 h-20 rounded-lg pointer-events-none float-geo"
        style={{ border: "1px solid rgba(224,123,76,0.12)", animationDelay: "-3s", transform: "rotate(45deg)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[20%] right-[20%] w-12 h-12 rounded-full pointer-events-none float-geo"
        style={{ background: "rgba(224,123,76,0.05)", animationDelay: "-9s" }}
      />

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
        <div>
          <div
            ref={badgeRef}
            className="badge-scan relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs overflow-hidden animate-pulse-glow"
            style={{
              background: "rgba(224,123,76,0.1)",
              color: "var(--primary)",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              border: "1px solid rgba(224,123,76,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--primary)" }} />
            JUST LAUNCHED · INTENT-BASED AGENT SECURITY
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
              {rogueTyped}
            </span>
            {showCaret && <span className="type-caret" aria-hidden>&nbsp;</span>}
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
              className="btn-shine btn-pulse inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-[1.03]"
              style={{ background: "var(--primary)", color: "#fff", fontWeight: 500 }}
            >
              Book a Demo →
            </a>
            <a
              href="#platform"
              className="btn-shine inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-colors"
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

        {/* Terminal card - dark */}
        <div ref={cardRef} className="relative">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#0e0e0e",
              border: "1px solid #1f1f1f",
              boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(224,123,76,0.1), 0 0 60px -20px rgba(224,123,76,0.25)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: "#1a1a1a", borderBottom: "1px solid #222" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <span className="text-xs" style={{ fontFamily: "var(--font-geist-mono)", color: "#888" }}>
                  agent-runtime · live
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-geist-mono)", color: "#aaa" }}>
                <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#3fbf7f", boxShadow: "0 0 8px #3fbf7f" }} />
                support-bot · active
              </div>
            </div>

            <div className="px-5 py-5 min-h-[260px]" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px" }}>
              {TERMINAL_LINES.map((line, idx) => {
                if (idx > lineIdx) return null;
                const fullText = line.text;
                const shown = idx < lineIdx ? fullText : fullText.slice(0, lineProgress);
                const isActive = idx === lineIdx && lineProgress < fullText.length;
                let textColor = "#cfcfcf";
                if (line.type === "info") textColor = "#9aa0a6";
                if (line.type === "ok") textColor = "#3fbf7f";
                if (line.type === "blocked") textColor = "#ff7a6b";

                return (
                  <div key={idx} className="mb-2 flex items-start gap-2">
                    <span style={{ color: "#E07B4C", fontWeight: 600 }}>{line.prefix}</span>
                    <span
                      style={{
                        color: textColor,
                        textDecoration: line.type === "blocked" && !isActive ? "line-through" : "none",
                      }}
                    >
                      {shown}
                      {isActive && <span className="type-caret" aria-hidden>&nbsp;</span>}
                    </span>
                  </div>
                );
              })}

              {showBlocked && (
                <div
                  className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg animate-pulse-glow"
                  style={{
                    background: "rgba(224,123,76,0.12)",
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    fontWeight: 600,
                    fontFamily: "var(--font-geist-mono)",
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

          <div
            className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-xs"
            style={{
              background: "#0e0e0e",
              border: "1px solid #222",
              fontFamily: "var(--font-geist-mono)",
              color: "#cfcfcf",
              boxShadow: "0 12px 30px -12px rgba(0,0,0,0.5)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary)" }} /> 12,481 actions verified today
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
