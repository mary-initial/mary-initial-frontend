import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { makeStyles, Theme, useTheme } from "../../../theme";
import { GridContainer } from "../GridContainer";
import { GridRow } from "../GridRow";
import { GridCol } from "./GridCol";

const meta = {
  title: "Grid/GridCol",
  tags: ["autodocs"],
  component: GridCol,
  decorators: [
    (Story) => (
      <GridContainer>
        <GridRow>
          <Story />
        </GridRow>
      </GridContainer>
    ),
  ],
} satisfies Meta<typeof GridCol>;

export default meta;

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    colStyles: {
      backgroundColor: theme.colors.base[60],
      padding: 16,
      borderRadius: 8,
    },
  })
);

type Story = StoryObj<typeof meta>;

export const SingleColumn: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridCol span={1}>
        <View style={colStyles}>
          <Text>span=1</Text>
        </View>
      </GridCol>
    );
  },
};

export const DoubleSpan: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridCol span={2}>
        <View style={colStyles}>
          <Text>span=2 (full width on mobile)</Text>
        </View>
      </GridCol>
    );
  },
};

export const MixedSpans: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <>
        <GridCol span={1}>
          <View style={colStyles}>
            <Text>span=1</Text>
          </View>
        </GridCol>
        <GridCol span={2}>
          <View style={colStyles}>
            <Text>span=2</Text>
          </View>
        </GridCol>
        <GridCol span={1}>
          <View style={colStyles}>
            <Text>span=1</Text>
          </View>
        </GridCol>
      </>
    );
  },
};
