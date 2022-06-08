interface StableCompareFn<T> {
  (a: T, b: T): number;
}

export type StableCompareArgument<T> = string | StableCompareFn<T>;

export function stableCompare<T>(
  a: any,
  b: any,
  arg?: StableCompareArgument<T>
): number {
  switch (typeof arg) {
    case "string":
    case "number": {
      if (a[arg] < b[arg]) return -1;
      if (a[arg] > b[arg]) return 1;
      return 0;
    }
    case "function": {
      return arg(a, b);
    }
    default: {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  }
}
