import { useWallet, WalletProps } from "./data"

export function WalletRow(props: WalletProps) {
  const wallet = useWallet(props.wallet.address)

  if (!wallet.data) return null

  const First =
    <h2 className="truncate">
      {wallet.data.name}
    </h2>

  const Second =
    <div className="text-contrast truncate">
      {wallet.data.address}
    </div>

  return <div className="p-md rounded-xl border border-contrast">
    {First}
    {Second}
  </div>
}