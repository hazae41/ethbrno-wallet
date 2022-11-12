import { keep } from "utils/react/events";
import { ChildrenProps, CloseProps } from "utils/react/props";
import { Modal } from "./modal";

export function Dialog(props: CloseProps & ChildrenProps) {
  const { close, children } = props

  return <Modal>
    <div className="p-4 fixed inset-0 bg-backdrop animate-opacity"
      onMouseDown={close}
      onClick={keep}>
      <div className="p-4 h-full flex flex-col rounded-xl bg-default animate-opacity-scale"
        onMouseDown={keep}>
        {children}
      </div>
    </div>
  </Modal>
}