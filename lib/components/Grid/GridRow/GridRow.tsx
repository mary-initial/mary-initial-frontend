import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useGridContext } from "../GridContext";

export interface GridRowProps {
  children?: React.ReactNode;
  contained?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const GridRow = ({
  children,
  style,
  testID,
  contained = true,
}: GridRowProps) => {
  const { inner, outer } = useGridContext();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: contained ? inner - outer : 0,
        },
      }),
    [inner, outer]
  );

  return (
    <View style={[styles.row, style]} testID={testID}>
      {children}
    </View>
  );
};
