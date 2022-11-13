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
  "51374C8DA459C67329FFD5C7502CCAE4194910CC",
  "8DBEF8D824437770261B4C7453F2815DB7FC9165",
  "05C32C5EE14454E0C4CD81DAE0F3DC32F729DA4B",
  "31832D42A1B47E90970704FE6D7210D25FA1E5E3",
  "744855BFC9EB316D35879728BDA57C9A94E39257",
  "7A563F2DF40B0E9AB36AE57EFF99323F803F2428",
  "18F34AE6567F5FB081C4353D5EDA5CEE155810C4",
  "BDD09D5DB782B6023791DBFFD46F100B1F023ABB",
  "8F9CD937D0177BE8AC9E27D18604F93216DFA6A9",
  "6E3B4821305D96F167C392DBE5A13240D6CCE024"
]

const exits = [
  "4211FE6AA3991CFD9CD1CC897BD09C2CF73CF1F7",
  "4BA3C12B073B7E3F7977C46AF3638685BB89493F",
  "3749EECB5432FC91CEC2E62CD2AE097801ACF58E",
  "EF46C4D668872EA21E8A1967E9902D13B7E95263",
  "C85B30A8356E826418CB901254B7595FE1430619",
  "9E624E0E5EBA3156BFDA98AC703BCFF95E9A2FF6",
  "C8D207FE01D241F9AC86F2A2851CDC2E6998E51C",
  "BC06A4AE847DDC23FD63082E388BB30924DAB4B6",
  "DA3F6FB18CFC6037D66A447217F4C41FB191826B",
  "F7321B2AED66AECF07CB11880CC9453EB37B3828",
  "376DC7CAD597D3A4CBB651999CFAD0E77DC9AE8C"
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

    // const middle = randomOf(fallbacks)!

    console.log("middleid", middle.id)
    await circuit._extend(middle)

    const exitid = randomOf(exits)!
    const exit = fallbacks.find(it => it.id === exitid)!

    // const exit = randomOf(fallbacks.filter(it => it.exit))!

    console.log("exitid", exit.id)
    await circuit._extend(exit)

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