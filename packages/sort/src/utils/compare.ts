interface CompareFn<T> {
  (a: T, b: T): number | boolean;
}

export type CompareArgument<T> = string | CompareFn<T>;

// TODO: add tests

// checks if a <= b
export function compare<T>(a: any, b: any, arg?: CompareArgument<T>): boolean {
  switch (typeof arg) {
    case "string":
    case "number": {
      return a[arg] <= b[arg];
    }
    case "function": {
      const res = arg(a, b);
      if (typeof res == "number") return res < 1;
      return res;
    }
    default:
      return a <= b;
  }
}
