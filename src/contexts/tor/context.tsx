import { TlsOverHttp, Tor } from "@hazae41/echalote";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "utils/react/props";

async function http() {
  const headers = new Headers({ "x-session-id": crypto.randomUUID() })
  const request = new Request("https://meek.bamsoftware.com/", { headers })

  const tls = new TlsOverHttp(request)
  await tls.open()
  return tls
}

export const TorContext =
  createContext<Tor | undefined>(undefined)

export function useTor() {
  return useContext(TorContext)!
}

export function TorProvider(props: ChildrenProps) {
  const { children } = props

  const [tor, setTor] = useState<Tor>()

  const onLoad = useCallback(async () => {
    const tls = await http()
    const tor = new Tor(tls)
    await tor.init()
    await tor.handshake()
    setTor(tor)
  }, [])

  useEffect(() => {
    onLoad()
  }, [onLoad])

  if (!tor)
    return <>Connecting to Tor...</>

  return <TorContext.Provider value={tor}>
    {children}
  </TorContext.Provider>
}