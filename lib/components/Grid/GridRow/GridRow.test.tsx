import { describe, expect, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react-native";
import * as stories from "./GridRow.stories";

const composedStories = composeStories(stories);

describe("GridRow", () => {
  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    }
  );

  test("renders children in a row", () => {
    const { Default } = composedStories;
    const { getByText } = render(<Default />);
    expect(getByText("Col 1")).toBeTruthy();
    expect(getByText("Col 2")).toBeTruthy();
  });
});
