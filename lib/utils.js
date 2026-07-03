export function isPDF(url) {
  if (!url) return false;
  return url.toLowerCase().includes(".pdf");
}
