import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react-native";

jest.mock("expo-router");

import * as stories from "./BottomTabs.stories";

const composedStories = composeStories(stories);

describe("BottomTabs", () => {
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

  test("should render all tab titles", () => {
    const { BottomNavigationLinks } = composedStories;
    render(<BottomNavigationLinks />);

    expect(screen.getByText("MARYS")).toBeTruthy();
    expect(screen.getByText("Aktiviteter")).toBeTruthy();
    expect(screen.getByText("Mad")).toBeTruthy();
    expect(screen.getByText("Viden om")).toBeTruthy();
    expect(screen.getByText("Forløb")).toBeTruthy();
  });

  test("should render five tab screens", () => {
    const { BottomNavigationLinks } = composedStories;
    render(<BottomNavigationLinks />);

    expect(screen.getByTestId("tab-index")).toBeTruthy();
    expect(screen.getByTestId("tab-activities")).toBeTruthy();
    expect(screen.getByTestId("tab-food")).toBeTruthy();
    expect(screen.getByTestId("tab-learn-about")).toBeTruthy();
    expect(screen.getByTestId("tab-treatment")).toBeTruthy();
  });
});
