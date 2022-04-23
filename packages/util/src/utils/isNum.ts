export function isNum(n: any): n is number {
  return !isNaN(n);
}
