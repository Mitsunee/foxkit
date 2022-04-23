import nodeFetch from "node-fetch";
import type { RequestInfo, RequestInit } from "node-fetch";

export async function fetch(url: RequestInfo, headers?: RequestInit) {
  try {
    const res = await nodeFetch(url, headers);
    if (!res.ok) return false;
    return res;
  } catch {
    return false;
  }
}
