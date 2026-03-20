import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { GridMode, useGridContext } from "../GridContext";

export interface GridRowProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const GridRow = ({ children, style, testID }: GridRowProps) => {
  const { wrapCols, gutter, gridMode } = useGridContext();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          flexWrap: wrapCols ? "wrap" : "nowrap",
          overflow: wrapCols ? "hidden" : "scroll",
          marginHorizontal: gridMode === GridMode.Normal ? -gutter / 2 : 0,
        },
      }),
    [gutter, wrapCols, gridMode]
  );

  return (
    <View style={[styles.row, style]} testID={testID}>
      {children}
    </View>
  );
};
