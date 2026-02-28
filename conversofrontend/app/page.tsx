"use client";

import { useState, useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";

const FeatureIcons: Record<string, FC<{ className?: string }>> = {
  bolt: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  brain: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 0 8v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 0-8V6a4 4 0 0 1 4-4z"/>
      <path d="M8 7H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2"/>
      <path d="M16 7h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>
      <line x1="12" y1="6" x2="12" y2="18"/>
    </svg>
  ),
  shield: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  sliders: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  clock: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
    </svg>
  ),
};

const features = [
  {
    number: "01",
    iconKey: "bolt",
    title: "INSTANT RESPONSES",
    desc: "Reduce customer wait times with immediate, on-point answers. No queues. No delays.",
  },
  {
    number: "02",
    iconKey: "brain",
    title: "CONTENT-TRAINED AI",
    desc: "Learns directly from your website content to deliver accurate, context-aware replies.",
  },
  {
    number: "03",
    iconKey: "shield",
    title: "SECURE & PRIVATE",
    desc: "All data is fully encrypted and protected. Your customers' trust is never compromised.",
  },
  {
    number: "04",
    iconKey: "sliders",
    title: "CUSTOMIZABLE",
    desc: "Fine-tune tone, responses, and behavior to perfectly match your brand identity.",
  },
  {
    number: "05",
    iconKey: "clock",
    title: "24/7 AVAILABILITY",
    desc: "Always online. Always ready. Support that never sleeps, on every time zone.",
  },
];

const words = ["FASTER.", "SMARTER.", "ALWAYS ON.", "YOUR BRAND."];

