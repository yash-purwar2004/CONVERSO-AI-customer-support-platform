"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IngestionApi } from "@/app/lib/ingestionApi";

export default function IngestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;

    try {
      await IngestionApi.ingestWebsite({ url: form.website.value });
      setMessage({ type: "success", text: "Crawl complete. Redirecting you to your API key..." });
      form.reset();
      setRedirecting(true);
      setTimeout(() => router.push("/publicapikey"), 1800);
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Ingestion failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* LEFT ACCENT PANEL */}
      <div className="hidden lg:flex w-1/2 relative bg-yellow-400 flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px)," +
              "repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
          }}
        />
        <div
          className="absolute -bottom-10 -left-6 text-[22rem] font-black leading-none text-black/10 select-none pointer-events-none"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          03
        </div>

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
            TRAIN
            <br />
            YOUR
            <br />
            BOT.
            <br />
            NOW.
          </h2>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="w-full h-px bg-black/30 mb-2" />
          {[
            { n: "01", label: "Name your bot" },
            { n: "02", label: "Point it to your website" },
            { n: "03", label: "CONVERSO crawls and learns" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-4">
              <span
                className="text-black/50 text-xs font-black"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                {n}
              </span>
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-black/70 text-xs font-mono uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 relative">
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
                Bot Setup
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white uppercase leading-none"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              CREATE
              <br />
              <span className="text-yellow-400">YOUR BOT.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-5 leading-relaxed border-l-2 border-yellow-400/40 pl-4">
              Point CONVERSO to your website. It crawls, learns, and is ready to support your customers instantly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Bot Name */}
            <div
              className={`border-t pt-4 pb-4 transition-colors duration-200 ${
                focused === "botName" ? "border-t-yellow-400" : "border-t-zinc-800"
              }`}
            >
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">
                01 — BOT NAME
              </label>
              <input
                name="botName"
                placeholder="CONVERSO Support Bot"
                required
                onFocus={() => setFocused("botName")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent text-white text-xl font-bold placeholder-zinc-700 outline-none focus:placeholder-zinc-600 transition-colors caret-yellow-400"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              />
            </div>

            {/* Website URL */}
            <div
              className={`border-t pt-4 pb-4 transition-colors duration-200 ${
                focused === "website" ? "border-t-yellow-400" : "border-t-zinc-800"
              }`}
            >
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">
                02 — WEBSITE URL
              </label>
              <input
                name="website"
                type="url"
                placeholder="https://yourwebsite.com"
                required
                onFocus={() => setFocused("website")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent text-white text-xl font-bold placeholder-zinc-700 outline-none focus:placeholder-zinc-600 transition-colors caret-yellow-400"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              />
            </div>

            {/* Info note */}
            <div className="border-t border-zinc-800 pt-4 pb-6 flex items-start gap-3">
              <div className="w-0.5 self-stretch bg-yellow-400/40 flex-shrink-0" />
              <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase leading-relaxed">
                CONVERSO will crawl all pages on your domain. This may take a few minutes depending on your site size.
              </p>
            </div>

            {/* Submit button */}
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
                    CRAWLING WEBSITE...
                  </>
                ) : (
                  "START CRAWLING →"
                )}
              </span>
            </button>

            {/* Feedback message */}
            {message && (
              <div
                className={`mt-6 border flex flex-col overflow-hidden ${
                  message.type === "success"
                    ? "border-yellow-400 bg-yellow-400/5"
                    : "border-red-500 bg-red-500/5"
                }`}
              >
                <div className="p-4 flex items-start gap-4">
                  {/* Icon */}
                  {message.type === "success" ? (
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-1.5 h-1.5 bg-red-500 mt-1.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-[10px] font-black uppercase tracking-[0.25em] mb-1 ${
                        message.type === "success" ? "text-yellow-400" : "text-red-400"
                      }`}
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {message.type === "success" ? "CRAWL COMPLETE" : "ERROR"}
                    </p>
                    <p className="text-zinc-400 font-mono text-xs leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                  {/* Redirecting spinner */}
                  {redirecting && (
                    <span className="inline-block w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin flex-shrink-0 mt-0.5" />
                  )}
                </div>

                {/* Animated progress bar on success */}
                {message.type === "success" && (
                  <div className="h-0.5 bg-yellow-400/20 w-full">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        animation: "progress 1.8s linear forwards",
                      }}
                    />
                  </div>
                )}

                <style>{`
                  @keyframes progress {
                    from { width: 0% }
                    to   { width: 100% }
                  }
                `}</style>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}