import { describe, expect, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react-native";
import * as stories from "./GridCol.stories";

const composedStories = composeStories(stories);

describe("GridCol", () => {
  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    }
  );

  test("renders children", () => {
    const { SingleColumn } = composedStories;
    const { getByText } = render(<SingleColumn />);
    expect(getByText("span=1")).toBeTruthy();
  });
});
