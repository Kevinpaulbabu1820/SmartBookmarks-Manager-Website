"use client"

import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import SignInButton from "@/app/components/SignInButton"
import DashboardClient from "./DashboardClient"

const supabase = createClient()

export default function Page() {
  return <DashboardClient />
}
