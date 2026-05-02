"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Row {
  capability: string;
  armoriq: string;
  guardrails: string;
  iam: string;
}

const ROWS: ReadonlyArray<Row> = [
  { capability: "Blocks unauthorized tool calls", armoriq: "✓ Pre-execution", guardrails: "Output only", iam: "Static perms" },
  { capability: "Understands task intent", armoriq: "✓ Cryptographic", guardrails: "—", iam: "—" },
  { capability: "Stops prompt injection actions", armoriq: "✓ Always", guardrails: "Sometimes", iam: "—" },
  { capability: "Per-session scope", armoriq: "✓ Dynamic", guardrails: "—", iam: "Role-bound" },
  { capability: "Tamper-evident audit", armoriq: "✓ Native", guardrails: "Logs only", iam: "Logs only" },
];

const Differentiation = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".diff-heading", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".diff-row", {
        y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: ".diff-table", start: "top 80%" },
      });
      gsap.from(".diff-tag", {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".diff-tag", start: "top 90%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="differentiation" className="py-24 md:py-32" style={{ background: "var(--surface-muted)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
            Why ArmorIQ
          </span>
          <h2 className="diff-heading mt-3 text-3xl md:text-5xl leading-tight tracking-tight text-balance"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}>
            A new layer. Not a better filter.
          </h2>
        </div>

        <div
          className="diff-table rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid var(--border-soft)" }}
        >
          {/* header */}
          <div
            className="grid grid-cols-4 px-4 md:px-6 py-4 text-xs uppercase tracking-wider"
            style={{ borderBottom: "1px solid var(--border-soft)", color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}
          >
            <div>Capability</div>
            <div className="text-center" style={{ color: "var(--primary)", fontWeight: 700 }}>ArmorIQ</div>
            <div className="text-center">Guardrails</div>
            <div className="text-center">IAM / RBAC</div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.capability}
              className="diff-row grid grid-cols-4 px-4 md:px-6 py-4 md:py-5 items-center text-sm"
              style={{ borderBottom: i === ROWS.length - 1 ? "none" : "1px solid var(--border-soft)" }}
            >
              <div className="pr-2" style={{ color: "var(--text-dark)", fontWeight: 500 }}>{row.capability}</div>
              <div
                className="text-center py-2 rounded-lg mx-1"
                style={{ background: "rgba(224,123,76,0.1)", color: "var(--primary)", fontWeight: 500, fontFamily: "var(--font-geist-mono)" }}
              >
                {row.armoriq}
              </div>
              <div className="text-center" style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}>{row.guardrails}</div>
              <div className="text-center" style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}>{row.iam}</div>
            </div>
          ))}
        </div>

        <p
          className="diff-tag mt-10 text-center text-lg md:text-2xl text-balance"
          style={{ fontFamily: "var(--font-sunflower)", fontWeight: 500, color: "var(--text-dark)" }}
        >
          Guardrails stop bad responses.{" "}
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>ArmorIQ stops bad actions.</span>
        </p>
      </div>
    </section>
  );
};

export default Differentiation;
