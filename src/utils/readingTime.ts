// src/utils/readingTime.ts
export function estimateReadingTime(body: string): string {
  const wordsPerMinute = 200;
  if (!body) return '1 min read';
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes <= 1 ? '1 min read' : `${minutes} min read`;
}
