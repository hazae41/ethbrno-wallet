import { SyntheticEvent } from "react"

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