import { BigNumber, FixedNumber } from "ethers"

export function tryFloat(x?: BigNumber, d = 18) {
  try {
    if (!x) return
    return FixedNumber
      .fromValue(x, d)
      .round(3)
      .toUnsafeFloat()
  } catch (e: unknown) { }
}