import { OptionalIconProps } from "utils/react/icon";
import { ButtonProps, RefProps } from "utils/react/props";

export function ContrastTextButton(props: ButtonProps & OptionalIconProps & RefProps<HTMLButtonElement>) {

  const { xref, icon: Icon, className, children, ...other } = props

  return <button className={`group rounded-xl p-md bg-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...other}
    ref={xref}>
    <div className="flex justify-center items-center gap-2 group-enabled:group-active:scale-90 transition-transform">
      {Icon &&
        <Icon className="icon-xs" />}
      {children}
    </div>
  </button>
}

export function OppositeTextButton(props: ButtonProps & OptionalIconProps & RefProps<HTMLButtonElement>) {

  const { xref, icon: Icon, className, children, ...other } = props

  return <button className={`w-full group flex items-center rounded-xl p-md border border-default bg-component text-colored transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    {...other}
    ref={xref}>
    <div className="flex  grow justify-center items-center gap-2 group-enabled:group-active:scale-90 transition-transform">
      {children}
    </div>
    {Icon && <Icon className="icon-sm text-colored" />}
  </button>
}

export function OppositeTextButtonRounded(props: ButtonProps & RefProps<HTMLButtonElement>) {

  const { xref, className, children, ...other } = props

  return <button className={`group flex items-center justify-center rounded-xl p-2 bg-component text-colored transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...other}
    ref={xref}>
    <div className="flex  justify-center items-center gap-2 group-enabled:group-active:scale-90 transition-transform">
      {children}
    </div>
  </button>
}