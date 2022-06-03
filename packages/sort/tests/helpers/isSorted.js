export function isSorted(arr, key) {
  if (key) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][key] < arr[i - 1][key]) return false;
    }
    return true;
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

export function isReverseSorted(arr, key) {
  if (key) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][key] > arr[i - 1][key]) return false;
    }
    return true;
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) return false;
  }
  return true;
}
