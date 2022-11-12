import { DependencyList, useEffect, useMemo, useState } from "react"

export function useObjectMemo<T extends {}>(object: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => object, Object.values(object))
}

export function useLazyMemo<T>(factory: () => T, deps: DependencyList) {
  const [state, setState] = useState<T>()

  useEffect(() => {
    setState(factory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}