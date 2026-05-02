"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Role = "user" | "bot";

interface ChatMessage {
  role: Role;
  text: string;
  timestamp: Date;
}

interface QAPair {
  keywords: ReadonlyArray<string>;
  en: string;
  hi: string;
}

const KB: ReadonlyArray<QAPair> = [
  {
    keywords: ["what is armoriq", "armoriq क्या", "armoriq kya", "about armoriq"],
    en: "ArmorIQ is an AI agent security platform that stops AI agents from going rogue. It sits between your AI agents and your systems, intercepting every action and enforcing policy before anything executes. Think of it as a firewall for AI agent behavior — not just identity.",
    hi: "ArmorIQ एक AI agent security platform है जो AI agents को rogue होने से रोकता है। यह आपके AI agents और आपके systems के बीच बैठता है, हर action को intercept करता है और कुछ भी execute होने से पहले policy enforce करता है।",
  },
  {
    keywords: ["how does armoriq work", "how armoriq works", "armoriq कैसे", "armoriq kaise"],
    en: "ArmorIQ wraps your agent framework with a one-line SDK. At session start it cryptographically seals the sanctioned intent. Every tool call is then verified against that intent in sub-millisecond time — calls outside scope are blocked, allowed, or escalated based on your policy.",
    hi: "ArmorIQ एक one-line SDK से आपके agent framework को wrap करता है। Session शुरू होते ही sanctioned intent को cryptographically seal कर दिया जाता है। फिर हर tool call उसी intent के against verify होता है और scope के बाहर वाले calls को block, allow या escalate किया जाता है।",
  },
  {
    keywords: ["intent enforcement", "intent enforce"],
    en: "Intent enforcement means ArmorIQ checks every action an AI agent tries to take against its original assigned task. If an agent was asked to summarize emails but tries to access billing data — ArmorIQ blocks it instantly. Authenticated doesn't mean aligned.",
    hi: "Intent enforcement का मतलब है कि ArmorIQ हर वो action check करता है जो AI agent करने की कोशिश करता है — उसके original assigned task के against। अगर agent को emails summarize करने को कहा गया था लेकिन वो billing data access करने की कोशिश करे — ArmorIQ उसे तुरंत block कर देता है।",
  },
  {
    keywords: ["different from iam", "iam se kaise", "iam से कैसे", "iam vs", "rbac"],
    en: "IAM and RBAC tell you who can call something. They can't tell you whether the action matches the task the user actually asked the agent to do. ArmorIQ adds an intent layer on top: even an authenticated agent gets blocked if it strays from its sanctioned task.",
    hi: "IAM और RBAC यह बताते हैं कि कौन call कर सकता है। लेकिन यह नहीं बताते कि action user के दिए गए task से match करता है या नहीं। ArmorIQ ऊपर एक intent layer add करता है — authenticated agent भी block हो जाता है अगर वो अपने task से हटे।",
  },
  {
    keywords: ["what is armorclaw", "armorclaw क्या", "armor claw"],
    en: "ArmorClaw is ArmorIQ's open source tool that provides Intent Assurance for OpenClaw agents. It uses cryptographic verification at every step to ensure agents stay within their assigned boundaries.",
    hi: "ArmorClaw ArmorIQ का open source tool है जो OpenClaw agents के लिए Intent Assurance provide करता है। यह हर step पर cryptographic verification use करता है।",
  },
  {
    keywords: ["who is armoriq for", "किसके लिए", "kiske liye"],
    en: "ArmorIQ is built for security, platform, and AI engineering teams shipping autonomous agents in production — especially in regulated industries like finance, healthcare, and SaaS where unauthorized agent actions are a real risk.",
    hi: "ArmorIQ उन security, platform और AI engineering teams के लिए बना है जो production में autonomous agents ship कर रहे हैं — खासकर finance, healthcare और SaaS जैसी regulated industries में।",
  },
  {
    keywords: ["open source", "opensource", "open-source"],
    en: "ArmorClaw — our intent assurance core — is open source. The full ArmorIQ control plane (policies, audit, dashboards) is a commercial product available as managed cloud or self-hosted in your VPC.",
    hi: "ArmorClaw — हमारा intent assurance core — open source है। पूरा ArmorIQ control plane (policies, audit, dashboards) commercial product है जो managed cloud या self-hosted के रूप में available है।",
  },
  {
    keywords: ["intent engine", "intent vault"],
    en: "The Intent Engine (Intent Vault) cryptographically seals an agent's sanctioned task at session start and verifies every subsequent action against it. It's the cryptographic heart of ArmorIQ.",
    hi: "Intent Engine (Intent Vault) session शुरू होते ही agent के sanctioned task को cryptographically seal करता है और हर action को उसके against verify करता है।",
  },
  {
    keywords: ["sentry"],
    en: "Sentry is the runtime watchdog that observes agent plans and tool calls live, raising alerts the moment an agent's behavior diverges from its sealed intent.",
    hi: "Sentry runtime watchdog है जो agent के plans और tool calls को live observe करता है और intent से divergence होते ही alerts भेजता है।",
  },
  {
    keywords: ["gatekeeper", "plan interceptor"],
    en: "Gatekeeper (Plan Interceptor) inspects every tool call before execution and blocks, allows, or escalates it based on whether it matches the sanctioned intent and your policies.",
    hi: "Gatekeeper हर tool call को execution से पहले inspect करता है और sanctioned intent व policies के अनुसार block, allow या escalate करता है।",
  },
  {
    keywords: ["registry"],
    en: "The Registry is the central catalog of agents, tools, intents, and policies. It versions every change and makes governance reviewable like any other config.",
    hi: "Registry agents, tools, intents और policies का central catalog है। यह हर change को version करता है ताकि governance reviewable रहे।",
  },
  {
    keywords: ["auditor", "audit log", "audit ledger"],
    en: "The Auditor produces a tamper-evident ledger of every blocked, allowed, and escalated action — ready for SOC2, HIPAA, and internal review.",
    hi: "Auditor हर blocked, allowed और escalated action का tamper-evident ledger बनाता है — SOC2, HIPAA और internal review के लिए तैयार।",
  },
  {
    keywords: ["compliance", "soc2", "hipaa", "iso"],
    en: "ArmorIQ is SOC2-ready out of the box and supports HIPAA, ISO 27001, and GDPR-aligned deployments. Every blocked or allowed action is captured in a tamper-evident audit log.",
    hi: "ArmorIQ SOC2-ready है और HIPAA, ISO 27001 तथा GDPR-aligned deployments support करता है। हर action का tamper-evident audit log रखा जाता है।",
  },
  {
    keywords: ["book a demo", "demo book", "demo कैसे", "demo kaise", "schedule demo"],
    en: "You can book a demo by clicking the orange 'Book a Demo' button at the top of the page or in the CTA section. Our team will reach out to set up a personalized walkthrough of the platform.",
    hi: "Demo book करने के लिए page के top पर या CTA section में orange 'Book a Demo' button पर click करें। हमारी team आपसे platform का personalized walkthrough set up करने के लिए संपर्क करेगी।",
  },
  {
    keywords: ["docs", "documentation", "docs कहां", "docs kahan"],
    en: "Our documentation lives at docs.armoriq.ai — you'll find quickstarts, SDK references for OpenAI/Anthropic/LangGraph/CrewAI, and policy examples.",
    hi: "हमारे docs docs.armoriq.ai पर मिलेंगे — quickstarts, SDK references और policy examples सब वहीं हैं।",
  },
  {
    keywords: ["get started", "getting started", "शुरुआत", "shuruaat", "start"],
    en: "Getting started takes one line: install our SDK, wrap your agent framework, define a sanctioned intent, and you're protected. Visit docs.armoriq.ai or book a demo for a guided walkthrough.",
    hi: "शुरुआत बहुत आसान है: SDK install करें, अपने agent framework को wrap करें, sanctioned intent define करें और आप protected हैं। Guided walkthrough के लिए demo book करें।",
  },
  {
    keywords: ["contact", "contact कैसे", "contact kaise", "reach out", "support"],
    en: "You can reach the ArmorIQ team via the Book a Demo button, or email hello@armoriq.ai. For security disclosures, use security@armoriq.ai.",
    hi: "ArmorIQ team से Book a Demo button के ज़रिए या hello@armoriq.ai पर email करके संपर्क कर सकते हैं। Security disclosures के लिए security@armoriq.ai use करें।",
  },
  {
    keywords: ["what are ai agents", "ai agents क्या", "ai agents kya"],
    en: "AI agents are autonomous LLM-powered programs that plan tasks, call tools, and act on systems on your behalf — like a junior employee with API keys. Powerful, but risky without guardrails on what they're allowed to do.",
    hi: "AI agents autonomous LLM-powered programs हैं जो tasks plan करते हैं, tools call करते हैं और आपकी ओर से systems पर action लेते हैं — जैसे API keys वाला junior employee। बहुत powerful हैं लेकिन guardrails के बिना risky भी।",
  },
  {
    keywords: ["why do ai agents need security", "agents को security", "agents ko security"],
    en: "Agents act with real credentials on real systems. A single prompt injection or hallucinated plan can move money, leak data, or delete records. Identity (IAM) tells you who is calling — it can't tell you the action matches the user's intent. That gap is what ArmorIQ closes.",
    hi: "Agents real credentials से real systems पर act करते हैं। एक prompt injection या hallucinated plan पैसे move कर सकता है, data leak कर सकता है या records delete कर सकता है। IAM बताता है कि कौन call कर रहा है — यह नहीं कि action user की intent से match करता है या नहीं। यही gap ArmorIQ बंद करता है।",
  },
  {
    keywords: ["rogue ai agent", "rogue agent", "rogue", "going rogue"],
    en: "A rogue AI agent is one that takes actions outside its sanctioned task — usually due to prompt injection, drift in multi-step plans, or manipulated tool outputs. ArmorIQ catches these the moment they happen.",
    hi: "Rogue AI agent वो है जो अपने sanctioned task के बाहर actions लेता है — आमतौर पर prompt injection, multi-step plans में drift या manipulated tool outputs की वजह से। ArmorIQ इन्हें उसी moment पकड़ लेता है।",
  },
  {
    keywords: ["action is blocked", "action block", "block hota", "block होता"],
    en: "When ArmorIQ blocks an action: 1) The action does not execute, 2) The agent receives a clear message: 'Action blocked — exceeds delegated authority', 3) A tamper-evident audit log is created, 4) Your security team gets notified if alerts are configured.",
    hi: "जब ArmorIQ कोई action block करता है: 1) Action execute नहीं होता, 2) Agent को clear message मिलता है: 'Action blocked — exceeds delegated authority', 3) एक audit log create होता है, 4) अगर alerts configure हैं तो security team को notify किया जाता है।",
  },
  {
    keywords: ["price", "pricing", "cost", "kitna", "कितना"],
    en: "ArmorIQ pricing is usage-based with a free tier for early-stage teams and custom enterprise plans for production deployments. Book a demo and we'll tailor a plan to your workload.",
    hi: "ArmorIQ की pricing usage-based है — early-stage teams के लिए free tier और production deployments के लिए custom enterprise plans। Demo book करें, हम आपके workload के लिए plan तैयार करेंगे।",
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "नमस्ते", "hii"],
    en: "Hey there! I'm ARMOR CLAW 🛡️ — ask me anything about ArmorIQ, agent security, or how to get started.",
    hi: "नमस्ते! मैं ARMOR CLAW हूं 🛡️ — ArmorIQ, agent security या getting started के बारे में कुछ भी पूछिए।",
  },
];

