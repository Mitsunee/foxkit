import { fetch } from "./fetch.js";
import type { RequestInfo, RequestInit } from "node-fetch";

export async function fetchJson<ResponseType>(
  url: RequestInfo,
  init?: RequestInit
): Promise<ResponseType | false> {
  try {
    const resContent = await fetch(url, init);
    if (!resContent) return false;
    return (await resContent.json()) as ResponseType;
  } catch {
    return false;
  }
}
