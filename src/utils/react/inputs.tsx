import { ChangeEvent, DependencyList, useCallback } from "react";

export function useInputChange<R>(
  callback: (e: ChangeEvent<HTMLInputElement>) => R,
  deps: DependencyList = [callback]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps)
}