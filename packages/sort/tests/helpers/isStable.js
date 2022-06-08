export function isStable(arr, key) {
  for (let i = 1; i < arr.length; i++) {
    const curr = arr[i];
    const prev = arr[i - 1];
    if (curr[key] == prev[key] && curr.idx <= prev.idx) return false;
  }
  return true;
}
