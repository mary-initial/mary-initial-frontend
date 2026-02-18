import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import * as stories from '../Button.stories';
import { describe, test, expect } from '@jest/globals';

const composedStories = composeStories(stories);

describe('Button', () => {
  test.each(Object.entries(composedStories))(
    "%s should match snapshot",
    (_name, Story) => {
      const { toJSON } = render(<Story />);
      expect(toJSON()).toMatchSnapshot();
    },
  );

  test.each(Object.entries(composedStories))(
    "%s should render its text",
    (_name, Story) => {
      render(<Story />);
      const btnEl = screen.getByText(Story.args.text ?? "");
      expect(btnEl).toBeTruthy();
    },
  );

  test.each(Object.entries(composedStories))(
    "%s should call onPress when pressed",
    (_name, Story) => {
      render(<Story />);
      const btnEl = screen.getByText(Story.args.text ?? "");
      fireEvent.press(btnEl);
      expect(Story.args.onPress).toHaveBeenCalledTimes(1);
    },
  );
});
