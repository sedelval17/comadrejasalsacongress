/** Prefix local URLs for project-based hosting; external links and anchors stay intact. */
export function withBase(value: string): string {
  const prefix = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!value.startsWith('/') || value.startsWith('//') || !prefix) return value;
  if (value === prefix || value.startsWith(`${prefix}/`)) return value;
  return `${prefix}${value}`;
}

export function withoutBase(value: string): string {
  const prefix = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (prefix && (value === prefix || value.startsWith(`${prefix}/`))) return value.slice(prefix.length) || '/';
  return value;
}
