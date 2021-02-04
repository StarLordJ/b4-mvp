export function formatNumber(numberToFormat: string | number): string {
  return Number(numberToFormat)
    .toLocaleString('en')
    .replace(/,/g, ' ');
}
