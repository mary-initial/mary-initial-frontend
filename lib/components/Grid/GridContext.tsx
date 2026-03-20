import { createContext, useContext } from "react";

export enum GridMode {
  Normal,
  Elevated,
}

export interface GridContextValue {
  columns: number;
  gutter: number;
  outer: number;
  inner: number;
  gridMode: GridMode;
  wrapCols: boolean;
}

export const GridContext = createContext<GridContextValue | undefined>(
  undefined
);

/**
 * Creates a grid context that provides grid sizes
 * @returns
 */
export function useGridContext(): GridContextValue | null {
  const context = useContext(GridContext);
  return context ?? null;
}
