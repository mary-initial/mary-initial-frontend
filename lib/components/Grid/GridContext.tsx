import { createContext, useContext } from "react";
import { ViewStyle } from "react-native";

export interface GridContextValue {
  columns: number;
  gutter: number;
  outer: number;
  inner: number;
  wrap: boolean;
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

/**
 * Use to align content relative to the grid. If no grid context exists use provided styles.
 * @param contentStyles other styles to apply.
 * @returns Styles for a view element
 */
export function useContentAlignment(contentStyles: ViewStyle = {}): ViewStyle {
  const context = useGridContext();

  if (!context) return {};

  return {
    ...contentStyles,
    paddingHorizontal: context.inner - context.outer,
  };
}
