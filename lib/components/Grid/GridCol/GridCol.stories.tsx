import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { makeStyles, Theme, useTheme } from "../../../theme";
import { GridContainer } from "../GridContainer";
import { GridRow } from "../GridRow";
import { GridCol, GridColProps } from "./GridCol";

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    colStyles: {
      backgroundColor: theme.colors.base[60],
      padding: 16,
      borderRadius: 8,
    },
  })
);

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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    span: 4,
    spanM: 2,
    spanL: 1,
  },
  render: (args: GridColProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridCol {...args}>
        <View style={colStyles}>
          <Text>Column</Text>
        </View>
      </GridCol>
    );
  },
};

export const SingleSpan: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridCol span={1}>
        <View style={colStyles}>
          <Text>Span is always 1</Text>
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
          <Text>Span is always 2</Text>
        </View>
      </GridCol>
    );
  },
};

export const FullWidthSpan: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);

    return (
      <GridCol span={theme.grid.columns}>
        <View style={colStyles}>
          <Text>Span is always full width</Text>
        </View>
      </GridCol>
    );
  },
};

export const HalfWidthSpan: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridCol span={theme.grid.columns / 2}>
        <View style={colStyles}>
          <Text>Span is always half width</Text>
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
