"use client";

import { useState, useEffect } from "react";
import { getAuth } from "@/app/utils/authStorage";

async function fetchPublicApiKey(): Promise<string> {
  const auth = getAuth();
  if (!auth) throw new Error("No session found. Please log in again.");
  const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";
  const res = await fetch(`${BACKEND}/api/tenant/public-api-key`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
  });
  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("text/html"))
      throw new Error(`Server returned an error page (${res.status}). Check backend is running at ${BACKEND}.`);
    const body = await res.text().catch(() => "");
    throw new Error(body || `Request failed with status ${res.status}`);
  }
  return res.text();
}

// ── Snippet generators ────────────────────────────────────────────────────────
const configSnippet = (apiKey: string) => `const CONVERSO_CONFIG = {
  apiKey:     "${apiKey}",
  backendUrl: "https://your-CONVERSO-backend.com",  // ← change in production
  botName:    "My Assistant",
  greeting:   "Hi! How can I help you today?",
  position:   "bottom-right",                   // or "bottom-left"
};`;

const fetchSnippet = (apiKey: string, backend: string) => `fetch("${backend}/api/widget/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey:         "${apiKey}",
    conversationId: crypto.randomUUID(),  // one UUID per user session
    question:       "What is your return policy?",
  }),
})
  .then(r => r.json())
  .then(data => console.log(data.answer));`;

const embedSnippet = `<!-- Step 1: Add widget container before </body> -->
<div id="converso-widget-root"></div>

<!-- Step 2: Load CONVERSO widget script -->
<script src="https://cdn.CONVERSO.app/widget.js"></script>

<!-- Step 3: Configure with your API key (only 2 lines change per client) -->
<script>
  CONVERSOWidget.init({
    apiKey:  "YOUR_PUBLIC_API_KEY",  // ← paste your key here
    backend: "https://your-CONVERSO-backend.com",
  });
</script>`;

const curlSnippet = (apiKey: string, backend: string) => `curl -X POST ${backend}/api/widget/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey":         "${apiKey}",
    "conversationId": "550e8400-e29b-41d4-a716-446655440000",
    "question":       "Hello, what can you help me with?"
  }'`;

