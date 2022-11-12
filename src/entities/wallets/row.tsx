import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useWallet, WalletProps } from "./data"

export function WalletRow(props: WalletProps) {
  const wallet = useWallet(props.wallet.address)

  if (!wallet.data) return null

  const First =
    <div className="flex">
      <h2 className="truncate">
        {wallet.data.name}
      </h2>
    </div>

  const Second =
    <div className="text-contrast truncate">
      {wallet.data.address}
    </div>

  return <div className="p-md flex items-center gap-2 rounded-xl bg-component border border-default">
    <div className="truncate">
      {First}
      {Second}
    </div>
    <ChevronRightIcon className="icon-sm shrink-0" />
  </div>
}