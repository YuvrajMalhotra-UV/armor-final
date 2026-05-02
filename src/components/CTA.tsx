"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-card", {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="cta" className="py-20 md:py-28 px-6 lg:px-10" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="cta-card relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-24 bg-cta-gradient text-center"
          style={{ boxShadow: "0 30px 80px -30px rgba(208,106,59,0.5)" }}
        >
          {/* texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative">
            <span
              className="inline-block text-xs uppercase tracking-[0.2em] mb-5 px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: "var(--font-geist-mono)" }}
            >
              Ship safer agents this week
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight max-w-3xl mx-auto text-balance"
              style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "#fff" }}
            >
              Put a firewall around every agent action.
            </h2>
            <p
              className="mt-5 text-base md:text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.85)", fontWeight: 300 }}
            >
              Book a 20-minute walkthrough. We'll show you a live agent getting blocked mid-attack.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-[1.03]"
                style={{ background: "#fff", color: "var(--primary)", fontWeight: 500 }}
              >
                Book a Demo →
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm transition-colors"
                style={{ background: "transparent", color: "#fff", fontWeight: 500, border: "1px solid rgba(255,255,255,0.6)" }}
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
