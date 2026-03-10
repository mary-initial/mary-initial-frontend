import { beforeEach, describe, expect, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen, userEvent } from "@testing-library/react-native";
import * as stories from "./Button.stories";

const composedStories = composeStories(stories);

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    }
  );

  test.each(Object.entries(composedStories))(
    "%s should render its text",
    (_name, Story) => {
      render(<Story />);
      const text = Story.args.text ?? "Action text";
      const el = screen.getByText(text);
      expect(el).toBeTruthy();
    }
  );

  test("pressing a non-disabled button calls onPress", async () => {
    const { Primary } = composedStories;
    render(<Primary />);
    const el = screen.getByText(Primary.args.text ?? "Action text");
    await userEvent.press(el);
    expect(Primary.args.onPress).toHaveBeenCalledTimes(1);
  });

  test("button should be disabled when disabled", () => {
    const { PrimaryDisabled } = composedStories;
    render(<PrimaryDisabled />);
    const el = screen.getByText(PrimaryDisabled.args.text ?? "Action text");
    expect(el).not.toBeEnabled();
  });
});
