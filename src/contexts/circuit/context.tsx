import { Circuit } from "@hazae41/echalote";
import fallbacks from "assets/fallbacks.json";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "utils/react/props";
import { useTor } from "../tor/context";

export const CircuitContext =
  createContext<Circuit | undefined>(undefined)

export function useCircuit() {
  return useContext(CircuitContext)!
}

export function CircuitProvider(props: ChildrenProps) {
  const { children } = props

  const tor = useTor()

  const [circuit, setCircuit] = useState<Circuit>()

  const onLoad = useCallback(async () => {
    if (!tor) return

    const circuit = await tor.create()

    const middle = fallbacks.find(it => it.id === "42A955B09A4E327FBFB46A08F6E21705271CCA12")!
    await circuit._extend(middle)

    const exit = fallbacks.find(it => it.id === "A868303126987902D51F2B6F06DD90038C45B119")!
    await circuit._extend(exit)

    setCircuit(circuit)
  }, [tor])

  useEffect(() => {
    if (tor) onLoad()
  }, [tor, onLoad])

  if (!circuit)
    return <>Creating a Tor circuit...</>

  return <CircuitContext.Provider value={circuit}>
    {children}
  </CircuitContext.Provider>
}