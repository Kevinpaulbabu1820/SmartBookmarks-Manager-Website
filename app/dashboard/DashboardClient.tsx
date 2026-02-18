"use client"

import { useEffect, useState, type FormEvent } from "react"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import SignInButton from "@/app/components/SignInButton"

const supabase = createClient()

type Bookmark = {
  id: string
  user_id: string
  title: string
  url: string
  created_at: string
}

export default function DashboardClient() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) return router.replace("/")
      setUser(u)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      if (!u) router.replace("/")
      else setUser(u)
    })

    return () => subscription.unsubscribe()
  }, [router])

  useEffect(() => {
    if (!user) return
    let mounted = true

    const load = async () => {
      setError(null)
      try {
        const { data, error } = await supabase
          .from("bookmarks")
          .select("id,user_id,title,url,created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (!mounted) return
        if (error) {
          setError(error.message)
          return
        }
        setBookmarks((data ?? []) as Bookmark[])
      } catch (err) {
        if (!mounted) return
        setError((err as Error).message ?? "Failed to load bookmarks")
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [user])

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const addBookmark = async (e?: FormEvent) => {
    e?.preventDefault()
    setError(null)

    if (!user) return setError("Not signed in")
    if (!title.trim() || !url.trim()) return setError("Title and URL are required")
    if (!isValidUrl(url.trim())) return setError("Please enter a valid URL (include https://)")

    setSaving(true)

    const { data, error: insertErr } = await supabase
      .from("bookmarks")
      .insert({ user_id: user.id, title: title.trim(), url: url.trim() })
      .select()
      .single()

    setSaving(false)

    if (insertErr) {
      setError(insertErr.message)
      return
    }

    setBookmarks((prev) => [data as Bookmark, ...prev])
    setTitle("")
    setUrl("")
  }

  const deleteBookmark = async (id: string) => {
    if (!user) return setError("Not signed in")
    setError(null)
    setDeletingId(id)

    const { error: deleteErr } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    setDeletingId(null)

    if (deleteErr) {
      setError(deleteErr.message)
      return
    }

    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-zinc-50 py-12 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl rounded-lg bg-white p-8 shadow dark:bg-zinc-900">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Signed in as <strong>{user?.email}</strong>
            </p>
          </div>
          <div className="hidden sm:block">
            <SignInButton />
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-medium">Add a bookmark</h2>

          <form onSubmit={addBookmark} className="mt-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="col-span-2 rounded-md border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="col-span-2 rounded-md border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-1"
            />
            <div className="flex gap-2 sm:col-span-1">
              <button
                type="submit"
                disabled={saving}
                className="ml-auto inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:opacity-95 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("")
                  setUrl("")
                  setError(null)
                }}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Clear
              </button>
            </div>
          </form>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Your bookmarks</h2>
          <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
            {bookmarks.length === 0 ? (
              <div className="py-6 text-center text-sm text-zinc-500">No bookmarks yet - add one above.</div>
            ) : (
              bookmarks.map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <a href={b.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">
                      {b.title}
                    </a>
                    <div className="text-xs text-zinc-500">{b.url}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs text-zinc-400">{new Date(b.created_at).toLocaleString()}</div>
                    <button
                      type="button"
                      onClick={() => deleteBookmark(b.id)}
                      disabled={deletingId === b.id}
                      className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === b.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
