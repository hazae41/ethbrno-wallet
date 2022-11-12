import { SyntheticEvent, useCallback, useState } from "react";
import { useObjectMemo } from "./memo";

export interface ElementHandle<T extends Element = Element> {
    current: T | null;

    set(x: T | null): void;
    unset(): void;

    use(e: SyntheticEvent<T>): void;
}

export function useElement<T extends Element = Element>(): ElementHandle<T> {
    const [current, set] = useState<T | null>(null);
    const unset = useCallback(() => set(null), []);

    const use = useCallback((e: SyntheticEvent<T>) => {
        set(e.currentTarget);
    }, []);

    return useObjectMemo({ current, set, unset, use });
}
