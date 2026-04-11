import { auth0 } from "@/lib/auth0"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export interface AppSessionUser {
  auth0Sub: string
  email: string
  name: string | null
  picture: string | null
  supabaseUserId: string
}

async function findSupabaseAuthUserByEmail(email: string) {
  const supabaseAdmin = getSupabaseAdmin()
  let page = 1

  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 100,
    })

    if (error) {
      throw new Error(`Could not look up Supabase auth user: ${error.message}`)
    }

    const match = data.users.find((user) => user.email?.trim().toLowerCase() === email)
    if (match) {
      return {
        id: match.id,
        email: match.email ?? email,
      }
    }

    if (data.users.length < 100) {
      break
    }

    page += 1
  }

  return null
}

async function ensureSupabaseAuthUser(email: string, name: string | null) {
  const supabaseAdmin = getSupabaseAdmin()
  const existing = await findSupabaseAuthUserByEmail(email)
  if (existing?.id) {
    return existing.id
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: name ? { name } : undefined,
  })

  if (error || !data.user) {
    throw new Error(`Could not create Supabase auth user: ${error?.message ?? "Unknown error"}`)
  }

  return data.user.id
}

async function ensureProfile(userId: string, name: string | null) {
  const supabaseAdmin = getSupabaseAdmin()
  const { error } = await supabaseAdmin.from("profiles").upsert(
    {
      id: userId,
      display_name: name,
    } as never,
    { onConflict: "id" }
  )

  if (error) {
    throw new Error(`Could not prepare profile: ${error.message}`)
  }
}

export async function getAppSessionUser(): Promise<AppSessionUser | null> {
  const session = await auth0.getSession()
  if (!session?.user) {
    return null
  }

  const email = typeof session.user.email === "string" ? session.user.email.trim().toLowerCase() : ""
  if (!email) {
    throw new Error("Auth0 session is missing an email address")
  }

  const name = typeof session.user.name === "string" && session.user.name.trim() ? session.user.name.trim() : null
  const picture = typeof session.user.picture === "string" && session.user.picture.trim() ? session.user.picture : null
  const supabaseUserId = await ensureSupabaseAuthUser(email, name)
  await ensureProfile(supabaseUserId, name)

  return {
    auth0Sub: session.user.sub,
    email,
    name,
    picture,
    supabaseUserId,
  }
}
