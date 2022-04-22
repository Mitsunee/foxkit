export function sleep(time) {
  if (isNaN(time) || time <= 0) return false;
  return new Promise(resolve => setTimeout(resolve, time));
}
