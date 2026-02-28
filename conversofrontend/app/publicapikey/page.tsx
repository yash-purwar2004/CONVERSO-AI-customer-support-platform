"use client";

import { useState, useEffect } from "react";
import { getAuth } from "@/app/utils/authStorage";

// Backend resolves tenantId from the JWT via TenantContext.
// Calls Spring Boot directly — Next.js has no /api/tenant route.
async function fetchPublicApiKey(): Promise<string> {
  const auth = getAuth(); // returns { token, tenantId, role } or null

  if (!auth) {
    throw new Error("No session found. Please log in again.");
  }

  const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

  const res = await fetch(`${BACKEND}/api/tenant/public-api-key`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (!res.ok) {
    // Guard against HTML error pages (Next.js 404, Spring Boot Whitelabel, etc.)
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      throw new Error(`Server returned an error page (${res.status}). Check that your backend is running at ${BACKEND}.`);
    }
    const body = await res.text().catch(() => "");
    throw new Error(body || `Request failed with status ${res.status}`);
  }

  return res.text();
}

export default function PublicApiKeyPage() {
  const [apiKey, setApiKey]     = useState<string | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [copied, setCopied]     = useState(false);
  const [revealed, setRevealed] = useState(false);

  function loadApiKey() {
    setError(null);
    setLoading(true);
    fetchPublicApiKey()
      .then(setApiKey)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to fetch API key")
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadApiKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCopy() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const maskedKey = apiKey
    ? apiKey.slice(0, 8) + "•".repeat(Math.max(0, apiKey.length - 12)) + apiKey.slice(-4)
    : null;

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
          04
        </div>

        {/* Top content */}
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
            YOUR
            <br />
            PUBLIC
            <br />
            API
            <br />
            KEY.
          </h2>
        </div>

        {/* Bottom: usage notes */}
        <div className="relative z-10 space-y-4">
          <div className="w-full h-px bg-black/30 mb-4" />
          {[
            { n: "01", label: "Embed in your frontend" },
            { n: "02", label: "Safe to expose publicly" },
            { n: "03", label: "Scoped to your tenant only" },
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

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 relative">
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
                API Credentials
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white uppercase leading-none"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              PUBLIC
              <br />
              <span className="text-yellow-400">API KEY.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-5 leading-relaxed border-l-2 border-yellow-400/40 pl-4">
              Use this key to authenticate your CONVERSO chat widget on your frontend. It is scoped to your tenant and safe to expose.
            </p>
          </div>

          {/* Key card */}
          <div className="space-y-0">
            <div className="border-t border-zinc-800 pt-4 pb-4">
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-3">
                01 — YOUR PUBLIC KEY
              </label>

              {/* Loading state */}
              {loading && (
                <div className="flex items-center gap-3 py-2">
                  <span className="inline-block w-4 h-4 border-2 border-zinc-700 border-t-yellow-400 rounded-full animate-spin" />
                  <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
                    Fetching key...
                  </span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="border border-red-500 bg-red-500/5 p-4 flex items-start gap-3 mt-2">
                  <div className="w-1.5 h-1.5 bg-red-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p
                      className="text-red-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      ERROR
                    </p>
                    <p className="text-zinc-400 font-mono text-xs leading-relaxed">{error}</p>
                    <button
                      onClick={loadApiKey}
                      className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-yellow-400 transition-colors underline underline-offset-4"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      RETRY →
                    </button>
                  </div>
                </div>
              )}

              {/* Key display */}
              {apiKey && !loading && (
                <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between gap-4">
                  <span
                    className="text-white font-mono text-sm break-all leading-relaxed flex-1 select-all"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {revealed ? apiKey : maskedKey}
                  </span>
                  {/* Reveal toggle */}
                  <button
                    type="button"
                    onClick={() => setRevealed((v) => !v)}
                    className="flex-shrink-0 text-zinc-600 hover:text-yellow-400 transition-colors"
                    title={revealed ? "Hide key" : "Reveal key"}
                  >
                    {revealed ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Key metadata */}
            {apiKey && !loading && (
              <div className="border-t border-zinc-800 pt-4 pb-6">
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-3">
                  02 — KEY INFO
                </label>
                <div className="space-y-2">
                  {[
                    { label: "Type",   value: "Public (safe to expose)" },
                    { label: "Scope",  value: "Tenant-scoped" },
                    { label: "Length", value: `${apiKey.length} characters` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">{label}</span>
                      <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info note */}
            <div className="border-t border-zinc-800 pt-4 pb-6 flex items-start gap-3">
              <div className="w-0.5 self-stretch bg-yellow-400/40 flex-shrink-0" />
              <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase leading-relaxed">
                Never share your private secret key. This public key is for client-side use only.
              </p>
            </div>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!apiKey || loading}
              className={`w-full relative group overflow-hidden font-black text-lg uppercase tracking-widest py-5 transition-all duration-200 ${
                !apiKey || loading
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : copied
                  ? "bg-zinc-800 text-yellow-400 cursor-default"
                  : "bg-yellow-400 text-zinc-950 hover:bg-yellow-300 active:scale-[0.98]"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {apiKey && !loading && !copied && (
                <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
              )}
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                    LOADING...
                  </>
                ) : copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    COPIED TO CLIPBOARD
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="0" strokeLinecap="round" strokeLinejoin="round" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    COPY API KEY →
                  </>
                )}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}