import { Button } from "components/button"
import { useBoolean } from "utils/react/boolean"
import { WalletRow } from "../row"
import { WalletCreatorDialog } from "./create"
import { useWallets } from "./data"

export function WalletsPage(props: {}) {
  const wallets = useWallets()
  const creator = useBoolean()

  const Header =
    <h1 className="text-xl font-bold">
      My wallets
    </h1>

  const CreateButton =
    <Button onClick={creator.enable}>
      Create wallet
    </Button>

  const WalletsList = wallets.data?.map(wallet =>
    <WalletRow
      key={wallet.address}
      wallet={wallet} />)

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
