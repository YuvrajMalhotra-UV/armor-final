"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Platform", href: "#platform" },
  { label: "Why ArmorIQ", href: "#differentiation" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  useGSAP(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const menu = mobileMenuRef.current;
    if (!l1 || !l2 || !l3) return;

    if (open) {
      gsap.to(l1, { y: 7, rotate: 45, duration: 0.3, ease: "power2.inOut" });
      gsap.to(l2, { opacity: 0, duration: 0.2 });
      gsap.to(l3, { y: -7, rotate: -45, duration: 0.3, ease: "power2.inOut" });
      if (menu) {
        gsap.fromTo(
          menu,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
        );
      }
    } else {
      gsap.to(l1, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(l2, { opacity: 1, duration: 0.2 });
      gsap.to(l3, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
      if (menu) {
        gsap.to(menu, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    }
  }, [open]);

  const handleToggle = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    setOpen((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 text-xl md:text-2xl"
          style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--primary)" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "var(--primary)", color: "#fff" }}
            aria-hidden
          >
            ◈
          </span>
          <span>ArmorIQ</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 text-[9px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-light)", fontWeight: 500 }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#3fbf7f", boxShadow: "0 0 6px #3fbf7f" }} />
            SYSTEM ACTIVE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm"
              style={{ color: "var(--text-medium)", fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="btn-shine btn-pulse hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm transition-transform duration-200 hover:scale-105"
          style={{ background: "var(--primary)", color: "#fff", fontWeight: 500 }}
        >
          Book a Demo →
        </a>

        <button
          type="button"
          onClick={handleToggle}
          aria-label="Toggle menu"
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span ref={line1Ref} className="hamburger-line block w-6 h-0.5 rounded" style={{ background: "var(--text-dark)" }} />
          <span ref={line2Ref} className="hamburger-line block w-6 h-0.5 rounded" style={{ background: "var(--text-dark)" }} />
          <span ref={line3Ref} className="hamburger-line block w-6 h-0.5 rounded" style={{ background: "var(--text-dark)" }} />
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(14px)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base"
              style={{ color: "var(--text-medium)", fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm"
            style={{ background: "var(--primary)", color: "#fff", fontWeight: 500 }}
          >
            Book a Demo →
          </a>
        </div>
      </div>
      {scrolled && <div className="nav-border" aria-hidden />}
    </nav>
  );
};

export default Navbar;
