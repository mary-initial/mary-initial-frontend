import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { makeStyles, Theme, useTheme } from "../../../theme";
import { useContentStyles, useResponsiveStyles } from "../../../theme/context";
import { GridCol } from "../GridCol";
import { GridMode } from "../GridContext";
import { GridRow } from "../GridRow";
import { GridContainer, GridContainerProps } from "./GridContainer";

const meta = {
  title: "Grid/GridContainer",
  tags: ["autodocs"],
  argTypes: {
    gridMode: {
      control: "select",
      options: ["normal", "elevated"],
      mapping: { normal: GridMode.Normal, elevated: GridMode.Elevated },
    },
  },
  args: {
    gridMode: GridMode.Normal,
  },
  component: GridContainer,
} satisfies Meta<typeof GridContainer>;

export default meta;

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    colStyles: {
      backgroundColor: theme.colors.base[60],
      borderRadius: 8,
      paddingVertical: 16,
    },
  })
);

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: GridContainerProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer {...args}>
        <GridRow>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 1</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 2</Text>
            </View>
          </GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

export const Elevated: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer gridMode={GridMode.Elevated} wrapCols={false}>
        <GridRow style={{ marginBottom: 16 }}>
          <GridCol>
            <View style={colStyles}>
              <Text>Useful for carousel like effect</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 2</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 3</Text>
            </View>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol span={theme.grid.columns}>
            <View style={colStyles}>
              <Text style={{ textAlign: "center" }}>Full width</Text>
            </View>
          </GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

export const Centered: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    const responsiveStyles = useResponsiveStyles();
    return (
      <GridContainer>
        <GridRow style={{ marginBottom: 16 }}>
          <GridCol style={responsiveStyles.hideBeforeM} />
          <GridCol span={2}>
            <View style={colStyles}>
              <Text style={{ textAlign: "center" }}>
                Centered col (view in tablet/desktop mode)
              </Text>
            </View>
          </GridCol>
          <GridCol style={responsiveStyles.hideBeforeM}></GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

export const GridModesMixed: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    const contentStyles = useContentStyles();

    return (
      <>
        <GridContainer gridMode={GridMode.Normal}>
          <GridRow style={{ marginBottom: 16 }}>
            <GridCol span={1} spanM={2}>
              <View>
                <Text>Normal grid - text is aligned with elevated</Text>
              </View>
            </GridCol>
            <GridCol span={1} spanM={2}>
              <View>
                <Text>Normal grid</Text>
              </View>
            </GridCol>
          </GridRow>
        </GridContainer>
        <GridContainer gridMode={GridMode.Elevated}>
          <GridRow style={{ marginBottom: 16 }}>
            <GridCol span={1} spanM={2}>
              <View style={[colStyles, contentStyles.container]}>
                <Text>Elevated grid columns</Text>
              </View>
            </GridCol>
            <GridCol span={1} spanM={2}>
              <View style={[colStyles, contentStyles.container]}>
                <Text>Works well with carousel</Text>
              </View>
            </GridCol>
          </GridRow>
        </GridContainer>
        <GridContainer gridMode={GridMode.Elevated}>
          <GridRow style={{ marginBottom: 16 }}>
            <GridCol span={theme.grid.columns}>
              <View style={[colStyles, contentStyles.container]}>
                <Text style={{ textAlign: "center" }}>
                  Elevated grid single columns
                </Text>
              </View>
            </GridCol>
          </GridRow>
        </GridContainer>
        <GridContainer gridMode={GridMode.Normal}>
          <GridRow style={{ marginBottom: 16 }}>
            <GridCol>
              <View>
                <Text>Normal grid</Text>
              </View>
            </GridCol>
            <GridCol>
              <View>
                <Text>Normal grid</Text>
              </View>
            </GridCol>
            {theme.grid.columns > 2 && (
              <>
                <GridCol>
                  <View>
                    <Text>Normal grid</Text>
                  </View>
                </GridCol>
                <GridCol>
                  <View>
                    <Text>Normal grid</Text>
                  </View>
                </GridCol>
              </>
            )}
          </GridRow>
        </GridContainer>
        <GridContainer gridMode={GridMode.Elevated}>
          <GridRow>
            <GridCol>
              <View style={[colStyles, contentStyles.container]}>
                <Text>Elevated grid columns</Text>
              </View>
            </GridCol>
            <GridCol>
              <View style={[colStyles, contentStyles.container]}>
                <Text>Elevated grid columns</Text>
              </View>
            </GridCol>
            {theme.grid.columns > 2 && (
              <>
                <GridCol>
                  <View style={[colStyles, contentStyles.container]}>
                    <Text>Alignment slips on larger screens</Text>
                  </View>
                </GridCol>
                <GridCol>
                  <View style={[colStyles, contentStyles.container]}>
                    <Text>Elevated grid columns</Text>
                  </View>
                </GridCol>
              </>
            )}
          </GridRow>
        </GridContainer>
      </>
    );
  },
};

export const NoWrap: Story = {
  args: {
    wrapCols: false,
  },
  render: (args: GridContainerProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer {...args}>
        <GridRow>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 1</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 2</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 3</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 4</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 5</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Column 6</Text>
            </View>
          </GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

export const MultipleRows: Story = {
  render: (args: GridContainerProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer {...args}>
        <GridRow>
          <GridCol span={theme.grid.columns / 2}>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 1, Col 1</Text>
            </View>
          </GridCol>
          <GridCol span={theme.grid.columns / 2}>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 1, Col 2</Text>
            </View>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol span={theme.grid.columns / 2}>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 2, Col 1</Text>
            </View>
          </GridCol>
          <GridCol span={theme.grid.columns / 2}>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 2, Col 2</Text>
            </View>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol>
            <View style={colStyles}>
              <Text>Row 3, Col 1</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Row 3, Col 2</Text>
            </View>
          </GridCol>
          {theme.grid.columns > 2 && (
            <>
              <GridCol>
                <View style={colStyles}>
                  <Text>Row 3, Col 3</Text>
                </View>
              </GridCol>
              <GridCol>
                <View style={colStyles}>
                  <Text>Row 3, Col 4</Text>
                </View>
              </GridCol>
            </>
          )}
        </GridRow>
      </GridContainer>
    );
  },
};
