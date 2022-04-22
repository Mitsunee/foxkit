// clamp module
export interface ClampArgument {
  value: number;
  min?: number;
  max?: number;
}

export declare function clamp({ value, min, max }: ClampArgument): number;
export declare function isClamped({ value, min, max }: ClampArgument): boolean;

// range module
export interface RangeArgument {
  start?: number;
  step?: number;
  end?: number;
  length?: number;
}

export declare function range({
  start,
  end,
  step,
  length
}: RangeArgument): Array<number> | false;

// sleep module
export declare function sleep(time: number): Promise<void> | false;

// forEach module
interface ForEachArrCallback {
  <T>(value: T, index?: number, self?: Array<T>): void | false;
}
interface ForEachArr {
  <T>(subject: Array<T>, callback: ForEachArrCallback<T>): void;
}
interface ForEachObjCallback {
  <T>(value: unknown, key?: string, self?: T): void | false;
}
interface ForEachObj {
  <T>(subject: T, callback: ForEachObjCallback<T>): void;
}
interface ForEachStrCallback {
  (value: string, index?: number, self?: string): void | false;
}
interface ForEachStr {
  (subject: string, callback: ForEachStrCallback): void;
}
type ForEach = ForEachArr | ForEachObj | ForEachStr;
export declare function forEach(fn: ForEach);
