# Security Deployment Notes

## Required database migration

Apply `supabase_auth0_profile_binding_migration.sql` once in the Supabase SQL Editor.
The app keeps a compatibility fallback so existing users are not locked out before the migration is applied.

After the migration is applied, new logins store `profiles.auth0_sub` and reuse that stable binding instead of relying on email lookup.

## Local secrets

Only `.env.local` should contain real local secrets.
`.env` and `.env.local.backup-*` are ignored and should not keep live values.
Use `.env.example` for sharing variable names.

Rotate any secret that was shared outside this machine, including Supabase service role, Auth0 client secret, Auth0 secret, provider API keys, and mail/API credentials.

## Service role boundary

`SUPABASE_SERVICE_ROLE_KEY` remains server-side only and is imported through `src/lib/supabase/admin.ts`, which is marked with `server-only`.
Routes that mutate user data must authenticate an Auth0 session, require same-origin requests, and scope database writes by the resolved app user id.

Longer term, the stronger design is to issue Supabase-compatible user JWTs and move these data routes to RLS-backed clients.
