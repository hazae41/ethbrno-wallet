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
        Connecting to Tor...
      </span>
      <div className="h-[20px]" />
      <span className="text-center text-contrast">
        It may take a few seconds. If it freezes, close the extension window and open it again.
      </span>
    </div>

  return <TorContext.Provider value={tor}>
    {children}
  </TorContext.Provider>
}