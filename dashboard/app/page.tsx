import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black font-sans">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">S</div>
          <span className="font-semibold text-lg">Simplified</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <a href="#docs" className="hover:underline">Docs</a>
          <a href="#" className="rounded-full border px-4 py-2 text-sm">Sign in</a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50">
              Build powerful AI assistants in minutes.
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
              Connect your data, train a custom assistant, and deploy across chat, email
              and web — no infra hassle. Start for free and scale as you grow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-white font-medium shadow hover:bg-indigo-700"
              >
                Get Started — it's free
              </a>
              <a
                href="#docs"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-zinc-700 dark:text-zinc-200"
              >
                Read docs
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2">✅ Free plan</span>
              <span className="inline-flex items-center gap-2">⚡ Instant setup</span>
              <span className="inline-flex items-center gap-2">🔒 Secure by default</span>
            </div>
          </div>

          <div className="order-first md:order-last flex justify-center md:justify-end">
            <div className="w-[360px] md:w-[520px] rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-6 shadow-xl backdrop-blur">
              <div className="h-64 w-full rounded-md bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-zinc-400">
                {/* Placeholder for product screenshot */}
                <div className="text-center">
                  <div className="mb-2 text-sm">Live demo</div>
                  <div className="inline-block h-10 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Assistant • Sales</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Trained on your docs — responds with company knowledge.</div>
                </div>
                <div className="text-xs text-green-600 font-semibold">Connected</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="font-semibold">Connect your data</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Upload docs, connect databases, or point at URLs — we handle embeddings and updates.</p>
          </div>
          <div className="rounded-lg border p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="font-semibold">Custom assistants</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Create assistants tuned to your use-case with prompt templates and tools.</p>
          </div>
          <div className="rounded-lg border p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="font-semibold">Deploy anywhere</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">APIs, embed widgets, or ready-made chat — ship to web, mobile and internal tools.</p>
          </div>
        </section>

        <section id="footer" className="mt-20 border-t pt-8 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
              <div className="font-semibold">Simplified</div>
              <div className="mt-2">Build AI assistants faster.</div>
            </div>
            <div className="flex gap-6">
              <a href="#docs" className="hover:underline">Docs</a>
              <a href="#terms" className="hover:underline">Terms</a>
              <a href="#privacy" className="hover:underline">Privacy</a>
            </div>
          </div>
          <div className="mt-6">© {new Date().getFullYear()} Simplified — All rights reserved.</div>
        </section>
      </main>
    </div>
  );
}
