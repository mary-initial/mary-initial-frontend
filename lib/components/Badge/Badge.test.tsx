import { describe, expect, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react-native";
import * as stories from "./Badge.stories";

const composedStories = composeStories(stories);

describe("Badge", () => {
  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    }
  );

  test("renders icon checkmark when content is icon", () => {
    const { LargeActiveIcon } = composedStories;
    render(<LargeActiveIcon />);
    expect(screen.getByRole("image")).toBeTruthy();
  });

  test("renders number when content is number", () => {
    const { LargeActiveNumber } = composedStories;
    render(<LargeActiveNumber />);
    expect(screen.getByText("1")).toBeTruthy();
  });

  test("does not render text in small badge", () => {
    const { SmallActive } = composedStories;
    render(<SmallActive />);
    expect(screen.queryByText("✓")).toBeNull();
    expect(screen.queryByText("1")).toBeNull();
  });

  test("disabled badge renders without error", () => {
    const { LargeDisabledIcon } = composedStories;
    const { toJSON } = render(<LargeDisabledIcon />);
    expect(toJSON()).toBeTruthy();
  });
});
