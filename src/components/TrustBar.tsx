"use client";

const COMPANIES: ReadonlyArray<string> = [
  "Google",
  "PayPal",
  "Intuit",
  "Verily",
  "Heritage Bank",
  "carID",
];

const TrustBar = () => {
  const items = [...COMPANIES, ...COMPANIES];
  return (
    <section
      className="py-12 border-y"
      style={{ borderColor: "var(--border-soft)", background: "#fff" }}
    >
      <p
        className="text-center text-xs uppercase tracking-[0.2em] mb-8"
        style={{ color: "var(--text-light)", fontFamily: "var(--font-geist-mono)" }}
      >
        Trusted by teams shipping agents at
      </p>
      <div className="overflow-hidden relative">
        <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
          {items.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: "var(--font-sunflower)",
                fontWeight: 700,
                color: "var(--text-light)",
                opacity: 0.7,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff, transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff, transparent)" }}
        />
      </div>
    </section>
  );
};

export default TrustBar;
