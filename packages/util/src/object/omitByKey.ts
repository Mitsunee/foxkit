type ValueOf<T> = T[keyof T];

export function omitByKey<T, K extends Array<keyof T>>(
  obj: T,
  keys: K
): Omit<T, K[number]> {
  function isOmitted(key: any): key is ValueOf<T> {
    return keys.includes(key);
  }
  const entries = Object.entries(obj).filter(entry => {
    return !isOmitted(entry[0]);
  });
  return Object.fromEntries(entries) as Omit<T, K[number]>;
}