export default function LandingPage() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-yellow-400 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-zinc-950" />
            </div>
            <span
              className="text-white text-xl font-black uppercase tracking-widest"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              CONVERSO 
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={item === "Pricing" ? "/pricing" : `/#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 hover:text-yellow-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => router.push("/auth/login")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              LOG IN
            </button>
            <button
              onClick={() => router.push("/auth/signup")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 bg-yellow-400 text-zinc-950 hover:bg-yellow-300 transition-all font-black"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              SIGN UP →
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
          }}
        />

        {/* Yellow vertical accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />

        {/* Giant ghost text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-black leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          CONVERSO
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-24">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-3 border border-zinc-800 px-4 py-2 mb-10">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">
                AI-Powered Customer Support
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-7xl sm:text-8xl lg:text-[9rem] font-black uppercase leading-none mb-4"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              SUPPORT
              <br />
              <span className="text-yellow-400">THAT&apos;S</span>
              <br />
              <span
                className="inline-block transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {words[wordIndex]}
              </span>
            </h1>

            {/* Sub */}
            <p className="text-zinc-400 text-lg font-mono mt-8 max-w-xl leading-relaxed border-l-2 border-yellow-400 pl-5">
              CONVERSO learns from your website content and delivers instant, context-aware customer support — 24/7. No human needed.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-0 mt-12">
              <button
                onClick={() => router.push("/auth/signup")}
                className="relative group overflow-hidden bg-yellow-400 text-zinc-950 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-yellow-300 active:scale-[0.98] transition-all"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
                <span className="relative">GET STARTED FREE →</span>
              </button>
              <button
                onClick={() => router.push("/auth/login")}
                className="border border-zinc-700 text-zinc-300 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:border-yellow-400 hover:text-yellow-400 transition-all"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                SIGN INTO DASHBOARD
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-0 mt-16 border-t border-zinc-800 pt-10">
              {[
                { val: "10K+", label: "Businesses" },
                { val: "99.9%", label: "Uptime" },
                { val: "<200ms", label: "Response Time" },
                { val: "24/7", label: "Always On" },
              ].map(({ val, label }, i) => (
                <div
                  key={label}
                  className={`flex-1 min-w-[120px] pr-8 ${i !== 0 ? "pl-8 border-l border-zinc-800" : ""}`}
                >
                  <div
                    className="text-3xl font-black text-yellow-400"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {val}
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-700">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="border-t border-zinc-800 py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left label */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="inline-block bg-yellow-400 px-3 py-1 mb-4">
                <span
                  className="text-zinc-950 text-[10px] font-black tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  How It Works
                </span>
              </div>
              <h2
                className="text-4xl font-black uppercase leading-none text-white"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                THREE
                <br />
                SIMPLE
                <br />
                STEPS.
              </h2>
            </div>

            {/* Steps */}
            <div className="flex-1 divide-y divide-zinc-800">
              {[
                { n: "01", title: "CONNECT YOUR WEBSITE", desc: "Point CONVERSO to your site. It crawls and ingests your content automatically — no manual input needed." },
                { n: "02", title: "TRAIN & CONFIGURE", desc: "Review what CONVERSO has learned. Customize the tone, restrict topics, and set boundaries to match your brand." },
                { n: "03", title: "GO LIVE", desc: "Embed the chat widget on your site in minutes. Your customers get instant, intelligent answers from day one." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="py-8 flex gap-8 group">
                  <span
                    className="text-5xl font-black text-zinc-800 group-hover:text-yellow-400 transition-colors leading-none flex-shrink-0"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {n}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-black uppercase tracking-widest text-white mb-2"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {title}
                    </h3>
                    <p className="text-zinc-500 font-mono text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="border-t border-zinc-800 py-28 relative bg-zinc-900/40">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          {/* Section header */}
          <div className="mb-16 flex items-end justify-between">
            <div>
              <div className="inline-block bg-yellow-400 px-3 py-1 mb-4">
                <span
                  className="text-zinc-950 text-[10px] font-black tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  Features
                </span>
              </div>
              <h2
                className="text-5xl font-black uppercase leading-none text-white"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                BUILT TO
                <br />
                PERFORM.
              </h2>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase max-w-xs">
                Everything you need to deliver world-class customer support at scale.
              </p>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-800">
            {features.map(({ number, iconKey, title, desc }, i) => (
              <div
                key={number}
                className={`p-8 border-zinc-800 group hover:bg-yellow-400/5 transition-colors cursor-default
                  ${i % 3 !== 2 ? "lg:border-r" : ""}
                  ${i < features.length - (features.length % 3 || 3) ? "border-b" : ""}
                  ${i < features.length - 1 && i % 2 === 0 ? "sm:border-r lg:border-r-0" : ""}
                  border-b
                `}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-3xl font-black text-zinc-800 group-hover:text-yellow-400/50 transition-colors"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {number}
                  </span>
                  {/* SVG icon — yellow tint, sharpens on hover */}
                  <div className="w-8 h-8 text-zinc-700 group-hover:text-yellow-400 transition-colors duration-200">
                    {iconKey && FeatureIcons[iconKey] && (() => {
                      const Icon = FeatureIcons[iconKey];
                      return <Icon className="w-full h-full" />;
                    })()}
                  </div>
                </div>
                <h3
                  className="text-sm font-black uppercase tracking-widest text-white mb-3"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-zinc-500 font-mono text-xs leading-relaxed">{desc}</p>
                <div className="mt-6 w-8 h-px bg-yellow-400/0 group-hover:bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="border-t border-zinc-800 bg-yellow-400 py-24 relative overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
          }}
        />
        {/* Ghost text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-black leading-none text-black/10 select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          GO
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2
              className="text-5xl sm:text-6xl font-black uppercase leading-none text-zinc-950"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              READY TO
              <br />
              DEPLOY
              <br />
              CONVERSO?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-0">
            <button
              onClick={() => router.push("/auth/signup")}
              className="relative group overflow-hidden bg-zinc-950 text-yellow-400 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-zinc-800 active:scale-[0.98] transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <span className="absolute inset-0 bg-white/5 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
              <span className="relative">CREATE FREE ACCOUNT →</span>
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="border-2 border-zinc-950 text-zinc-950 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-black/10 transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-zinc-950" />
            </div>
            <span
              className="text-white text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              CONVERSO
            </span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700">
            © {new Date().getFullYear()} CONVERSO. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700 hover:text-yellow-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}