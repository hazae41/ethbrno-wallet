import { Button } from "components/button";
import { Dialog } from "components/dialog";
import { Wallet } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useInputChange } from "utils/react/inputs";
import { CloseProps } from "utils/react/props";
import { dataPipe } from "utils/xswr/pipes";
import { WalletData } from "../data";
import { useWallets } from "./data";

interface Key {
  address: string,
  privateKey: string
}

async function generate() {
  await new Promise(ok => setTimeout(ok, 0)) // force async
  const { address, privateKey } = Wallet.createRandom()
  return { address, privateKey } as Key
}

export function WalletCreatorDialog(props: CloseProps) {
  const { close } = props
  const { mutate } = useWallets()

  const [name = "", setName] = useState<string>()
  const [key, setKey] = useState<Key>()

  const onNameChange = useInputChange(e => {
    setName(e.currentTarget.value)
  }, [])

  useEffect(() => {
    generate().then(setKey)
  }, [])

  const onDoneClick = useCallback(() => {
    if (!name || !key) return

    const { address, privateKey } = key
    const wallet: WalletData = { name, address, privateKey }
    mutate(dataPipe((prev = []) => [...prev, wallet]))

    close()
  }, [name, key, mutate, close])

  const Header =
    <h1 className="text-xl font-bold">
      New wallet
    </h1>

  const NameInput =
    <input className="p-mdl rounded-xl border border-contrast outline-none"
      placeholder="Enter a name"
      value={name} onChange={onNameChange} />

  const KeyDisplay = key && <>
    <div className="text-break">
      Address: {key.address}
    </div>
    <div className="text-break">
      Private key: {key.privateKey}
    </div>
  </>

  const DoneButton =
    <Button
      disabled={!name || !key}
      onClick={onDoneClick}>
      Save
    </Button>

  return <Dialog close={close}>
    {Header}
    <div className="h-2" />
    {NameInput}
    <div className="h-2" />
    {KeyDisplay}
    <div className="grow" />
    {DoneButton}
  </Dialog>
}