import { ClampArg } from "./util";
import { isNum } from "../utils/isNum";

export function isClamped({ value, min, max }: ClampArg): boolean {
  if ((isNum(min) && value < min) || (isNum(max) && value > max)) return false;
  return true;
}
