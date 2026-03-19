import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { GridContext, type GridContextValue } from "../GridContext";

export interface GridContainerProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const GridContainer = ({
  children,
  style,
  testID,
}: GridContainerProps) => {
  const { theme } = useTheme();
  const { outer, inner, gutter, columns } = theme.grid;

  const gridValue = useMemo<GridContextValue>(
    () => ({ columns, gutter, outer, inner }),
    [columns, gutter, outer, inner]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: gutter / 2 - outer,
        },
      }),
    [outer, gutter]
  );

  return (
    <GridContext.Provider value={gridValue}>
      <View style={[styles.container, style]} testID={testID}>
        {children}
      </View>
    </GridContext.Provider>
  );
};
