export function clamp({ value, min, max }) {
  if (!isNaN(min) && value < min) return min;
  if (!isNaN(max) && value > max) return max;
  return value;
}
