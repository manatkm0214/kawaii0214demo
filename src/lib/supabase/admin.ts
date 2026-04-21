import "server-only"

import { createClient } from "@supabase/supabase-js"

type SupabaseAdminClient = ReturnType<typeof createClient>

let cachedAdminClient: SupabaseAdminClient | null = null

function createSupabaseAdminClient(): SupabaseAdminClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set")
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set")
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function getSupabaseAdmin(): SupabaseAdminClient {
  if (!cachedAdminClient) {
    cachedAdminClient = createSupabaseAdminClient()
  }

  return cachedAdminClient
}
