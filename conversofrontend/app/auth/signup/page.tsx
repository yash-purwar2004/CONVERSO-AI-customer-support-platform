"use client";

import { useState } from "react";
import { signup } from "@/app/lib/auth";
import { saveAuth } from "@/app/utils/authStorage";
import { useRouter } from "next/navigation";

type Tone = "FORMAL" | "CASUAL" | "FRIENDLY" | "PROFESSIONAL";

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: "FORMAL", label: "Formal", desc: "Professional & structured" },
  { value: "CASUAL", label: "Casual", desc: "Relaxed & natural" },
  { value: "FRIENDLY", label: "Friendly", desc: "Warm & approachable" },
  { value: "PROFESSIONAL", label: "Professional", desc: "Formal & business-appropriate" },

];

const fields = [
  { name: "fullName",    label: "FULL NAME",     type: "text",     placeholder: "John Doe" },
  { name: "email",       label: "EMAIL",          type: "email",    placeholder: "john@company.com" },
  { name: "password",    label: "PASSWORD",       type: "password", placeholder: "••••••••••••" },
  { name: "companyName", label: "COMPANY NAME",   type: "text",     placeholder: "Acme Inc." },
  { name: "domain",      label: "WEBSITE DOMAIN", type: "text",     placeholder: "https://acme.com" },
];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading]           = useState(false);
  const [selectedTone, setSelectedTone] = useState<Tone>("CASUAL");
  const [focused, setFocused]           = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    try {
      const res = await signup({
        name:        form.fullName.value,
        email:       form.email.value,
        password:    form.password.value,
        companyName: form.companyName.value,
        domain:      form.domain.value,
        tone:        selectedTone,
      });
      saveAuth(res);
      router.push("/ingest");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* ── LEFT ACCENT PANEL ── */}
      <div className="hidden lg:flex w-1/2 relative bg-yellow-400 flex-col justify-between p-12 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px)," +
              "repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
          }}
        />

        {/* Ghost number */}
        <div
          className="absolute -bottom-10 -left-6 text-[22rem] font-black leading-none text-black/10 select-none pointer-events-none"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          01
        </div>

        {/* Top: badge + headline */}
        <div className="relative z-10">
          <div className="inline-block bg-black px-3 py-1 mb-8">
            <span className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase">
              CONVERSO Platform
            </span>
          </div>
          <h2
            className="text-6xl font-black text-black leading-none uppercase"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            BUILD
            <br />
            SOME
            <br />
            THING
            <br />
            GREAT.
          </h2>
        </div>

        {/* Bottom: divider + tagline */}
        <div className="relative z-10">
          <div className="w-full h-px bg-black/30 mb-6" />
          <p className="text-black/70 text-sm font-mono uppercase tracking-widest">
            Join thousands of companies already shipping faster.
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 relative overflow-y-auto">
        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-zinc-800 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-zinc-800 pointer-events-none" />

        <div className="max-w-md w-full mx-auto">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center">
                <div className="w-3 h-3 bg-zinc-950" />
              </div>
              <span className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase">
                New Account
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white uppercase leading-none"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              SIGN
              <br />
              <span className="text-yellow-400">UP.</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-0">

            {/* Text fields */}
            {fields.map(({ name, label, type, placeholder }, i) => (
              <div
                key={name}
                className={`border-t pt-4 pb-4 transition-colors duration-200 ${
                  focused === name ? "border-t-yellow-400" : "border-t-zinc-800"
                }`}
              >
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">
                  {String(i + 1).padStart(2, "0")} — {label}
                </label>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required
                  onFocus={() => setFocused(name)}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-white text-xl font-bold placeholder-zinc-700 outline-none focus:placeholder-zinc-600 transition-colors caret-yellow-400"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                />
              </div>
            ))}

            {/* Tone selector */}
            <div className="border-t border-zinc-800 pt-4 pb-4">
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-4">
                06 — AGENT TONE
              </label>
              <div className="grid grid-cols-2 gap-0">
                {TONES.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => setSelectedTone(tone.value)}
                    className={`relative p-4 border text-left transition-all duration-200 group ${
                      selectedTone === tone.value
                        ? "border-yellow-400 bg-yellow-400/5"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {/* Active dot */}
                    {selectedTone === tone.value && (
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-yellow-400" />
                    )}
                    <div
                      className={`font-black text-xs tracking-[0.2em] uppercase mb-1 ${
                        selectedTone === tone.value
                          ? "text-yellow-400"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {tone.label}
                    </div>
                    <div className="text-zinc-600 text-[10px] font-mono">{tone.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider before button */}
            <div className="border-t border-zinc-800 pt-8" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full relative group overflow-hidden font-black text-lg uppercase tracking-widest py-5 transition-all duration-200 ${
                loading
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-yellow-400 text-zinc-950 hover:bg-yellow-300 active:scale-[0.98]"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {!loading && (
                <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
              )}
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                    CREATING ACCOUNT...
                  </>
                ) : (
                  "CREATE ACCOUNT →"
                )}
              </span>
            </button>

            {/* Login link */}
            <p className="text-center text-zinc-600 text-xs font-mono tracking-widest uppercase mt-6">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-yellow-400 hover:text-yellow-300 transition-colors underline underline-offset-4"
              >
                Sign in
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}