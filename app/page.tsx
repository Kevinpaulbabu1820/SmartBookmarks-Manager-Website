import SignInButton from './components/SignInButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 dark:from-black dark:via-zinc-900 dark:to-zinc-950">
      <header className="container mx-auto max-w-6xl px-6 py-8 flex items-center justify-between">
        <div className="text-lg font-semibold">Smart Bookmarks</div>
        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm text-zinc-600 hover:text-black dark:hover:text-white">Features</a>
          {/* <a href="/dashboard" className="text-sm text-zinc-600 hover:text-black dark:hover:text-white">Dashboard</a> */}
          <div className="hidden sm:block">
            <SignInButton />
          </div>
        </nav>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-black dark:text-white">Save. Organize. Access — smarter bookmarks.</h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">Save links, organize with tags, and access your favorites from anywhere. Sign in with Google to get started — it’s fast and secure.</p>

            <div className="mt-8 flex items-center gap-4">
              <div className="sm:hidden"><SignInButton /></div>
              <a href="#features" className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-700 bg-white/60 border border-zinc-200 rounded-full hover:bg-zinc-50 transition">Learn more</a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-semibold">3k+</div>
                <div className="text-sm text-zinc-500">Bookmarks saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">1.2k</div>
                <div className="text-sm text-zinc-500">Active users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">99%</div>
                <div className="text-sm text-zinc-500">Uptime</div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 ring-1 ring-zinc-100 dark:ring-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium text-zinc-500">Recent bookmarks</div>
                  <div className="text-lg font-semibold">Saved items</div>
                </div>
                <div className="text-sm text-zinc-400">⋯</div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-linear-to-br from-rose-400 to-yellow-400 flex items-center justify-center text-white font-semibold">G</div>
                  <div>
                    <div className="text-sm font-medium">Google Fonts</div>
                    <div className="text-xs text-zinc-500">fonts.google.com</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-linear-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white font-semibold">N</div>
                  <div>
                    <div className="text-sm font-medium">Next.js Docs</div>
                    <div className="text-xs text-zinc-500">nextjs.org</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-semibold">S</div>
                  <div>
                    <div className="text-sm font-medium">Supabase</div>
                    <div className="text-xs text-zinc-500">supabase.com</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
                <div>Recently saved</div>
                <div>Sync now</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-indigo-600">🔎</div>
            <h3 className="mt-4 font-semibold">Fast search</h3>
            <p className="mt-2 text-sm text-zinc-500">Find bookmarks instantly with tags and full-text search.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-amber-500">📂</div>
            <h3 className="mt-4 font-semibold">Organize easily</h3>
            <p className="mt-2 text-sm text-zinc-500">Tags, collections and notes help you keep things tidy.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-emerald-500">🔒</div>
            <h3 className="mt-4 font-semibold">Private & secure</h3>
            <p className="mt-2 text-sm text-zinc-500">Your data stays private — powered by Supabase auth.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-8">
        <div className="container mx-auto px-6 max-w-6xl text-center text-sm text-zinc-500">© {new Date().getFullYear()} Smart Bookmarks</div>
      </footer>
    </div>
  )
}
