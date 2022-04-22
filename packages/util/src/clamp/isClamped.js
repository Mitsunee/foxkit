export function isClamped({ value, min, max }) {
  if ((!isNaN(min) && value < min) || (!isNaN(max) && value > max))
    return false;
  return true;
}
