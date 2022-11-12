import { DependencyList, useCallback } from "react"
import { useRefState } from "./ref"

export function useAsyncTry<R, A extends unknown[]>(
  callback: (...args: A) => Promise<R>,
  deps: DependencyList,
  onerror: (e: any) => void
) {
  const [promise, setPromise] = useRefState<Promise<R>>()

  const run = useCallback((...args: A) => new Promise<R>((ok, err) => {
    if (promise.current) return

    const npromise = callback(...args)

    setPromise(npromise)

    return npromise
      .then(ok)
      .catch(onerror)
      .catch(err)
      .finally(() => setPromise(undefined))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [...deps, onerror])

  const loading = Boolean(promise.current)

  return { run, promise, loading }
}