import { XSWR } from "@hazae41/xswr"
import { CircuitProvider } from "contexts/circuit/context"
import { TorProvider } from "contexts/tor/context"
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <div className="w-[337.50px] h-[600px]">
    <XSWR.CoreProvider>
      <TorProvider>
        <CircuitProvider>
          <Component {...pageProps} />
        </CircuitProvider>
      </TorProvider>
    </XSWR.CoreProvider>
  </div>
}
