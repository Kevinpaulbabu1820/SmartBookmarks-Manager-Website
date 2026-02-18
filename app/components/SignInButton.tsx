"use client"

import { useCallback, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export default function SignInButton() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setUser(data.session?.user ?? null)
      setAuthReady(true)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!authReady) return
    if (user && pathname === "/") {
      router.replace("/dashboard")
    }
  }, [authReady, user, pathname, router])

  const signInWithGoogle = useCallback(async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          prompt: "select_account",
        },
      },
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    }
    // On success browser redirects; no need to setLoading(false).
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        alert(error.message)
        return
      }
      setUser(null)
      router.replace("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  if (!authReady) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-3 rounded-full bg-zinc-300 px-5 py-3 text-sm font-semibold text-white opacity-70"
      >
        Loading...
      </button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="truncate text-sm text-zinc-700 dark:text-zinc-300">{user.email}</span>
        <button
          onClick={signOut}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100"
        >
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signInWithGoogle}
      disabled={loading}
      aria-label="Sign in with Google"
      className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-sky-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" className="inline-block">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6 1.5 7.4 2.7l5.5-5.4C34.8 3.3 29.9 1.5 24 1.5 14.6 1.5 6.8 6.9 3.2 14.4l6.6 5.1C11.6 14.1 17.3 9.5 24 9.5z" />
        <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.5h12.7c-.6 3.2-2.6 5.7-5.6 7.3l6.2 4.8c3.6-3.3 5.2-8.5 5.2-15.7z" />
        <path fill="#4A90E2" d="M10.6 29.5a14.8 14.8 0 0 1 0-11l-6.6-5.1A24 24 0 0 0 1.5 24c0 3.8.9 7.4 2.5 10.6l6.6-5.1z" />
        <path fill="#FBBC05" d="M24 46.5c6 0 11-1.9 14.7-5.1l-6.2-4.8c-2 1.3-4.6 2.1-8.5 2.1-6.7 0-12.4-4.6-14.2-10.9l-6.6 5.1C6.8 41.5 14.6 46.5 24 46.5z" />
      </svg>
      <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  )
}
