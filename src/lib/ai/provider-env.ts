const PLACEHOLDER_PATTERNS = [
  /\.\.\./,
  /^your[_-]/i,
  /^replace[_-]?me$/i,
  /^changeme$/i,
];

export function getConfiguredSecret(name: string): string | null {
  const rawValue = process.env[name];
  if (typeof rawValue !== "string") return null;

  let value = rawValue.trim();

  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }

  if (!value) return null;
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value))) return null;

  return value;
}
