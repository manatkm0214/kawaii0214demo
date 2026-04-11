'use server'

export async function signUpWithAutoConfirm() {
  return {
    data: null,
    error: "Supabase Auth sign-up has been disabled. Use Auth0 login instead.",
  }
}

export async function signInWithPassword() {
  return {
    data: null,
    error: "Supabase Auth password login has been disabled. Use Auth0 login instead.",
  }
}