// ── Reusable components ───────────────────────────────────────────────────────
function CopyBtn({ text, label = "COPY" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  async function copy() { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }
  return (
    <button onClick={copy}
      className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 transition-all border
        ${ok ? "border-yellow-400 text-yellow-400 bg-yellow-400/10" : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"}`}
      style={{ fontFamily: "'Arial Black', sans-serif" }}>
      {ok
        ? <><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>COPIED</>
        : <><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>{label}</>}
    </button>
  );
}

function CodeBlock({ code, lang = "js", label }: { code: string; lang?: string; label: string }) {
  return (
    <div className="border border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-yellow-400 flex-shrink-0" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-zinc-700 uppercase">{lang}</span>
          <CopyBtn text={code} />
        </div>
      </div>
      <pre className="overflow-x-auto p-5 text-[11px] font-mono leading-relaxed text-zinc-300 bg-zinc-950/70" style={{ tabSize: 2 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-9 h-9 bg-yellow-400 flex items-center justify-center flex-shrink-0">
          <span className="text-zinc-950 text-xs font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>{n}</span>
        </div>
        <h3 className="text-white text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Arial Black', sans-serif" }}>{title}</h3>
      </div>
      <div className="ml-[52px] space-y-4">{children}</div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-0.5 self-stretch bg-yellow-400/40 flex-shrink-0 mt-0.5" />
      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">{children}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PublicApiKeyPage() {
  const [apiKey, setApiKey]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [copied, setCopied]   = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [tab, setTab] = useState<"html" | "fetch" | "config">("html");

  const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

  function loadApiKey() {
    setError(null); setLoading(true);
    fetchPublicApiKey()
      .then(setApiKey)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to fetch API key"))
      .finally(() => setLoading(false));
  }
  useEffect(() => { loadApiKey(); }, []); // eslint-disable-line

  async function handleCopy() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  const masked = apiKey ? apiKey.slice(0, 8) + "•".repeat(Math.max(0, apiKey.length - 12)) + apiKey.slice(-4) : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ════════════════════════ TOP: KEY DISPLAY ════════════════════════ */}
      <div className="flex min-h-[100vh]">

        {/* Left panel */}
        <div className="hidden lg:flex w-[400px] flex-shrink-0 relative bg-yellow-400 flex-col justify-between p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)" }} />
          <div className="absolute -bottom-10 -left-6 text-[22rem] font-black leading-none text-black/10 select-none pointer-events-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>04</div>
          <div className="relative z-10">
            <div className="inline-block bg-black px-3 py-1 mb-8">
              <span className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase">CONVERSO Platform</span>
            </div>
            <h2 className="text-6xl font-black text-black leading-none uppercase" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              YOUR<br />PUBLIC<br />API<br />KEY.
            </h2>
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-full h-px bg-black/30 mb-4" />
            {[
              { n: "01", label: "Embed in your frontend" },
              { n: "02", label: "Safe to expose publicly" },
              { n: "03", label: "Scoped to your tenant only" },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-4">
                <span className="text-black/50 text-xs font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>{n}</span>
                <div className="flex-1 h-px bg-black/20" />
                <span className="text-black/70 text-xs font-mono uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: key card */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-zinc-800 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-zinc-800 pointer-events-none" />
          <div className="max-w-lg w-full mx-auto">

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center"><div className="w-3 h-3 bg-zinc-950" /></div>
                <span className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase">API Credentials</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white uppercase leading-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                PUBLIC<br /><span className="text-yellow-400">API KEY.</span>
              </h1>
              <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-5 leading-relaxed border-l-2 border-yellow-400/40 pl-4">
                Use this key to authenticate your CONVERSO chat widget. Scoped to your tenant — safe to expose in client-side code.
              </p>
            </div>

            <div className="space-y-0">
              {/* Key display */}
              <div className="border-t border-zinc-800 pt-4 pb-4">
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-3">01 — YOUR PUBLIC KEY</label>
                {loading && (
                  <div className="flex items-center gap-3 py-2">
                    <span className="inline-block w-4 h-4 border-2 border-zinc-700 border-t-yellow-400 rounded-full animate-spin" />
                    <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Fetching key...</span>
                  </div>
                )}
                {error && (
                  <div className="border border-red-500 bg-red-500/5 p-4 flex items-start gap-3 mt-2">
                    <div className="w-1.5 h-1.5 bg-red-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>ERROR</p>
                      <p className="text-zinc-400 font-mono text-xs leading-relaxed">{error}</p>
                      <button onClick={loadApiKey} className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-yellow-400 transition-colors underline underline-offset-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>RETRY →</button>
                    </div>
                  </div>
                )}
                {apiKey && !loading && (
                  <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between gap-4">
                    <span className="text-white font-mono text-sm break-all leading-relaxed flex-1 select-all" style={{ letterSpacing: "0.05em" }}>
                      {revealed ? apiKey : masked}
                    </span>
                    <button type="button" onClick={() => setRevealed(v => !v)} className="flex-shrink-0 text-zinc-600 hover:text-yellow-400 transition-colors" title={revealed ? "Hide" : "Reveal"}>
                      {revealed
                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    </button>
                  </div>
                )}
              </div>

              {/* Key metadata */}
              {apiKey && !loading && (
                <div className="border-t border-zinc-800 pt-4 pb-6">
                  <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-3">02 — KEY INFO</label>
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

              <div className="border-t border-zinc-800 pt-4 pb-6 flex items-start gap-3">
                <div className="w-0.5 self-stretch bg-yellow-400/40 flex-shrink-0" />
                <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase leading-relaxed">
                  Never share your private secret key. This public key is for client-side use only.
                </p>
              </div>

              <button type="button" onClick={handleCopy} disabled={!apiKey || loading}
                className={`w-full relative group overflow-hidden font-black text-lg uppercase tracking-widest py-5 transition-all duration-200 ${
                  !apiKey || loading ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : copied ? "bg-zinc-800 text-yellow-400 cursor-default"
                  : "bg-yellow-400 text-zinc-950 hover:bg-yellow-300 active:scale-[0.98]"
                }`} style={{ fontFamily: "'Arial Black', sans-serif" }}>
                {apiKey && !loading && !copied && <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />}
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? <><span className="inline-block w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />LOADING...</>
                   : copied ? <><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>COPIED TO CLIPBOARD</>
                   : <><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="0" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>COPY API KEY →</>}
                </span>
              </button>

              {/* Scroll hint */}
              <div className="mt-8 flex items-center gap-3 justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => document.getElementById("integration-guide")?.scrollIntoView({ behavior: "smooth" })}>
                <div className="w-px h-8 bg-zinc-700" />
                <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.25em]">Integration guide below</span>
                <svg className="w-3 h-3 text-zinc-600 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════ INTEGRATION GUIDE ════════════════════════ */}
      <div id="integration-guide" className="border-t-4 border-yellow-400 bg-zinc-950">

        {/* Guide header */}
        <div className="bg-yellow-400 py-12 px-8 sm:px-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)" }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[12rem] font-black leading-none text-black/[0.07] select-none pointer-events-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>INTEGRATE</div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="inline-block bg-black px-3 py-1 mb-5">
              <span className="text-yellow-400 text-[10px] font-black tracking-[0.3em] uppercase" style={{ fontFamily: "'Arial Black', sans-serif" }}>Developer Guide</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-black uppercase leading-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              HOW TO<br />EMBED THE<br />CHATBOT.
            </h2>
            <p className="text-black/60 font-mono text-sm mt-4 max-w-lg uppercase tracking-wide">
              3 steps. Copy your key above, paste the snippet, ship it. Your bot is live.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto px-8 sm:px-16 py-16 space-y-16">

          {/* ── STEP 1 ── */}
          <Step n="01" title="Copy Your Public API Key">
            <Note>Your public API key is shown above. It is safe to include in any client-side code — HTML, JavaScript, React, Vue, or any frontend framework. It only grants access to your bot&apos;s chat endpoint, nothing else on your account.</Note>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-zinc-800">
              {[
                { icon: "🔑", title: "Public Key", desc: "Safe to expose in frontend code — no secret required" },
                { icon: "🏢", title: "Tenant Scoped", desc: "Only accesses data crawled for your account" },
                { icon: "🚫", title: "No Write Access", desc: "Widget can only read / respond, never modify data" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-6 border-b sm:border-b-0 sm:border-r border-zinc-800 last:border-0 hover:bg-zinc-900/40 transition-colors group">
                  <div className="text-2xl mb-3">{icon}</div>
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "'Arial Black', sans-serif" }}>{title}</p>
                  <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Step>

          <div className="border-t border-zinc-800" />

          {/* ── STEP 2 ── */}
          <Step n="02" title="Choose Your Integration Method">
            <Note>Pick whichever method matches your stack. All three send the same JSON request to the same endpoint under the hood.</Note>

            {/* Tabs */}
            <div className="flex items-center gap-0 border border-zinc-800 w-fit">
              {(["html", "fetch", "config"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all border-r border-zinc-800 last:border-r-0
                    ${tab === t ? "bg-yellow-400 text-zinc-950" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  {t === "html" ? "HTML Embed" : t === "fetch" ? "Fetch API" : "JS Config"}
                </button>
              ))}
            </div>

            {/* HTML tab */}
            {tab === "html" && (
              <>
                <CodeBlock label="Paste this snippet before </body> on any webpage" lang="html" code={embedSnippet} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-zinc-800 mt-4">
                  {[
                    { label: "Works with", value: "Any HTML site, WordPress, Shopify, Webflow" },
                    { label: "Build step", value: "None — plain script tag" },
                    { label: "CDN hosted", value: "Script loads from cdn.CONVERSO.app" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 border-b sm:border-b-0 sm:border-r border-zinc-800 last:border-0">
                      <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest">{value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Fetch API tab */}
            {tab === "fetch" && (
              <>
                {apiKey
                  ? <CodeBlock label="Call the chat API from any JavaScript" lang="js" code={fetchSnippet(apiKey, BACKEND)} />
                  : <div className="border border-zinc-800 p-8 text-center"><p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Load your API key above to see personalised snippet</p></div>
                }

                {/* Request schema */}
                <div className="border border-zinc-800 overflow-hidden mt-4">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                    <div className="w-1 h-4 bg-yellow-400" />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">Request Body — POST /api/widget/chat</span>
                  </div>
                  <div className="divide-y divide-zinc-800">
                    {[
                      { field: "apiKey",         type: "string", req: true,  desc: "Your public API key from this page" },
                      { field: "conversationId", type: "string", req: true,  desc: "UUID v4. Generate once per user session — threads the full conversation" },
                      { field: "question",       type: "string", req: true,  desc: "The user's message text to send to the bot" },
                    ].map(({ field, type, req, desc }) => (
                      <div key={field} className="flex flex-wrap items-start gap-x-6 gap-y-1 px-4 py-3 hover:bg-zinc-900/40 transition-colors">
                        <code className="text-yellow-400 font-mono text-[11px] w-36 flex-shrink-0">{field}</code>
                        <span className="text-zinc-600 font-mono text-[10px] w-12 flex-shrink-0 uppercase">{type}</span>
                        <span className={`font-mono text-[9px] uppercase tracking-widest w-16 flex-shrink-0 ${req ? "text-red-400" : "text-zinc-700"}`}>{req ? "required" : "optional"}</span>
                        <span className="text-zinc-500 font-mono text-[10px] leading-relaxed flex-1 min-w-[160px]">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response schema */}
                <div className="border border-zinc-800 overflow-hidden mt-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                    <div className="w-1 h-4 bg-green-500" />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">Response Body — 200 OK</span>
                  </div>
                  <div className="divide-y divide-zinc-800">
                    {[
                      { field: "answer",         type: "string", desc: "The bot's reply to the user's question" },
                      { field: "conversationId", type: "string", desc: "Echo of the conversationId you sent — use to correlate requests" },
                    ].map(({ field, type, desc }) => (
                      <div key={field} className="flex flex-wrap items-start gap-x-6 gap-y-1 px-4 py-3 hover:bg-zinc-900/40 transition-colors">
                        <code className="text-green-400 font-mono text-[11px] w-36 flex-shrink-0">{field}</code>
                        <span className="text-zinc-600 font-mono text-[10px] w-12 flex-shrink-0 uppercase">{type}</span>
                        <span className="text-zinc-500 font-mono text-[10px] leading-relaxed flex-1 min-w-[160px]">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Config tab */}
            {tab === "config" && (
              <>
                {apiKey
                  ? <CodeBlock label="JavaScript Config Object — drop this into your widget file" lang="js" code={configSnippet(apiKey)} />
                  : <div className="border border-zinc-800 p-8 text-center"><p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Load your API key above to see personalised snippet</p></div>
                }
                <div className="border border-zinc-800 overflow-hidden mt-4">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                    <div className="w-1 h-4 bg-yellow-400" />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">All Config Options</span>
                  </div>
                  <div className="divide-y divide-zinc-800">
                    {[
                      { field: "apiKey",     req: true,  def: "—",                       desc: "Your public API key. Required for every request." },
                      { field: "backendUrl", req: true,  def: "http://localhost:8081",    desc: "Your CONVERSO backend base URL. Update to production URL before going live." },
                      { field: "botName",    req: false, def: '"Assistant"',              desc: "Name shown in the chat widget header." },
                      { field: "greeting",   req: false, def: '"Hi! How can I help?"',   desc: "Opening message sent by the bot when the widget first opens." },
                      { field: "position",   req: false, def: '"bottom-right"',           desc: "Widget screen position. Options: bottom-right, bottom-left." },
                    ].map(({ field, req, def, desc }) => (
                      <div key={field} className="grid grid-cols-1 sm:grid-cols-[140px_80px_170px_1fr] gap-2 sm:gap-4 px-4 py-3 hover:bg-zinc-900/40 transition-colors items-start">
                        <code className="text-yellow-400 font-mono text-[11px]">{field}</code>
                        <span className={`font-mono text-[9px] uppercase tracking-widest ${req ? "text-red-400" : "text-zinc-700"}`}>{req ? "required" : "optional"}</span>
                        <code className="text-zinc-500 font-mono text-[10px]">{def}</code>
                        <span className="text-zinc-500 font-mono text-[10px] leading-relaxed">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Step>

          <div className="border-t border-zinc-800" />

          {/* ── STEP 3 ── */}
          <Step n="03" title="Test Before Going Live">
            <Note>Use cURL or Postman to verify your key works before embedding on your site. You should get an answer back within 1–2 seconds.</Note>
            {apiKey
              ? <CodeBlock label="cURL — run this in your terminal to test the API directly" lang="bash" code={curlSnippet(apiKey, BACKEND)} />
              : <div className="border border-zinc-800 p-8 text-center"><p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Load your API key above to see the cURL command</p></div>
            }

            {/* Expected vs errors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-zinc-800 mt-4">
              <div className="p-6 sm:border-r border-zinc-800">
                <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>✓ Expected 200 Response</p>
                <pre className="text-green-400 font-mono text-[11px] leading-relaxed bg-zinc-900/50 p-3 border border-zinc-800">{`{
  "answer": "Hi! I can help you with...",
  "conversationId": "550e8400-..."
}`}</pre>
              </div>
              <div className="p-6">
                <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>✗ Common Error Codes</p>
                <div className="space-y-3">
                  {[
                    { code: "401", msg: "Invalid or missing API key" },
                    { code: "403", msg: "CORS not configured on backend" },
                    { code: "404", msg: "Bot not found for this tenant" },
                    { code: "500", msg: "Backend not running or misconfigured" },
                  ].map(({ code, msg }) => (
                    <div key={code} className="flex items-center gap-4">
                      <span className="text-red-500 font-mono text-[11px] w-8 flex-shrink-0">{code}</span>
                      <div className="flex-1 h-px bg-zinc-800" />
                      <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Step>

          <div className="border-t border-zinc-800" />

          {/* ── QUICK REF ── */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <span className="text-zinc-400 text-xs font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>✦</span>
              </div>
              <h3 className="text-white text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Arial Black', sans-serif" }}>Quick Reference</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-800">
              {[
                { label: "Endpoint",      value: "POST /api/widget/chat",  sub: "No auth header — key in body" },
                { label: "Content-Type",  value: "application/json",       sub: "Always send JSON" },
                { label: "Conversation",  value: "crypto.randomUUID()",    sub: "One UUID per browser session" },
                { label: "Response field", value: "data.answer",           sub: "String — the bot reply" },
              ].map(({ label, value, sub }, i) => (
                <div key={label} className={`p-5 border-b sm:border-b-0 border-r border-zinc-800 last:border-r-0 hover:bg-zinc-900/40 transition-colors ${i === 0 ? "border-t-2 border-t-yellow-400" : "border-t-2 border-t-zinc-800"}`}>
                  <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.2em] mb-2">{label}</p>
                  <code className="text-yellow-400 font-mono text-[11px] block mb-2 break-all leading-relaxed">{value}</code>
                  <p className="text-zinc-700 font-mono text-[9px] uppercase tracking-widest leading-relaxed">{sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 py-8 px-8 sm:px-16">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <p className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest">
              Need help? <span className="text-yellow-400">support@CONVERSO.app</span>
            </p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-950" />
              </div>
              <span className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest">CONVERSO Platform</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}