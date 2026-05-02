"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface ProductCard {
  icon: string;
  label: string;
  title: string;
  body: string;
}

const CARDS: ReadonlyArray<ProductCard> = [
  { icon: "🛡", label: "Core", title: "Intent Vault", body: "Cryptographically seal the agent's sanctioned task at session start. Every action is verified against it." },
  { icon: "🧭", label: "Runtime", title: "Plan Interceptor", body: "Inspect every tool call before execution. Block, allow, or escalate based on intent match." },
  { icon: "📜", label: "Policy", title: "Intent Policies", body: "Declarative rules in code or YAML. Version, review, and audit them like any other config." },
  { icon: "🔍", label: "Observability", title: "Action Forensics", body: "Replay any agent session. See plan, tools attempted, and the exact moment intent diverged." },
  { icon: "🧬", label: "SDK", title: "Drop-in Adapters", body: "One line wraps OpenAI, Anthropic, LangGraph, CrewAI and your custom MCP servers." },
  { icon: "⚖", label: "Governance", title: "Audit Ledger", body: "Tamper-evident log of every blocked, allowed, and escalated action — ready for your SOC2 auditor." },
];

const Platform = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".platform-heading", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".platform-card-wrap", {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".platform-grid", start: "top 80%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="platform" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
            <span>$ </span>The platform
          </span>
          <h2 className="platform-heading mt-3 text-3xl md:text-5xl leading-tight tracking-tight text-balance"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}>
            One control plane for every agent action.
          </h2>
          <p className="mt-5 text-base md:text-lg" style={{ color: "var(--text-light)" }}>
            Six primitives that turn unbounded agents into auditable, policy-bound systems.
          </p>
        </div>

        <div className="platform-grid mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div key={c.title} className="platform-card-wrap">
              <TiltCard
                className="p-7 rounded-2xl group"
                style={{ background: "var(--surface-soft)", border: "1px solid var(--border-soft)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "#fff", border: "1px solid var(--border-soft)" }}
                >
                  {c.icon}
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider mb-3"
                  style={{ background: "rgba(224,123,76,0.12)", color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}
                >
                  {c.label}
                </span>
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}>
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
                  {c.body}
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platform;
