import { getSingleSchema, NormalizerMore, useQuery } from "@hazae41/xswr";
import { storage } from "utils/xswr/idb";
import { getWalletNormal, Wallet } from "../data";

export function getWalletsSchema() {
  async function normalizer(wallets: Wallet[], more: NormalizerMore) {
    return await Promise.all(wallets.map(wallet => getWalletNormal(wallet, more)))
  }

  return getSingleSchema<Wallet[], never>(
    `wallets`,
    undefined,
    { storage, normalizer })
}

export function useWallets() {
  return useQuery(getWalletsSchema, [])
}