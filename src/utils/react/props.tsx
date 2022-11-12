import { ReactNode } from "react"

export type DivisionProps = JSX.IntrinsicElements["div"]
export type ButtonProps = JSX.IntrinsicElements["button"]
export type VectorProps = JSX.IntrinsicElements["svg"]
export type AnchorProps = JSX.IntrinsicElements["a"]

export interface ChildrenProps {
  children?: ReactNode
}

export interface CloseProps {
  close(): void
}