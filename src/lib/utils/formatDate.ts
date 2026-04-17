export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Already formatted like "2024" or "Jan 2024" — return as-is
  return dateStr;
}

export function formatDateRange(start: string, end?: string): string {
  if (!start) return '';
  return end ? `${start} — ${end}` : `${start} — Present`;
}
