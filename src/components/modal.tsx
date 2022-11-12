import { createContext, useContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLazyMemo } from "utils/react/memo"
import { ChildrenProps } from "utils/react/props"

export const ModalContext =
  createContext<number>(0)

export function Modal(props: ChildrenProps & {
  type?: string
}) {
  const { type = "div", children } = props
  const number = useContext(ModalContext)

  const element = useLazyMemo(() =>
    document.createElement(type), [])

  useEffect(() => {
    if (!element) return
    document.body.appendChild(element)
    return () => void document.body.removeChild(element)
  }, [element])

  if (!element) return null

  return <ModalContext.Provider value={number + 1}>
    {createPortal(children, element)}
  </ModalContext.Provider>
}