import { OppositeTextButton } from "components/button";
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
    <h1 className="text-xl font-bold text-colored">
      New wallet
    </h1>

  const NameInput =
    <input className="p-mdl rounded-xl border border-default outline-violet6"
      placeholder="Enter a name"
      value={name} onChange={onNameChange} />

  const KeyInput =
    <textarea className="p-mdl rounded-xl border border-default outline-violet6 resize-none"
      placeholder="Enter your private key"
      value={key} onChange={onKeyChange}
      rows={4} />

  const Info =
    <span className="text-contrast text-sm">
      {"We have generated a new private key, just enter the name and add to create a new wallet."}
    </span>

  const Info2 =
    <span className="text-contrast text-sm">
      {"You can also enter an existing private key to import an existent wallet."}
    </span>

  const DoneButton =
    <OppositeTextButton
      disabled={!name || !wallet}
      onClick={onDoneClick}>
      Add
    </OppositeTextButton>

  return <Dialog close={close}>
    {Header}
    <div className="h-2" />
    {NameInput}
    <div className="h-2" />
    {KeyInput}
    <div className="h-2" />
    {Info}
    <div className="h-2" />
    {Info2}
    <div className="grow" />
    <div className="">
      {DoneButton}
    </div>
    <div className="h-1" />
  </Dialog>
}