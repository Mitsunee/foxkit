import { ClampArg } from "./util";
import { isNum } from "../utils/isNum";

export function clamp({ value, min, max }: ClampArg): number {
  if (isNum(min) && value < min) return min;
  if (isNum(max) && value > max) return max;
  return value;
}
