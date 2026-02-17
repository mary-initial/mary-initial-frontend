import { test, expect, describe } from "vitest";
import { composeStories } from "@storybook/react-native-web-vite";
import * as stories from "../Button.stories";

const composedStories = composeStories(stories);

describe("Button (web)", () => {
  test.each(Object.entries(composedStories))(
    "%s should render and run play function without errors",
    async (_name, Story) => {
      await Story.run();
      const text = Story.args.text ?? "";
      expect(document.body.textContent).toContain(text);
    },
  );

  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    async (_name, Story) => {
      await Story.run();
      expect(document.body.innerHTML).toMatchSnapshot();
    },
  );
});
