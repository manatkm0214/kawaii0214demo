-- Apply once in Supabase SQL Editor before relying on Auth0 subject binding.
-- Adds stable Auth0-to-Supabase profile binding columns.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS auth0_sub TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_auth0_sub_unique
  ON profiles (auth0_sub)
  WHERE auth0_sub IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_email_lower
  ON profiles (lower(email))
  WHERE email IS NOT NULL;

COMMENT ON COLUMN profiles.auth0_sub IS 'Auth0 subject used for stable Auth0-to-Supabase profile binding.';
COMMENT ON COLUMN profiles.email IS 'Normalized email cached from Auth0 for compatibility lookup and support diagnostics.';
