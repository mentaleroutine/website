/** Strip HTML tags and trim whitespace */
export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

/** Validate email format (RFC 5322 simplified) */
export function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/** Truncate string to max length */
export function clamp(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) : str;
}
