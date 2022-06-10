interface CompareFn<T> {
  (a: T, b: T): number | boolean;
}

export type CompareArgument<T> = string | CompareFn<T>;

export function createComparison<T>(
  arg?: CompareArgument<T>
): (a: any, b: any) => boolean {
  switch (typeof arg) {
    case "string":
    case "number":
      return (a, b) => a[arg] <= b[arg];
    case "function": {
      return (a, b) => {
        const res = arg(a, b);
        if (typeof res == "number") return res < 1;
        return res;
      };
    }
    default:
      return (a, b) => a <= b;
  }
}
