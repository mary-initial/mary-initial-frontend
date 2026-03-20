import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { ScreenMode } from "../../../theme/core";
import { GridMode, useGridContext } from "../GridContext";

export type GridColSpans = {
  [key in ScreenMode]?: number;
};

export interface GridColProps {
  children?: React.ReactNode;
  span?: number;
  spanM?: number;
  spanL?: number;
  style?: ViewStyle;
  testID?: string;
}

const resolveSpan = (
  screenMode: ScreenMode,
  span: number,
  spanM?: number,
  spanL?: number
): number => {
  if (spanL && screenMode === "desktop") return spanL;
  if (spanM && (screenMode === "tablet" || screenMode === "desktop"))
    return spanM;
  return span;
};

export const GridCol = ({
  children,
  span = 1,
  spanM,
  spanL,
  style,
  testID,
}: GridColProps) => {
  const { screenMode } = useTheme();
  const { columns, gutter, gridMode, inner, outer } = useGridContext();

  const cmpSpan = resolveSpan(screenMode, span, spanM, spanL);
  const clampedSpan = Math.max(1, Math.min(cmpSpan, columns));
  const widthPercent = `${(clampedSpan / columns) * 100}%` as const;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        col: {
          flexBasis: widthPercent,
        },
        normalCol: {
          paddingHorizontal: gutter / 2,
        },
        elevatedCol: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        elevatedColList: {
          paddingLeft: 0,
          paddingRight: gutter / 2 + inner - outer,
          marginRight: gutter / 2 - inner + outer,
        },
      }),
    [widthPercent, gutter, gridMode, inner, outer]
  );

  const elevatedStyle =
    columns === cmpSpan ? styles.elevatedCol : styles.elevatedColList;
  const colStyles = [
    styles.col,
    gridMode === GridMode.Normal ? styles.normalCol : elevatedStyle,
    style,
  ];

  return (
    <View style={colStyles} testID={testID}>
      {children}
    </View>
  );
};
