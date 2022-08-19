type ValueOf<T> = T[keyof T];

export function pickByKey<T, K extends Array<keyof T>>(
  obj: T,
  keys: K
): Pick<T, K[number]> {
  function isPicked(key: any): key is ValueOf<K> {
    return keys.includes(key);
  }
  const entries = Object.entries(obj).filter(entry => {
    return isPicked(entry[0]);
  });
  return Object.fromEntries(entries) as Pick<T, K[number]>;
}
