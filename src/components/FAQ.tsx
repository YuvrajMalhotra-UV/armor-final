"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface QA {
  q: string;
  a: string;
}

const ITEMS: ReadonlyArray<QA> = [
  { q: "How is this different from guardrails like NeMo or Llama Guard?", a: "Guardrails inspect text. ArmorIQ inspects actions. We sit between the agent's plan and your tools, blocking calls that fall outside the sanctioned intent — even when the output reads perfectly safe." },
  { q: "Will this slow down my agents?", a: "Intent verification runs sub-millisecond at the call site. For most workloads the overhead is invisible compared to LLM latency." },
  { q: "Which frameworks do you support?", a: "OpenAI Agents SDK, Anthropic, LangGraph, CrewAI, AutoGen, and any MCP server. Drop-in adapters mean a one-line install." },
  { q: "How do you handle multi-step plans?", a: "Each step is re-verified against the original sealed intent. Drift, recursion, and injected sub-goals get caught before tools fire." },
  { q: "Is this on-prem or SaaS?", a: "Both. Run our control plane in your VPC, or use our managed cloud. Same SDK, same policies." },
];

const FAQ = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number>(0);

  useGSAP(
    () => {
      gsap.from(".faq-heading", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".faq-item", {
        y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="faq" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
            <span>$ </span>FAQ
          </span>
          <h2 className="faq-heading mt-3 text-3xl md:text-5xl leading-tight tracking-tight text-balance"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}>
            Questions, answered.
          </h2>
        </div>

        <div className="faq-list flex flex-col gap-4">
          {ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <FAQItem
                key={item.q}
                qa={item}
                isOpen={isOpen}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  qa: QA;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ qa, isOpen, onClick }: FAQItemProps) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [scanKey, setScanKey] = useState<number>(0);

  useGSAP(() => {
    const el = answerRef.current;
    const icon = iconRef.current;
    if (!el || !icon) return;
    if (isOpen) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(icon, { rotate: 45, duration: 0.3, ease: "power2.out" });
      setScanKey((k) => k + 1);
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item relative rounded-xl overflow-hidden transition-colors"
      style={{
        background: isOpen ? "var(--surface-soft)" : "#fff",
        border: `1px solid ${isOpen ? "var(--primary)" : "var(--border-soft)"}`,
      }}
    >
      {isOpen && <span key={scanKey} className="faq-scanline" aria-hidden />}
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span
          className="text-sm md:text-base"
          style={{ color: "var(--text-dark)", fontWeight: 500 }}
        >
          {qa.q}
        </span>
        <span
          ref={iconRef}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base"
          style={{
            background: isOpen ? "var(--primary)" : "var(--surface-muted)",
            color: isOpen ? "#fff" : "var(--text-medium)",
          }}
          aria-hidden
        >
          +
        </span>
      </button>
      <div ref={answerRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
          {qa.a}
        </p>
      </div>
    </div>
  );
};

export default FAQ;