const FALLBACK_EN =
  "I don't have specific information about that yet. Please visit our docs at docs.armoriq.ai or book a demo to speak with our team directly!";
const FALLBACK_HI =
  "मुझे इसके बारे में अभी specific जानकारी नहीं है। कृपया docs.armoriq.ai पर जाएं या हमारी team से directly बात करने के लिए demo book करें!";

const WELCOME_EN =
  "Hi! I'm ARMOR CLAW 🛡️ ArmorIQ's AI assistant. I can help you understand our platform, answer questions about AI agent security, and guide you through our features. How can I help you today?";
const WELCOME_HI =
  "नमस्ते! मैं ARMOR CLAW हूं 🛡️ ArmorIQ का AI असिस्टेंट। मैं आपको हमारा प्लेटफॉर्म समझने में, AI एजेंट सिक्योरिटी के बारे में सवालों के जवाब देने में मदद कर सकता हूं।";

const HINGLISH_HINTS: ReadonlyArray<string> = [
  "kya", "kaise", "kahan", "kyu", "kyun", "hai", "kar", "karna", "mujhe",
  "humein", "hamein", "kitna", "batao", "bata", "samjha", "samjhao",
  "kar do", "chahiye", "krna", "krta", "krte",
];

const detectLanguage = (text: string): "hi" | "en" => {
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  const lower = text.toLowerCase();
  const tokens = lower.split(/\s+/);
  for (const t of tokens) {
    if (HINGLISH_HINTS.includes(t)) return "hi";
  }
  return "en";
};

