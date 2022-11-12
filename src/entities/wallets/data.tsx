import { Circuit } from "@hazae41/echalote"
import { FetcherMore, getSingleSchema, NormalizerMore, useError, useFetch, useQuery } from "@hazae41/xswr"
import { BigNumber } from "ethers"
import { alertAsJson } from "utils/errors"
import { RpcRequest, torrpcfetch } from "utils/tor/fetcher"
import { storage } from "utils/xswr/idb"

export type Wallet =
  | WalletRef
  | WalletData

export interface WalletProps {
  wallet: Wallet
}

export interface WalletDataProps {
  wallet: WalletData
}

export interface WalletRef {
  ref: true
  address: string
}

export interface WalletData {
  name: string,
  address: string,
  privateKey: string
}

export function getWalletSchema(address?: string) {
  return getSingleSchema<WalletData>(
    address && `wallet/${address}`,
    undefined, { storage })
}

export async function getWalletNormal(wallet: Wallet, more: NormalizerMore) {
  if ("ref" in wallet) return wallet
  const schema = getWalletSchema(wallet.address)
  await schema.normalize(wallet, more)
  return { ref: true, address: wallet.address } as WalletRef
}

export function useWallet(address?: string) {
  return useQuery(getWalletSchema, [address])
}

export function getBalanceSchema(address: string, circuit: Circuit) {
  async function fetcher(rpcreq: RpcRequest, more: FetcherMore) {
    const { data, error, ...other } = await torrpcfetch<string>(rpcreq, more, circuit)
    if (error) return { error, ...other }
    const data2 = BigNumber.from(data)
    return { data: data2, ...other }
  }

  return getSingleSchema<BigNumber>({
    endpoint: "https://rpc.ankr.com/eth_goerli",
    method: "eth_getBalance",
    params: [address, "latest"]
  }, fetcher)
}

export function useBalance(address: string, circuit: Circuit) {
  const query = useQuery(getBalanceSchema, [address, circuit])
  useFetch(query)
  useError(query, alertAsJson)
  return query
}

export function getNonceSchema(address: string, circuit: Circuit) {
  async function fetcher(rpcreq: RpcRequest, more: FetcherMore) {
    const { data, error, ...other } = await torrpcfetch<string>(rpcreq, more, circuit)
    if (error) return { error, ...other }
    const data2 = BigNumber.from(data)
    return { data: data2, ...other }
  }

  return getSingleSchema<BigNumber>({
    endpoint: "https://rpc.ankr.com/eth_goerli",
    method: "eth_getTransactionCount",
    params: [address, "latest"]
  }, fetcher)
}

export function useNonce(address: string, circuit: Circuit) {
  const query = useQuery(getNonceSchema, [address, circuit])
  useFetch(query)
  useError(query, alertAsJson)
  return query
}

export function getGasPriceSchema(circuit: Circuit) {
  async function fetcher(rpcreq: RpcRequest, more: FetcherMore) {
    const { data, error, ...other } = await torrpcfetch<string>(rpcreq, more, circuit)
    if (error) return { error, ...other }
    const data2 = BigNumber.from(data)
    return { data: data2, ...other }
  }

  return getSingleSchema<BigNumber>({
    endpoint: "https://rpc.ankr.com/eth_goerli",
    method: "eth_gasPrice",
    params: []
  }, fetcher)
}

export function useGasPrice(circuit: Circuit) {
  const query = useQuery(getGasPriceSchema, [circuit])
  useFetch(query)
  useError(query, alertAsJson)
  return query
}