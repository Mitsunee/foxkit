import { fetch } from "./fetch.js";
import { fetchJson } from "./fetchJson.js";
import type { RequestInfo, RequestInit, Response } from "node-fetch";

type ReqItem = string | [RequestInfo] | [RequestInfo, RequestInit];
type ResultItem<T> = T | Response | false;
type PromisedResultItem<T> = Promise<ResultItem<T>>;

function handleReq<ResponseType>(
  req: ReqItem,
  json?: boolean
): PromisedResultItem<ResponseType> {
  if (typeof req === "string") {
    return json ? fetchJson<ResponseType>(req) : fetch(req);
  }

  const [url, init] = req;
  return json ? fetchJson<ResponseType>(url, init) : fetch(url, init);
}

export async function fetchAll<ResponseType>(
  req: Array<ReqItem>,
  { limit = false, json = false }: { limit?: false | number; json?: boolean }
): Promise<ResultItem<ResponseType>[]> {
  const safeLimit = isNaN(+limit) ? 0 : +limit;

  if (!limit || req.length < safeLimit) {
    return Promise.all(req.map(_req => handleReq<ResponseType>(_req, json)));
  }

  const res: ResultItem<ResponseType>[] = new Array();

  for (let i = 0; i < req.length; i += safeLimit) {
    const these = await Promise.all(
      req.slice(i, +limit + i).map(_req => handleReq<ResponseType>(_req, json))
    );
    res.push(...these);
  }

  return res;
}
