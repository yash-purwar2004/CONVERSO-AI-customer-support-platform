"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    number: "01",
    name: "STARTER",
    price: { monthly: 0, yearly: 0 },
    tag: "FREE FOREVER",
    tagColor: "bg-zinc-800 text-zinc-400",
    desc: "Perfect for individuals and small projects testing CONVERSO.",
    cta: "START FREE",
    ctaStyle: "border border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400",
    href: "/auth/signup",
    featured: false,
    features: [
      { label: "1 Bot", included: true },
      { label: "500 messages / month", included: true },
      { label: "1 website crawl", included: true },
      { label: "Basic analytics", included: true },
      { label: "Email support", included: false },
      { label: "Custom tone", included: false },
      { label: "API access", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    number: "02",
    name: "PRO",
    price: { monthly: 49, yearly: 39 },
    tag: "MOST POPULAR",
    tagColor: "bg-yellow-400 text-zinc-950",
    desc: "For growing businesses that need reliable AI support at scale.",
    cta: "GET STARTED",
    ctaStyle: "bg-yellow-400 text-zinc-950 hover:bg-yellow-300",
    href: "/auth/signup",
    featured: true,
    features: [
      { label: "5 Bots", included: true },
      { label: "10,000 messages / month", included: true },
      { label: "Unlimited crawls", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Email support", included: true },
      { label: "Custom tone", included: true },
      { label: "API access", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    number: "03",
    name: "ENTERPRISE",
    price: { monthly: 149, yearly: 119 },
    tag: "FULL POWER",
    tagColor: "bg-zinc-800 text-zinc-400",
    desc: "For large teams demanding maximum control, scale, and dedicated support.",
    cta: "CONTACT US",
    ctaStyle: "border border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400",
    href: "/contact",
    featured: false,
    features: [
      { label: "Unlimited Bots", included: true },
      { label: "Unlimited messages", included: true },
      { label: "Unlimited crawls", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Priority email support", included: true },
      { label: "Custom tone", included: true },
      { label: "API access", included: true },
      { label: "Dedicated support", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What counts as a message?",
    a: "Each customer query sent to your CONVERSO bot counts as one message. Bot responses do not count toward your limit.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes — all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "How does the website crawl work?",
    a: "CONVERSO crawls all publicly accessible pages on your domain and uses that content to train your bot. You can re-crawl anytime to keep your bot up to date.",
  },
  {
    q: "What is the API access for?",
    a: "Enterprise users can query their bot programmatically via REST API — useful for integrating CONVERSO into custom dashboards or internal tools.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-7 h-7 bg-yellow-400 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-zinc-950" />
            </div>
            <span className="text-white text-xl font-black uppercase tracking-widest" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              CONVERSO
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing"].map((item) => (
              <a key={item} href={item === "Pricing" ? "#" : `/#${item.toLowerCase().replace(/ /g, "-")}`}
                className={`text-[10px] font-mono tracking-[0.25em] uppercase transition-colors ${item === "Pricing" ? "text-yellow-400" : "text-zinc-500 hover:text-yellow-400"}`}>
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-0">
            <button onClick={() => router.push("/auth/login")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>LOG IN</button>
            <button onClick={() => router.push("/auth/signup")}
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-5 py-3 bg-yellow-400 text-zinc-950 hover:bg-yellow-300 transition-all font-black"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>SIGN UP →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
        }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />

        {/* Ghost text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Arial Black', sans-serif" }}>PRICE</div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="inline-flex items-center gap-3 border border-zinc-800 px-4 py-2 mb-10">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">Transparent Pricing</span>
          </div>
          <h1 className="text-7xl sm:text-8xl lg:text-[9rem] font-black uppercase leading-none mb-6"
            style={{ fontFamily: "'Arial Black', sans-serif" }}>
            SIMPLE.<br /><span className="text-yellow-400">HONEST.</span>
          </h1>
          <p className="text-zinc-400 text-lg font-mono max-w-lg leading-relaxed border-l-2 border-yellow-400 pl-5 mb-12">
            No hidden fees. No per-seat nonsense. Pick a plan, deploy your bot, start supporting customers.
          </p>

          {/* ── BILLING TOGGLE ── */}
          <div className="inline-flex items-center gap-0 border border-zinc-800">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 ${billing === "monthly" ? "bg-yellow-400 text-zinc-950" : "text-zinc-500 hover:text-white"}`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              MONTHLY
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 flex items-center gap-2 ${billing === "yearly" ? "bg-yellow-400 text-zinc-950" : "text-zinc-500 hover:text-white"}`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              YEARLY
              <span className={`text-[8px] px-1.5 py-0.5 font-black tracking-wider ${billing === "yearly" ? "bg-zinc-950 text-yellow-400" : "bg-zinc-800 text-zinc-400"}`}>
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-zinc-800">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-10 transition-all duration-200 group
                  ${i < 2 ? "lg:border-r border-b lg:border-b-0 border-zinc-800" : "border-b lg:border-b-0 border-zinc-800"}
                  ${plan.featured ? "bg-zinc-900/60" : "bg-zinc-950 hover:bg-zinc-900/30"}
                `}
              >
                {/* Featured top bar */}
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-yellow-400" />
                )}

                {/* Number + tag */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}>{plan.number}</span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 ${plan.tagColor}`}
                    style={{ fontFamily: "'Arial Black', sans-serif" }}>{plan.tag}</span>
                </div>

                {/* Plan name */}
                <h2 className="text-3xl font-black uppercase text-white mb-3"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}>{plan.name}</h2>

                {/* Price */}
                <div className="flex items-end gap-2 mb-4">
                  {plan.price.monthly === 0 ? (
                    <span className="text-5xl font-black text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>FREE</span>
                  ) : (
                    <>
                      <span className="text-5xl font-black text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        ${billing === "monthly" ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">/mo</span>
                    </>
                  )}
                </div>

                {/* Yearly note */}
                {billing === "yearly" && plan.price.monthly > 0 && (
                  <p className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest mb-4">
                    Billed ${plan.price.yearly * 12}/year
                  </p>
                )}

                {/* Desc */}
                <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase tracking-wide mb-8 border-l border-yellow-400/30 pl-3">
                  {plan.desc}
                </p>

                {/* Features */}
                <div className="flex-1 space-y-0 mb-10">
                  {plan.features.map(({ label, included }) => (
                    <div key={label} className={`flex items-center gap-3 py-2.5 border-b border-zinc-800/60`}>
                      {included ? (
                        <svg className="w-4 h-4 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 flex-shrink-0 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={`font-mono text-xs uppercase tracking-widest ${included ? "text-zinc-300" : "text-zinc-600"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.push(plan.href)}
                  className={`relative group/btn overflow-hidden w-full py-4 font-black text-sm uppercase tracking-[0.2em] transition-all duration-200 active:scale-[0.98] ${plan.ctaStyle}`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {plan.featured && (
                    <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover/btn:translate-x-[110%] transition-transform duration-500 skew-x-12" />
                  )}
                  <span className="relative">{plan.cta} →</span>
                </button>
              </div>
            ))}
          </div>

          {/* Trial note */}
          <div className="mt-6 flex items-center gap-3 justify-center">
            <div className="w-0.5 h-4 bg-yellow-400/40" />
            <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
              All paid plans include a 14-day free trial — no credit card required
            </p>
            <div className="w-0.5 h-4 bg-yellow-400/40" />
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-t border-zinc-800 py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-14">
            <div className="inline-block bg-yellow-400 px-3 py-1 mb-4">
              <span className="text-zinc-950 text-[10px] font-black tracking-[0.3em] uppercase" style={{ fontFamily: "'Arial Black', sans-serif" }}>Compare</span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-none text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              FULL<br />BREAKDOWN.
            </h2>
          </div>

          <div className="border border-zinc-800 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-6 w-1/2">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-600">Feature</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.name} className={`p-6 text-center border-l border-zinc-800 ${p.featured ? "bg-zinc-900/60" : ""}`}>
                      <span className="font-black text-xs uppercase tracking-widest text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>{p.name}</span>
                      {p.featured && <div className="w-full h-0.5 bg-yellow-400 mt-3 -mb-1" />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Bots", "1", "5", "Unlimited"],
                  ["Messages / month", "500", "10,000", "Unlimited"],
                  ["Website crawls", "1", "Unlimited", "Unlimited"],
                  ["Analytics", "Basic", "Advanced", "Advanced"],
                  ["Custom tone", "—", "✓", "✓"],
                  ["API access", "—", "—", "✓"],
                  ["Support", "—", "Email", "Priority"],
                  ["SLA guarantee", "—", "—", "✓"],
                ].map(([feature, ...vals], ri) => (
                  <tr key={feature} className={`border-b border-zinc-800 group hover:bg-yellow-400/5 transition-colors ${ri % 2 === 0 ? "" : "bg-zinc-900/20"}`}>
                    <td className="p-5 font-mono text-xs uppercase tracking-widest text-zinc-500">{feature}</td>
                    {vals.map((val, vi) => (
                      <td key={vi} className={`p-5 text-center border-l border-zinc-800 font-mono text-xs uppercase tracking-widest ${val === "—" ? "text-zinc-700" : "text-zinc-300"} ${plans[vi].featured ? "bg-zinc-900/30" : ""}`}>
                        {val === "✓" ? (
                          <svg className="w-4 h-4 text-yellow-400 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 py-28 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Left label */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="inline-block bg-yellow-400 px-3 py-1 mb-4">
                <span className="text-zinc-950 text-[10px] font-black tracking-[0.3em] uppercase" style={{ fontFamily: "'Arial Black', sans-serif" }}>FAQ</span>
              </div>
              <h2 className="text-4xl font-black uppercase leading-none text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                GOT<br />QUESTIONS?
              </h2>
              <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mt-4 leading-relaxed">
                Everything you need to know about CONVERSO pricing.
              </p>
            </div>

            {/* FAQ list */}
            <div className="flex-1 divide-y divide-zinc-800">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="group">
                  <button
                    className="w-full flex items-center justify-between py-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-black text-sm uppercase tracking-widest text-white pr-8 group-hover:text-yellow-400 transition-colors"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}>{q}</span>
                    <span className={`w-6 h-6 flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${openFaq === i ? "border-yellow-400 bg-yellow-400" : "border-zinc-700 group-hover:border-yellow-400"}`}>
                      <svg className={`w-3 h-3 transition-transform duration-200 ${openFaq === i ? "rotate-45 text-zinc-950" : "text-zinc-400"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                    <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase tracking-wide border-l-2 border-yellow-400/40 pl-4">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="border-t border-zinc-800 bg-yellow-400 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
        }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-black leading-none text-black/10 select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Arial Black', sans-serif" }}>START</div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase leading-none text-zinc-950" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              START FOR<br />FREE.<br />SCALE<br />LATER.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-0">
            <button onClick={() => router.push("/auth/signup")}
              className="relative group overflow-hidden bg-zinc-950 text-yellow-400 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-zinc-800 active:scale-[0.98] transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              <span className="absolute inset-0 bg-white/5 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
              <span className="relative">CREATE FREE ACCOUNT →</span>
            </button>
            <button onClick={() => router.push("/auth/login")}
              className="border-2 border-zinc-950 text-zinc-950 font-black text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-black/10 transition-all"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>SIGN IN</button>
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
            <span className="text-white text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Arial Black', sans-serif" }}>CONVERSO</span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700">© {new Date().getFullYear()} CONVERSO. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a key={item} href="#" className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-700 hover:text-yellow-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}