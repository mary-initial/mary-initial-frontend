import { describe, expect, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react-native";
import * as stories from "./GridContainer.stories";

const composedStories = composeStories(stories);

describe("GridContainer", () => {
  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    }
  );

  test("renders children", () => {
    const { Default } = composedStories;
    const { getByText } = render(<Default />);
    expect(getByText("Column 1")).toBeTruthy();
    expect(getByText("Column 2")).toBeTruthy();
  });
});
