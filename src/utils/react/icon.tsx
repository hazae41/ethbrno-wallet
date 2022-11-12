import { VectorProps } from "./props";

export type Icon = (props: VectorProps) => JSX.Element;

export interface IconProps {
  icon: Icon;
}

export interface OptionalIconProps {
  icon?: Icon;
}
