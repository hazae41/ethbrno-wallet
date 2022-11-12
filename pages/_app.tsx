import { XSWR } from "@hazae41/xswr"
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <div className="w-[337.50px] h-[600px]">
    <XSWR.CoreProvider>
      <Component {...pageProps} />
    </XSWR.CoreProvider>
  </div>
}
