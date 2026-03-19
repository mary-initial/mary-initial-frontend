import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useGridContext } from "../GridContext";

export interface GridColProps {
  children?: React.ReactNode;
  /** Number of columns to span. Defaults to 1. Clamped to [1, columns]. */
  span?: number;
  style?: ViewStyle;
  testID?: string;
}

export const GridCol = ({
  children,
  span = 1,
  style,
  testID,
}: GridColProps) => {
  const { columns, gutter } = useGridContext();
  const clampedSpan = Math.max(1, Math.min(span, columns));
  const widthPercent = `${(clampedSpan / columns) * 100}%` as const;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        col: {
          flexBasis: widthPercent,
          maxWidth: widthPercent,
          paddingHorizontal: gutter / 2,
        },
      }),
    [widthPercent, gutter]
  );

  return (
    <View style={[styles.col, style]} testID={testID}>
      {children}
    </View>
  );
};
