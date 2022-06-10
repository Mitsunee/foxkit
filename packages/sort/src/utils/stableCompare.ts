interface StableCompareFn<T> {
  (a: T, b: T): number;
}

export type StableCompareArgument<T> = string | StableCompareFn<T>;

export function createStableComparison<T>(
  arg?: StableCompareArgument<T>
): (a: any, b: any) => number {
  switch (typeof arg) {
    case "string":
    case "number": {
      return (a, b) => {
        if (a[arg] < b[arg]) return -1;
        if (a[arg] > b[arg]) return 1;
        return 0;
      };
    }
    case "function": {
      return arg;
    }
    default: {
      return (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };
    }
  }
}
