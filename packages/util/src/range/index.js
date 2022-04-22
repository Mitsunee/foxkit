export function range({ start = 0, step = 1, end, length }) {
  if ((isNaN(end) && isNaN(length)) || !step) return false; // prevent infinite loop from missing args

  const arr = new Array();
  for (
    let i = start;
    (isNaN(end) ? true : step > 0 ? i <= end : i >= end) &&
    (isNaN(length) ? true : arr.length < length);
    i += step
  ) {
    arr.push(i);
  }

  return arr;
}
