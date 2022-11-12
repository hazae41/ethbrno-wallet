import { Dispatch, SetStateAction } from "react";

export type State<T> = [T, Setter<T>]
export type Setter<T> = Dispatch<SetStateAction<T>>