const findAnswer = (text: string, lang: "hi" | "en"): string => {
  const lower = text.toLowerCase();
  let best: { score: number; pair: QAPair | null } = { score: 0, pair: null };
  for (const pair of KB) {
    for (const kw of pair.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        const score = kw.length;
        if (score > best.score) best = { score, pair };
      }
    }
  }
  if (best.pair) return lang === "hi" ? best.pair.hi : best.pair.en;
  return lang === "hi" ? FALLBACK_HI : FALLBACK_EN;
};

const formatTime = (d: Date): string => {
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

const ArmorClaw = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed welcome on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { role: "bot", text: WELCOME_EN, timestamp: new Date() },
        { role: "bot", text: WELCOME_HI, timestamp: new Date() },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useGSAP(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0, scale: 0.95, transformOrigin: "bottom right" },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
      );
      window.setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      gsap.to(el, { y: 24, opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  const handleSend = (): void => {
    const text = input.trim();
    if (!text) return;
    const lang = detectLanguage(text);
    const userMsg: ChatMessage = { role: "user", text, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    const delay = 1000 + Math.random() * 500;
    window.setTimeout(() => {
      const answer = findAnswer(text, lang);
      setMessages((m) => [...m, { role: "bot", text: answer, timestamp: new Date() }]);
      setTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open ARMOR CLAW chat"
        className="btn-pulse fixed bottom-6 right-6 z-[90] inline-flex items-center gap-2 px-4 py-3 rounded-full transition-transform hover:scale-105"
        style={{
          background: "var(--primary)",
          color: "#fff",
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.08em",
          boxShadow: "0 14px 38px -10px rgba(224,123,76,0.55)",
        }}
      >
        <img src="/armoriq-logo.png" alt="ArmorIQ" className="w-5 h-5 object-contain" />
        <span className="hidden sm:inline">{open ? "CLOSE" : "ARMOR CLAW"}</span>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed z-[95] flex flex-col overflow-hidden"
        style={{
          opacity: 0,
          pointerEvents: open ? "auto" : "none",
          right: "1.5rem",
          bottom: "5.5rem",
          width: "min(360px, calc(100vw - 3rem))",
          height: "min(500px, calc(100vh - 7rem))",
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(224,123,76,0.08)",
        }}
        role="dialog"
        aria-label="ARMOR CLAW chat"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "linear-gradient(135deg, #2D2D2D 0%, #1a1a1a 100%)",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                background: "rgba(224,123,76,0.12)",
                boxShadow: "0 0 18px rgba(224,123,76,0.35)",
              }}
            >
              <img src="/armoriq-logo.png" alt="ArmorIQ" className="w-6 h-6 object-contain" />
            </span>
            <div className="leading-tight">
              <div
                className="text-sm tracking-wider"
                style={{
                  color: "#fff",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 700,
                }}
              >
                ARMOR <span style={{ color: "var(--primary)" }}>CLAW</span>
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  color: "#9aa0a6",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                by ArmorIQ
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors"
            style={{ color: "#fff", background: "rgba(255,255,255,0.06)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
          style={{ background: "#fff", fontFamily: "var(--font-sunflower)" }}
        >
          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          {typing && <TypingIndicator />}
        </div>

        {/* Input */}
        <div
          className="flex items-center gap-2 px-3 py-3"
          style={{ borderTop: "1px solid var(--border-soft)", background: "var(--surface-soft)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything... / कुछ भी पूछें..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
            style={{
              background: "#fff",
              border: "1px solid var(--border-soft)",
              color: "var(--text-dark)",
              fontFamily: "var(--font-sunflower)",
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="Send message"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full transition-transform hover:scale-105"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 8px 18px -8px rgba(224,123,76,0.6)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed"
        style={{
          background: isUser ? "var(--primary)" : "#f5f5f5",
          color: isUser ? "#fff" : "var(--text-dark)",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          fontFamily: "var(--font-sunflower)",
          whiteSpace: "pre-wrap",
        }}
      >
        {message.text}
      </div>
      <span
        className="mt-1 text-[10px]"
        style={{
          color: "var(--text-light)",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex items-start">
    <div
      className="px-4 py-3 inline-flex items-center gap-1.5"
      style={{
        background: "#f5f5f5",
        borderRadius: "18px 18px 18px 4px",
      }}
    >
      <Dot delay="0s" />
      <Dot delay="0.15s" />
      <Dot delay="0.3s" />
    </div>
    <style>{`
      @keyframes claw-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
    `}</style>
  </div>
);

const Dot = ({ delay }: { delay: string }) => (
  <span
    className="inline-block w-1.5 h-1.5 rounded-full"
    style={{
      background: "var(--primary)",
      animation: `claw-bounce 1.1s ease-in-out ${delay} infinite`,
    }}
  />
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#fff" }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default ArmorClaw;
