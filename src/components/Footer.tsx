"use client";

interface FooterColumn {
  heading: string;
  links: ReadonlyArray<string>;
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  { heading: "Platform", links: ["Intent Vault", "Plan Interceptor", "Policies", "Audit Ledger", "SDK"] },
  { heading: "Company", links: ["About", "Blog", "Careers", "Security", "Contact"] },
];

const Footer = () => {
  return (
    <footer className="border-t" style={{ background: "var(--surface-soft)", borderColor: "var(--border-soft)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 text-2xl mb-4"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--primary)" }}>
            <img
              src="/armoriq-logo.png"
              alt="ArmorIQ"
              className="w-9 h-9 object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(224,123,76,0.35))" }}
            />
            <span>ArmorIQ</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-light)" }}>
            It's not about Identity. It's about <span style={{ color: "var(--primary)", fontWeight: 500 }}>Intent.</span>
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="text-xs uppercase tracking-[0.18em] mb-4"
              style={{ color: "var(--text-medium)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
              {col.heading}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm transition-colors hover:opacity-100" style={{ color: "var(--text-light)" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] mb-4"
            style={{ color: "var(--text-medium)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
            Get started
          </h4>
          <p className="text-sm mb-4" style={{ color: "var(--text-light)" }}>
            See ArmorIQ block a live attack in under 20 minutes.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm transition-transform duration-200 hover:scale-105"
            style={{ background: "var(--primary)", color: "#fff", fontWeight: 500 }}
          >
            Book a Demo →
          </a>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}>
          <span>© {new Date().getFullYear()} ArmorIQ, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80">Privacy</a>
            <a href="#" className="hover:opacity-80">Terms</a>
            <a href="#" className="hover:opacity-80">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
