"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  body: string;
}

const STEPS: ReadonlyArray<Step> = [
  {
    num: "01",
    title: "Add Agents to your registry & policy",
    body: "Discover every agent and MCP server in your enterprise. Assign ownership. Define org-level policy. ArmorIQ gives you a complete, live system of record so governance starts before a single action runs.",
  },
  {
    num: "02",
    title: "Define and enforce Intent",
    body: "Before any API call, data access, or workflow trigger executes, ArmorIQ checks it against declared intent and active policy. Within scope: allowed. Outside scope: blocked or down-scoped, instantly.",
  },
  {
    num: "03",
    title: "Generate Audit trails",
    body: "Automatically captures a continuous, tamper-evident record of who did what, on whose behalf, and why. Compliance evidence is produced in real time, not assembled after an incident.",
  },
];

interface SidebarItem {
  icon: string;
  label: string;
  active?: boolean;
  children?: ReadonlyArray<string>;
}

const SIDEBAR: ReadonlyArray<SidebarItem> = [
  { icon: "▤", label: "Dashboard", active: true },
  { icon: "◉", label: "Agents" },
  { icon: "▥", label: "MCP Servers" },
  { icon: "✦", label: "Intent Intelligence", children: ["Intent Dashboard", "Intent Plans"] },
  { icon: "⚡", label: "Quick Scan" },
  { icon: "▦", label: "Policies (PEP/PDP)" },
  { icon: "▣", label: "Proxy Configuration", children: ["Domain Mapping", "Proxy Tokens"] },
  { icon: "◈", label: "Auth Clients" },
  { icon: "▧", label: "Audit & Logs" },
  { icon: "✱", label: "Settings" },
  { icon: "◎", label: "User Management" },
];

interface Stat {
  label: string;
  value: string;
  meta: string;
  tint: string;
}

const STATS: ReadonlyArray<Stat> = [
  { label: "Active MCP Endpoints", value: "2456", meta: "2% increase last month", tint: "#fde9dc" },
  { label: "Active Agents", value: "2100", meta: "Connected and reporting", tint: "#fde2d3" },
  { label: "Policy Violations", value: "12", meta: "High Severity", tint: "#dff3ff" },
  { label: "Unauthorized Actions", value: "5", meta: "Blocked Attempts", tint: "#ffe2e2" },
  { label: "Compliance Score", value: "92%", meta: "Target 95%", tint: "#e1f5e6" },
  { label: "System Uptime", value: "99.9%", meta: "Last 30 Days Average", tint: "#ece4f8" },
];

interface Alert {
  type: "notif" | "info" | "error";
  title: string;
  body: string;
  time: string;
}

const ALERTS: ReadonlyArray<Alert> = [
  { type: "notif", title: "Notification:", body: "Critical vulnerability detected on MCP Server \"research-mcp\" (Score: 100)", time: "1m" },
  { type: "info", title: "Info:", body: "New MCP Server added \"research-mcp\"", time: "5m" },
  { type: "info", title: "Info:", body: "New MCP Server added \"clinical-data-mcp\"", time: "20m" },
  { type: "notif", title: "Notification:", body: "Critical vulnerability detected on MCP Server \"loan-mcp\" (Score: 100)", time: "1h" },
  { type: "error", title: "Error:", body: "Chain attack pattern detected on \"loan-mcp\" (5 attacks)", time: "2h" },
];

