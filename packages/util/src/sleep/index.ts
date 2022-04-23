import { isNum } from "../utils/isNum";

export function sleep(time: number): Promise<void> | false {
  if (!isNum(time) || time <= 0) return false;
  return new Promise(resolve => setTimeout(resolve, time));
}
