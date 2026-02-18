import type { Meta, StoryObj } from "@storybook/react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { View } from "react-native";
import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onPress: fn(),
    text: "Click me!",
  },
  parameters: {
    a11y: {
      test: "error",
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: fn(),
    text: "Click me!",
  },
};

export const ShortText: Story = {
  args: {
    onPress: fn(),
    text: "OK",
  },
};

export const WithLongText: Story = {
  args: {
    onPress: fn(),
    text: "This is a button with a much longer text label",
  },
};

export const Clickable: Story = {
  args: {
    onPress: fn(),
    text: "Press me",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Press me");
    expect(button).toBeVisible();

    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalledTimes(1);

    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalledTimes(2);
  },
};
