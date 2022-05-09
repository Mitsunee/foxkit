export function typeOf(subject: any): string {
  if (subject === undefined || subject === null) return `${subject}`;
  return subject?.constructor?.name?.toLowerCase() || "unknown";
}
