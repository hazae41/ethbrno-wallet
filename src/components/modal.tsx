import { createContext, useContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { usePopper } from "react-popper"
import { useBoolean } from "utils/react/boolean"
import { useElement } from "utils/react/element"
import { useLazyMemo } from "utils/react/memo"
import { ChildrenProps, TargetProps } from "utils/react/props"


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

export const popperNoOffsetOptions: any = {
  placement: "bottom",
  modifiers: [{
    name: 'offset',
    options: {
      offset: [0, 5],
    },
  }]
}

export function HoverPopper(props: TargetProps & ChildrenProps) {

  const { children, target } = props

  const element = useElement<HTMLDivElement>()
  const popper = usePopper(
    target.current,
    element.current,
    popperNoOffsetOptions)
  const hovered = useBoolean()

  if (!hovered.current && !target.current)
    return null

  return <Modal>
    <div className="fixed px-2"
      style={popper.styles.popper}
      {...popper.attributes.popper}
      onMouseEnter={hovered.enable}
      onMouseLeave={hovered.disable}
      ref={element.set}>
      <div className="p-2 bg-violet2 border border-default rounded-xl animate-slidedown text-xs">
        {children}
      </div>
    </div>
  </Modal>
}