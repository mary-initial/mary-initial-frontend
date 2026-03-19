import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { makeStyles, Theme, useTheme } from "../../../theme";
import { GridCol, GridColProps } from "../GridCol";
import { GridContainer } from "../GridContainer";
import { GridRow, GridRowProps } from "./GridRow";

const meta = {
  title: "Grid/GridRow",
  tags: ["autodocs"],
  component: GridRow,
  decorators: [
    (Story) => (
      <GridContainer>
        <Story />
      </GridContainer>
    ),
  ],
} satisfies Meta<typeof GridRow>;

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
export const Default: Story = {
  render: (args: GridRowProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridRow {...args}>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 1</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 2</Text>
          </View>
        </GridCol>
      </GridRow>
    );
  },
};

export const UnContained: Story = {
  args: {
    contained: false,
  },
  render: (args: GridColProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridRow {...args}>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 1</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 2</Text>
          </View>
        </GridCol>
      </GridRow>
    );
  },
};

export const WrappedColumns: Story = {
  render: (args: GridRowProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridRow {...args}>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 1</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 2</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 3 (wraps on mobile)</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 4 (wraps on mobile)</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 5 (wraps on tablet)</Text>
          </View>
        </GridCol>
        <GridCol>
          <View style={colStyles}>
            <Text>Col 6 (wraps on tablet)</Text>
          </View>
        </GridCol>
      </GridRow>
    );
  },
};
