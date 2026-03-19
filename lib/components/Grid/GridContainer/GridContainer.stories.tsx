import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { makeStyles, Theme, useTheme } from "../../../theme";
import { GridCol } from "../GridCol";
import { useContentAlignment } from "../GridContext";
import { GridRow } from "../GridRow";
import { GridContainer, GridContainerProps } from "./GridContainer";

const meta = {
  title: "Grid/GridContainer",
  tags: ["autodocs"],
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
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer>
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

export const NoWrap: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer wrap={false}>
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
              <Text>Column 2</Text>
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

export const FullWidthSpan: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer>
        <GridRow>
          <GridCol span={2}>
            <View style={colStyles}>
              <Text>Full width column (span=2 on mobile)</Text>
            </View>
          </GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

export const MultipleRows: Story = {
  render: () => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);
    return (
      <GridContainer>
        <GridRow>
          <GridCol>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 1, Col 1</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={[colStyles, { marginBottom: 16 }]}>
              <Text>Row 1, Col 2</Text>
            </View>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol>
            <View style={colStyles}>
              <Text>Row 2, Col 1</Text>
            </View>
          </GridCol>
          <GridCol>
            <View style={colStyles}>
              <Text>Row 2, Col 2</Text>
            </View>
          </GridCol>
        </GridRow>
      </GridContainer>
    );
  },
};

type MixedContentProps = GridContainerProps & { overlay: boolean };
type MixedContentStory = StoryObj<MixedContentProps>;

export const MixedContent: MixedContentStory = {
  argTypes: {
    overlay: { control: "boolean", description: "Toggle overlay" },
  },
  args: {
    overlay: true,
  },
  render: (props: MixedContentProps) => {
    const { theme } = useTheme();
    const { colStyles } = createStyles(theme);

    const ContentCmp = () => {
      const containerStyles = useContentAlignment();
      return (
        <View style={[colStyles, containerStyles, { marginBottom: 16 }]}>
          <Text>Contained text should align.</Text>
        </View>
      );
    };

    const ColCmp = () => (
      <GridCol style={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            height: "100%",
          }}
        ></View>
      </GridCol>
    );
    return (
      <>
        {props.overlay && (
          <View style={[StyleSheet.absoluteFill]}>
            <GridContainer style={{ height: "100%" }}>
              <GridRow style={{ height: "100%" }}>
                <ColCmp />
                <ColCmp />
              </GridRow>
            </GridContainer>
          </View>
        )}
        <GridContainer>
          <GridRow>
            <GridCol span={1}>
              <View style={{ marginBottom: 16 }}>
                <Text>
                  Content that are not contained should align with contained
                  content
                </Text>
              </View>
            </GridCol>
          </GridRow>
          <GridRow contained={false}>
            <GridCol span={1}>
              <ContentCmp />
            </GridCol>
          </GridRow>
          <GridRow contained={false}>
            <GridCol span={2}>
              <ContentCmp />
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol span={2}>
              <View style={{ marginBottom: 16 }}>
                <Text>Content</Text>
              </View>
            </GridCol>
          </GridRow>
        </GridContainer>
      </>
    );
  },
};
