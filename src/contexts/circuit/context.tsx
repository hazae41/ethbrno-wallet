import { Circuit } from "@hazae41/echalote";
import fallbacks from "assets/fallbacks.json";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { randomOf } from "utils/array";
import { ChildrenProps } from "utils/react/props";
import { useTor } from "../tor/context";

export const CircuitContext =
  createContext<Circuit | undefined>(undefined)

export function useCircuit() {
  return useContext(CircuitContext)!
}

const middles = [
  "720ABE4554C55EE6F6099491CA55D1F5550512C5",
  "D89267FB10BF625D31FF7687AF7D12B03BBF757C",
  "23BAB4A9B1B7F553599CD81AED553FACB7B35210",
  "FD449127D30D8F5D124653D9EF736EDF4A12B4DC",
  "D3A1B7DEF370CBC6055F3FC540A518C8576D7570",
]

const exits = [
  "4211FE6AA3991CFD9CD1CC897BD09C2CF73CF1F7",
  "4BA3C12B073B7E3F7977C46AF3638685BB89493F",
  "3749EECB5432FC91CEC2E62CD2AE097801ACF58E",
  "EF46C4D668872EA21E8A1967E9902D13B7E95263",
  "C85B30A8356E826418CB901254B7595FE1430619",
  "9E624E0E5EBA3156BFDA98AC703BCFF95E9A2FF6",
  "C8D207FE01D241F9AC86F2A2851CDC2E6998E51C",
  "BC06A4AE847DDC23FD63082E388BB30924DAB4B6"
]

export function CircuitProvider(props: ChildrenProps) {
  const { children } = props

  const tor = useTor()

  const [circuit, setCircuit] = useState<Circuit>()

  const onLoad = useCallback(async () => {
    if (!tor) return

    const circuit = await tor.create()

    const middleid = randomOf(middles)!
    const middle = fallbacks.find(it => it.id === middleid)!
    await circuit._extend(middle)

    console.log("middleid", middleid)

    const exitid = randomOf(exits)!
    const exit = fallbacks.find(it => it.id === exitid)!
    await circuit._extend(exit)

    console.log("exitid", exitid)

    setCircuit(circuit)
  }, [tor])

  useEffect(() => {
    if (tor) onLoad()
  }, [tor, onLoad])

  if (!circuit)
    return <div className="p-md flex flex-col items-center">
      <div className="h-2" />
      <div className="flex items-center gap-4">
        <span className="text-3xl text-center text-colored">
          Lunar Wallet
        </span>
        <img className="icon-xl"
          src="logo.svg" alt="logo" />
      </div>
      <div className="h-[150px]" />
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div className="h-[100px]" />
      <span className="text-2xl text-center">
        Creating a Tor circuit...
      </span>
      <div className="h-[20px]" />
      <span className="text-center text-contrast">
        It may take a few seconds, if freeze: close the extension window and open it again
      </span>
    </div>

  return <CircuitContext.Provider value={circuit}>
    {children}
  </CircuitContext.Provider>
}