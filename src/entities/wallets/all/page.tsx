import { ShieldCheckIcon } from "@heroicons/react/24/outline"
import { Button, ContrastTextButton } from "components/button"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useBoolean } from "utils/react/boolean"
import { OkProps } from "utils/react/props"
import { Wallet, WalletProps } from "../data"
import { WalletRow } from "../row"
import { WalletCreatorDialog } from "./create"
import { useWallets } from "./data"

export function WalletsPage(props: {}) {
  const router = useRouter()
  const wallets = useWallets()
  const creator = useBoolean()

  const onWalletClick = useCallback((wallet: Wallet) => {
    router.push(`/#/wallet/${wallet.address}`, undefined, {})
  }, [router])

  const Header = <div className="flex p-md text-colored rounded-b-xl border-b border-violet6 bg-violet2 justify-between">
    <ContrastTextButton className="w-[100px]">
      <span className="text-xs">
        Tor
      </span>
      <ShieldCheckIcon className="icon-xs text-grass8" />
    </ContrastTextButton>
    <ContrastTextButton className="w-full">
      <span className="text-xs">
        {"Goerli Tesnet"}
      </span>
    </ContrastTextButton>
    <ContrastTextButton className="w-[100px]">
      <span className="text-xs">
        ETHBrno
      </span>
    </ContrastTextButton>
  </div>

  const CreateButton =
    <Button onClick={creator.enable}>
      Create wallet
    </Button>

  const WalletsList = wallets.data?.map(wallet =>
    <ClickableWalletRow
      key={wallet.address}
      wallet={wallet}
      ok={onWalletClick} />)

  const Body =
    <ul className="grow flex flex-col gap-2">
      {WalletsList}
      <div className="grow" />
      <>{CreateButton}</>
    </ul>

  return <main className="p-mdl h-full flex flex-col">
    {creator.current &&
      <WalletCreatorDialog
        close={creator.disable} />}
    {Header}
    <div className="h-2" />
    {Body}
  </main>
}

export function ClickableWalletRow(props: WalletProps & OkProps<Wallet>) {
  const { ok, wallet } = props

  const onClick = useCallback(() => {
    ok(wallet)
  }, [ok, wallet])

  return <div className="cursor-pointer"
    onClick={onClick}>
    <WalletRow wallet={wallet} />
  </div>
}