const HowItWorks = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hiw-left", {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".hiw-right > *", {
        x: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".hiw-blocked", {
        scale: 0.7, opacity: 0, duration: 0.6, ease: "back.out(1.8)",
        scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#fff" }}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT - dashboard mockup */}
          <div className="hiw-left relative">
            <DashboardMockup />
          </div>

          {/* RIGHT - steps */}
          <div className="hiw-right flex flex-col gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--primary)", fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}>
                <span>$ </span>How it works
              </span>
              <h2
                className="mt-3 text-3xl md:text-5xl leading-tight tracking-tight text-balance"
                style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
              >
                How ArmorIQ works
              </h2>
            </div>

            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-5">
                <div
                  className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    fontFamily: "var(--font-geist-mono)",
                    fontWeight: 700,
                    fontSize: "16px",
                    boxShadow: "0 8px 22px -8px rgba(224,123,76,0.5)",
                  }}
                >
                  {s.num}
                </div>
                <div className="pt-1">
                  <h3
                    className="text-lg md:text-xl mb-2"
                    style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "var(--text-medium)" }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DashboardMockup = () => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "#f7f8fb",
        border: "1px solid #e6e7eb",
        boxShadow: "0 30px 60px -25px rgba(45,45,45,0.18), 0 0 0 1px rgba(224,123,76,0.04)",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "#fff", borderBottom: "1px solid #ececec" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px]"
            style={{ background: "var(--primary)", color: "#fff" }}
            aria-hidden
          >
            ◈
          </span>
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--primary)" }}
          >
            ARMORIQ
          </span>
          <span className="ml-3 text-[9px]" style={{ color: "#bbb" }}>|</span>
          <span className="text-[9px]" style={{ color: "#bbb" }}>ID</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[9px]" style={{ color: "#888", fontFamily: "var(--font-geist-mono)" }}>
            ↻ Last Sync 2 min ago
          </span>
          <span
            className="px-2.5 py-1 rounded text-[9px]"
            style={{ background: "var(--primary)", color: "#fff", fontWeight: 600 }}
          >
            Generate Report
          </span>
          <span
            className="w-5 h-5 rounded-full"
            style={{ background: "linear-gradient(135deg,#9ab,#567)" }}
            aria-hidden
          />
        </div>
      </div>

      <div className="flex" style={{ minHeight: "420px" }}>
        {/* Sidebar */}
        <div
          className="hidden sm:block py-3"
          style={{ width: "130px", background: "#fff", borderRight: "1px solid #ececec" }}
        >
          {SIDEBAR.map((item) => (
            <div key={item.label}>
              <div
                className="flex items-center gap-2 px-3 py-1.5 text-[9px]"
                style={{
                  background: item.active ? "rgba(224,123,76,0.08)" : "transparent",
                  color: item.active ? "var(--primary)" : "#5a5a5a",
                  borderLeft: item.active ? "2px solid var(--primary)" : "2px solid transparent",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                <span style={{ fontSize: "9px" }}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.children?.map((c) => (
                <div
                  key={c}
                  className="px-3 py-1 pl-7 text-[8.5px]"
                  style={{ color: "#888" }}
                >
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-3 md:p-4 min-w-0" style={{ background: "#f7f8fb" }}>
          <div
            className="text-[14px] md:text-[16px] leading-tight"
            style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)" }}
          >
            Good morning, Admin User!
          </div>
          <div className="text-[9px] mt-0.5" style={{ color: "#7a7a7a" }}>
            Welcome to your ArmorIQ Security Dashboard.
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 mt-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-md p-1.5"
                style={{ background: s.tint, border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="text-[7.5px] leading-tight" style={{ color: "#5a5a5a", fontWeight: 600 }}>
                  {s.label}
                </div>
                <div
                  className="text-[14px] mt-1"
                  style={{ fontFamily: "var(--font-sunflower)", fontWeight: 700, color: "var(--text-dark)", lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div className="text-[7px] mt-0.5" style={{ color: "#7a7a7a" }}>
                  {s.meta}
                </div>
              </div>
            ))}
          </div>

          {/* Analytics + Alerts */}
          <div className="grid grid-cols-5 gap-2 mt-3">
            <div
              className="col-span-3 rounded-md p-2"
              style={{ background: "#fff", border: "1px solid #ececec" }}
            >
              <div className="text-[9px] mb-1" style={{ fontWeight: 700, color: "var(--text-dark)" }}>
                Analytics
              </div>
              <RiskChart />
              <div className="text-[7px] text-center mt-0.5" style={{ color: "#888" }}>
                Risk Score
              </div>
            </div>
            <div
              className="col-span-2 rounded-md p-2 overflow-hidden"
              style={{ background: "#fff", border: "1px solid #ececec" }}
            >
              <div className="text-[9px] mb-1" style={{ fontWeight: 700, color: "var(--text-dark)" }}>
                Recent Alerts
              </div>
              <div className="flex flex-col gap-1">
                {ALERTS.map((a, i) => (
                  <div key={i} className="flex items-start gap-1.5 py-0.5" style={{ borderTop: i === 0 ? "none" : "1px solid #f3f3f3" }}>
                    <AlertIcon type={a.type} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[7px] leading-tight">
                        <span style={{ fontWeight: 700, color: a.type === "error" ? "#d94a4a" : a.type === "notif" ? "var(--primary)" : "#3a82c9" }}>
                          {a.title}{" "}
                        </span>
                        <span style={{ color: "#5a5a5a" }}>{a.body}</span>
                      </div>
                    </div>
                    <span className="text-[6.5px] shrink-0" style={{ color: "#aaa" }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-2 rounded-md p-2" style={{ background: "#fff", border: "1px solid #ececec" }}>
            <div className="text-[9px]" style={{ fontWeight: 700, color: "var(--text-dark)" }}>
              Active Agent Distribution by project
            </div>
            <div className="flex items-end gap-1 mt-1.5" style={{ height: "28px" }}>
              {[18, 26, 12, 22, 16, 30, 20, 14, 24].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}px`, background: i % 2 === 0 ? "var(--primary)" : "rgba(224,123,76,0.4)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Blocked popup */}
      <div
        className="hiw-blocked absolute flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          right: "12%",
          bottom: "10%",
          background: "#fff",
          border: "1px solid #ececec",
          boxShadow: "0 18px 40px -12px rgba(45,45,45,0.25)",
          minWidth: "150px",
        }}
      >
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0"
          style={{ background: "rgba(217,74,74,0.12)", color: "#d94a4a" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </span>
        <div className="leading-tight">
          <div className="text-[11px]" style={{ fontWeight: 700, color: "var(--text-dark)" }}>
            Action Blocked
          </div>
          <div className="text-[9px]" style={{ color: "#888" }}>
            Outside task scope
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertIcon = ({ type }: { type: Alert["type"] }) => {
  const colors: Record<Alert["type"], { bg: string; fg: string; ch: string }> = {
    notif: { bg: "rgba(224,123,76,0.15)", fg: "var(--primary)", ch: "!" },
    info: { bg: "rgba(58,130,201,0.15)", fg: "#3a82c9", ch: "i" },
    error: { bg: "rgba(217,74,74,0.15)", fg: "#d94a4a", ch: "✕" },
  };
  const c = colors[type];
  return (
    <span
      className="inline-flex items-center justify-center w-3 h-3 rounded-full text-[7px] shrink-0"
      style={{ background: c.bg, color: c.fg, fontWeight: 700, lineHeight: 1 }}
      aria-hidden
    >
      {c.ch}
    </span>
  );
};

const RiskChart = () => {
  // Smooth area chart with orange gradient
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"];
  const points: ReadonlyArray<[number, number]> = [
    [0, 50],
    [50, 42],
    [100, 30],
    [150, 14],
    [200, 38],
    [250, 50],
    [300, 46],
  ];
  const path = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
  const area = `${path} L 300 70 L 0 70 Z`;
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 70" width="100%" height="60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riskGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E07B4C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#E07B4C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#riskGrad)" />
        <path d={path} fill="none" stroke="#E07B4C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between text-[6.5px] mt-0.5" style={{ color: "#aaa" }}>
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
