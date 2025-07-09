// lib/ab-testing.ts
export function getVariant(testName: string, userId: string): 'A' | 'B' {
  const hash = hashCode(testName + userId);
  return hash % 2 === 0 ? 'A' : 'B';
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
