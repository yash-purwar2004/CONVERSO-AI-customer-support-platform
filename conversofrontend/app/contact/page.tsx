"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const contactOptions = [
  {
    number: "01",
    title: "SALES",
    desc: "Talk to our team about plans, custom pricing, or enterprise needs.",
    detail: "sales@CONVERSO.app",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "SUPPORT",
    desc: "Having an issue with your bot or account? We're here to help.",
    detail: "support@CONVERSO.app",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "PARTNERSHIPS",
    desc: "Interested in integrating with CONVERSO or exploring partnerships?",
    detail: "partners@CONVERSO.app",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const topics = ["General Inquiry", "Sales", "Technical Support", "Billing", "Partnership", "Press"];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const router = useRouter();
  const [focused, setFocused] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    // Simulate API call — replace with your real endpoint
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
  }

  const inputClass = (name: string) =>
    `w-full bg-transparent text-white text-xl font-bold placeholder-zinc-700 outline-none focus:placeholder-zinc-600 transition-colors caret-yellow-400`;

  const fieldWrap = (name: string) =>
    `border-t pt-4 pb-4 transition-colors duration-200 ${focused === name ? "border-t-yellow-400" : "border-t-zinc-800"}`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-7 h-7 bg-yellow-400 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-zinc-950" />
            </div>
            <span className="text-white text-xl font-black uppercase tracking-widest"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              CONVERSO
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Contact"].map((item) => (
              <a key={item}
                href={item === "Contact" ? "#" : item === "Pricing" ? "/pricing" : `/#${item.toLowerCase()}`}
                className={`text-[10px] font-mono tracking-[0.25em] uppercase transition-colors ${item === "Contact" ? "text-yellow-400" : "text-zinc-500 hover:text-yellow-400"}`}>
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-0">
            <button onClick={() => router.push("/login")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>LOG IN</button>
            <button onClick={() => router.push("/signup")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 bg-yellow-400 text-zinc-950 hover:bg-yellow-300 transition-all font-black"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>SIGN UP →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
        }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[16rem] font-black leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Arial Black', sans-serif" }}>TALK</div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 relative z-10">
          <div className="inline-flex items-center gap-3 border border-zinc-800 px-4 py-2 mb-10">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">Get In Touch</span>
          </div>
          <h1 className="text-7xl sm:text-8xl lg:text-[9rem] font-black uppercase leading-none"
            style={{ fontFamily: "'Arial Black', sans-serif" }}>
            LET&apos;S<br /><span className="text-yellow-400">TALK.</span>
          </h1>
          <p className="text-zinc-400 text-lg font-mono mt-6 max-w-lg leading-relaxed border-l-2 border-yellow-400 pl-5">
            We respond within 24 hours. No bots. No automated replies. A real human will get back to you.
          </p>
        </div>
      </section>

      {/* ── CONTACT OPTIONS STRIP ── */}
      <section className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {contactOptions.map(({ number, title, desc, detail, icon }) => (
              <div key={number} className="p-10 group hover:bg-yellow-400/5 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl font-black text-zinc-800 group-hover:text-yellow-400/50 transition-colors"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}>{number}</span>
                  <div className="text-zinc-700 group-hover:text-yellow-400 transition-colors">{icon}</div>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}>{title}</h3>
                <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase tracking-wide mb-4">{desc}</p>
                <a href={`mailto:${detail}`}
                  className="text-yellow-400 font-mono text-xs uppercase tracking-widest hover:text-yellow-300 transition-colors underline underline-offset-4">
                  {detail}
                </a>
                <div className="mt-5 w-8 h-px bg-yellow-400/0 group-hover:bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN FORM + SIDEBAR ── */}
      <section className="border-t border-zinc-800 py-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">

            {/* ── LEFT SIDEBAR ── */}
            <div className="lg:col-span-2 bg-yellow-400 p-12 relative overflow-hidden flex flex-col justify-between">
              {/* Grid texture */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
              }} />
              {/* Ghost number */}
              <div className="absolute -bottom-10 -left-6 text-[20rem] font-black leading-none text-black/10 select-none pointer-events-none"
                style={{ fontFamily: "'Arial Black', sans-serif" }}>05</div>

              <div className="relative z-10">
                <div className="inline-block bg-black px-3 py-1 mb-8">
                  <span className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase">CONVERSO Platform</span>
                </div>
                <h2 className="text-5xl font-black text-black leading-none uppercase"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  WE&apos;RE<br />LISTENING.<br />ALWAYS.
                </h2>
              </div>

              <div className="relative z-10 space-y-5">
                <div className="w-full h-px bg-black/30 mb-2" />
                {[
                  { n: "01", label: "Response within 24hrs" },
                  { n: "02", label: "Real humans, no bots" },
                  { n: "03", label: "Available Mon – Fri" },
                ].map(({ n, label }) => (
                  <div key={n} className="flex items-center gap-4">
                    <span className="text-black/50 text-xs font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>{n}</span>
                    <div className="flex-1 h-px bg-black/20" />
                    <span className="text-black/70 text-xs font-mono uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT FORM ── */}
            <div className="lg:col-span-3 p-10 lg:p-14 relative">
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-zinc-800 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-zinc-800 pointer-events-none" />

              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center">
                    <div className="w-3 h-3 bg-zinc-950" />
                  </div>
                  <span className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase">Send a Message</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-none"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  DROP US<br /><span className="text-yellow-400">A LINE.</span>
                </h2>
              </div>

              {/* Success state */}
              {formState === "success" ? (
                <div className="border border-yellow-400 bg-yellow-400/5 p-8 flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-yellow-400 font-black uppercase tracking-[0.25em] text-sm"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}>MESSAGE SENT</span>
                  </div>
                  <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed border-l-2 border-yellow-400/40 pl-4">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-yellow-400 transition-colors underline underline-offset-4"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    SEND ANOTHER →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    <div className={`${fieldWrap("name")} sm:pr-8`}>
                      <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">01 — FULL NAME</label>
                      <input name="name" placeholder="John Doe" required
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        className={inputClass("name")}
                        style={{ fontFamily: "'Arial Black', sans-serif" }} />
                    </div>
                    <div className={`${fieldWrap("email")} sm:pl-8 sm:border-l sm:border-l-zinc-800`}>
                      <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">02 — EMAIL</label>
                      <input name="email" type="email" placeholder="you@company.com" required
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        className={inputClass("email")}
                        style={{ fontFamily: "'Arial Black', sans-serif" }} />
                    </div>
                  </div>

                  {/* Company */}
                  <div className={fieldWrap("company")}>
                    <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">03 — COMPANY (OPTIONAL)</label>
                    <input name="company" placeholder="Acme Inc."
                      onFocus={() => setFocused("company")} onBlur={() => setFocused(null)}
                      className={inputClass("company")}
                      style={{ fontFamily: "'Arial Black', sans-serif" }} />
                  </div>

                  {/* Topic selector */}
                  <div className="border-t border-zinc-800 pt-4 pb-4">
                    <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-4">04 — TOPIC</label>
                    <div className="flex flex-wrap gap-0">
                      {topics.map((t) => (
                        <button key={t} type="button" onClick={() => setSelectedTopic(t)}
                          className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-150 mr-[-1px] mb-[-1px]
                            ${selectedTopic === t
                              ? "bg-yellow-400 text-zinc-950 border-yellow-400 z-10 relative"
                              : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white"
                            }`}
                          style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className={fieldWrap("message")}>
                    <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">05 — MESSAGE</label>
                    <textarea name="message" placeholder="Tell us what's on your mind..." required rows={5}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      className={`${inputClass("message")} resize-none leading-relaxed`}
                      style={{ fontFamily: "'Arial Black', sans-serif" }} />
                  </div>

                  {/* Info note */}
                  <div className="border-t border-zinc-800 pt-4 pb-6 flex items-start gap-3">
                    <div className="w-0.5 self-stretch bg-yellow-400/40 flex-shrink-0" />
                    <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase leading-relaxed">
                      We respect your privacy. Your info is never shared with third parties.
                    </p>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={formState === "loading"}
                    className={`w-full relative group overflow-hidden font-black text-lg uppercase tracking-widest py-5 transition-all duration-200
                      ${formState === "loading"
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-yellow-400 text-zinc-950 hover:bg-yellow-300 active:scale-[0.98]"
                      }`}
                    style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    {formState !== "loading" && (
                      <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
                    )}
                    <span className="relative flex items-center justify-center gap-3">
                      {formState === "loading" ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : "SEND MESSAGE →"}
                    </span>
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE / RESPONSE STRIP ── */}
      <section className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            {[
              {
                label: "RESPONSE TIME",
                value: "< 24 HRS",
                sub: "Business days",
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
              },
              {
                label: "AVAILABILITY",
                value: "MON – FRI",
                sub: "9AM – 6PM IST",
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                ),
              },
              {
                label: "BASED IN",
                value: "INDIA",
                sub: "Serving globally",
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ),
              },
            ].map(({ label, value, sub, icon }) => (
              <div key={label} className="p-10 group hover:bg-yellow-400/5 transition-colors">
                <div className="flex items-center gap-2 mb-4 text-zinc-700 group-hover:text-yellow-400 transition-colors">
                  {icon}
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">{label}</span>
                </div>
                <p className="text-3xl font-black text-white uppercase" style={{ fontFamily: "'Arial Black', sans-serif" }}>{value}</p>
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mt-1">{sub}</p>
              </div>
            ))}
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
            <span className="text-white text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>CONVERSO</span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700">© {new Date().getFullYear()} CONVERSO. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a key={item} href="#"
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700 hover:text-yellow-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}