import { Button } from "components/button";
import { Outline } from "components/icons";
import { useCircuit } from "contexts/circuit/context";
import { Wallet } from "ethers";
import { getAddress, hexValue, parseUnits } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { alertAsJson } from "utils/errors";
import { tryFloat } from "utils/ethers/bignum";
import { useAsyncTry } from "utils/react/async";
import { useInputChange } from "utils/react/events";
import { torrpcfetch } from "utils/tor/fetcher";
import { useBalance, useGasPrice, useNonce, useWallet } from "./data";

export function WalletPage(props: {}) {
  const router = useRouter()
  const circuit = useCircuit()

  const [, , address] = location.hash.split("/")

  const wallet = useWallet(address)
  const balance = useBalance(address, circuit)
  const nonce = useNonce(address, circuit)
  const gasPrice = useGasPrice(circuit)

  const [recipientInput = "", setRecipientInput] = useState<string>()

  const onRecipientInputChange = useInputChange(e => {
    setRecipientInput(e.currentTarget.value)
  }, [])

  const [valueInput = "", setValueInput] = useState<string>()

  const onValueInputChange = useInputChange(e => {
    setValueInput(e.currentTarget.value)
  }, [])

  const [txHash, setTxHash] = useState<string>()

  const trySend = useAsyncTry(async () => {
    if (!circuit) return

    if (!wallet.data) return
    if (!nonce.data) return
    if (!gasPrice.data) return

    const ewallet = new Wallet(wallet.data.privateKey)

    const gas = await torrpcfetch<string>({
      endpoint: "https://rpc.ankr.com/eth_goerli",
      method: "eth_estimateGas",
      params: [{
        chainId: hexValue(5),
        from: address,
        to: getAddress(recipientInput),
        value: hexValue(parseUnits(valueInput, 18)),
        nonce: hexValue(nonce.data),
        gasPrice: hexValue(gasPrice.data)
      }, "latest"]
    }, {}, circuit)

    if (gas.error) throw gas.error

    const tx = await torrpcfetch<string>({
      endpoint: "https://rpc.ankr.com/eth_goerli",
      method: "eth_sendRawTransaction",
      params: [await ewallet.signTransaction({
        chainId: 5,
        from: address,
        to: getAddress(recipientInput),
        value: parseUnits(valueInput, 18),
        nonce: nonce.data,
        gasPrice: gasPrice.data,
        gasLimit: gas.data
      })]
    }, {}, circuit)

    if (tx.error !== undefined) throw tx.error

    setTxHash(tx.data)

    balance.refetch()
    nonce.refetch()
  }, [circuit, address, nonce.data, gasPrice.data, recipientInput, valueInput], alertAsJson)

  const Header =
    <div className="flex items-center gap-2">
      <button onClick={router.back}>
        <Outline.ArrowLeftIcon className="icon-sm" />
      </button>
      <h1 className="text-xl font-bold">
        Send transaction
      </h1>
    </div>

  const AddressDisplay =
    <div className="text-break">
      Your address is {address}
    </div>

  const fbalance = (() => {
    if (balance.error)
      return "Error"
    if (!balance.data)
      return "..."
    return tryFloat(balance.data, 18)
  })()

  const BalanceDisplay =
    <div>
      You have {fbalance} ETH on Goerli
    </div>

  const RecipientInput = <>
    <h3 className="font-medium">
      Recipient
    </h3>
    <input className="py-2 px-4 bg-contrast rounded-xl"
      value={recipientInput}
      placeholder="0x..."
      onChange={onRecipientInputChange} />
  </>

  const ValueInput = <>
    <h3 className="font-medium">
      Value
    </h3>
    <input className="py-2 px-4 bg-contrast rounded-xl"
      value={valueInput}
      placeholder="1.0"
      onChange={onValueInputChange} />
  </>

  const TxHashDisplay =
    <div className="text-break">
      Transaction hash: {txHash}
    </div>

  const SendButton =
    <Button onClick={trySend.run}>
      {trySend.loading
        ? "Loading..."
        : "Send transaction"}
    </Button>

  return <main className="p-mdl h-full flex flex-col">
    {Header}
    <div className="h-2" />
    {AddressDisplay}
    <div className="h-2" />
    {BalanceDisplay}
    <div className="h-2" />
    {RecipientInput}
    <div className="h-2" />
    {ValueInput}
    <div className="grow" />
    {txHash && <>
      {TxHashDisplay}
      <div className="h-2" />
    </>}
    {SendButton}
  </main>
}