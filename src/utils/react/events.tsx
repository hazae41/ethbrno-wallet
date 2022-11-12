import { ChangeEvent, DependencyList, SyntheticEvent, useCallback } from "react"

export function keep(e: SyntheticEvent<any>) {
  e.stopPropagation()
}

export function noop(e: SyntheticEvent<any>) {
  e.preventDefault()
}

export function cancel(e: SyntheticEvent<any>) {
  e.preventDefault()
  e.stopPropagation()
}

export function useInputChange<R>(
  callback: (e: ChangeEvent<HTMLInputElement>) => R,
  deps: DependencyList = [callback]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps)
}

export function useTextAreaChange<R>(
  callback: (e: ChangeEvent<HTMLTextAreaElement>) => R,
  deps: DependencyList = [callback]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps)
}
