import { Button } from "components/button";
import { Dialog } from "components/dialog";
import { Wallet } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useInputChange, useTextAreaChange } from "utils/react/events";
import { CloseProps } from "utils/react/props";
import { dataPipe } from "utils/xswr/pipes";
import { WalletData } from "../data";
import { useWallets } from "./data";

interface Key {
  address: string,
  privateKey: string
}

async function generateWallet() {
  await new Promise(ok => setTimeout(ok, 0)) // force async
  return Wallet.createRandom().privateKey
}

async function importWallet(privateKey: string) {
  await new Promise(ok => setTimeout(ok, 0)) // force async
  return new Wallet(privateKey)
}

export function WalletCreatorDialog(props: CloseProps) {
  const { close } = props
  const { mutate } = useWallets()

  const [name = "", setName] = useState<string>()

  const onNameChange = useInputChange(e => {
    setName(e.currentTarget.value)
  }, [])

  const [key = "", setKey] = useState<string>()

  const onKeyChange = useTextAreaChange(e => {
    setKey(e.currentTarget.value)
  }, [])

  useEffect(() => {
    generateWallet().then(setKey)
  }, [])

  const [wallet, setWallet] = useState<Wallet>()

  useEffect(() => {
    importWallet(key).then(setWallet)
  }, [key])

  const onDoneClick = useCallback(() => {
    if (!name || !wallet) return

    const { address, privateKey } = wallet
    const walletd: WalletData = { name, address, privateKey }
    mutate(dataPipe((prev = []) => [...prev, walletd]))

    close()
  }, [name, wallet, mutate, close])

  const Header =
    <h1 className="text-xl font-bold">
      New wallet
    </h1>

  const NameInput =
    <input className="p-mdl rounded-xl border border-contrast outline-none"
      placeholder="Enter a name"
      value={name} onChange={onNameChange} />

  const KeyInput =
    <textarea className="p-mdl rounded-xl border border-contrast outline-none resize-none"
      placeholder="Enter your private key"
      value={key} onChange={onKeyChange}
      rows={4} />

  const DoneButton =
    <Button
      disabled={!name || !wallet}
      onClick={onDoneClick}>
      Save
    </Button>

  return <Dialog close={close}>
    {Header}
    <div className="h-2" />
    {NameInput}
    <div className="h-2" />
    {KeyInput}
    <div className="grow" />
    {DoneButton}
  </Dialog>
}