import { OptionalIconProps } from "utils/react/icon";
import { ButtonProps, RefProps } from "utils/react/props";

export function Button(props: ButtonProps) {
  return <button {...props} />
}

export function ContrastTextButton(props: ButtonProps & OptionalIconProps & RefProps<HTMLButtonElement>) {

  const { xref, icon: Icon, className, children, ...other } = props

  return <button className={`group rounded-xl p-md bg-ahover transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...other}
    ref={xref}>
    <div className="flex justify-center items-center gap-2 group-enabled:group-active:scale-90 transition-transform">
      {Icon &&
        <Icon className="icon-xs" />}
      {children}
    </div>
  </button>
}