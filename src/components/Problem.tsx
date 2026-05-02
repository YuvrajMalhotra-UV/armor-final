"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProblemCard {
  icon: string;
  title: string;
  body: string;
}

const CARDS: ReadonlyArray<ProblemCard> = [
  {
    icon: "⚡",
    title: "Prompt injection slips through",
    body: "A single hostile string in a webpage or ticket can hijack your agent's plan and trigger tool calls you never sanctioned.",
  },
  {
    icon: "🔓",
    title: "RBAC stops users, not agents",
    body: "Identity tells you who is calling. It can't tell you whether the action matches the task the user actually asked for.",
  },
  {
    icon: "👁",
    title: "Guardrails only filter words",
    body: "Output filters catch toxic text. They don't catch a polite agent quietly exfiltrating your billing database.",
  },
];

const Problem = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".problem-card");
      gsap.from(".problem-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-grid", start: "top 80%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="problem"
      className="py-24 md:py-32"
      style={{ background: "var(--surface-muted)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}
          >
            The problem
          </span>
          <h2
            className="problem-heading mt-3 text-3xl md:text-5xl leading-tight tracking-tight text-balance"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
          >
            Agents have keys to your stack.{" "}
            <span style={{ color: "var(--primary)" }}>Nothing watches their intent.</span>
          </h2>
        </div>

        <div className="problem-grid mt-14 grid md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="problem-card card-hover p-7 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5"
                style={{ background: "rgba(224,123,76,0.1)" }}
              >
                {card.icon}
              </div>
              <h3
                className="text-lg mb-2"
                style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
