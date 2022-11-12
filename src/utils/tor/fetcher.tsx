import { Circuit } from "@hazae41/echalote"
import { FetcherMore, Result } from "@hazae41/xswr"

export type SubFetcher =
  (info: RequestInfo, init?: RequestInit) => Promise<Response>

export async function fetchAsJson<T>(info: RequestInfo, init?: RequestInit, subfetch: SubFetcher = fetch) {
  const res = await subfetch(info, init)

  if (!res.ok) {
    const error = new Error(`${await res.text()}`)
    return { error }
  }

  const data = await res.json() as T
  return { data }
}

export interface RpcRequest<T extends [] = any> {
  endpoint: string,
  method: string,
  params: T
}

export type RpcResponse<T = any> =
  | RpcOkResponse<T>
  | RpcErrResponse

export interface RpcOkResponse<T = any> {
  result: T
  error?: undefined
}

export interface RpcErrResponse {
  result?: undefined
  error: { message: string }
}

export async function rpcfetch<T>(rpcreq: RpcRequest, more: FetcherMore = {}, subfetch: SubFetcher = fetch): Promise<Result<T>> {
  const { signal, cache } = more
  const { endpoint, method, params } = rpcreq
  const body = JSON.stringify({ endpoint, jsonrpc: "2.0", id: 1, method, params })
  const headers = new Headers({ "Content-Type": "application/json" })
  const init = { method: "POST", body, headers, signal, cache }
  const { data, error, ...others } = await fetchAsJson<RpcResponse<T>>("http://proxy.sunship.ml", init, subfetch)

  if (error) {
    return { error, ...others }
  }

  if (data.error) {
    const error = new Error(data.error.message)
    return { error, ...others }
  }

  return { data: data.result }
}

export async function torrpcfetch<T>(rpcreq: RpcRequest, more: FetcherMore = {}, circuit: Circuit) {
  return await rpcfetch<T>(rpcreq, more, circuit.fetch.bind(circuit))
}