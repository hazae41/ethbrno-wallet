import { XSWR } from "@hazae41/xswr";

export function dataPipe<D = any>(mutator: (d?: D) => D | undefined) {
  return (state?: XSWR.State<D>) => ({ data: mutator(state?.data) })
}