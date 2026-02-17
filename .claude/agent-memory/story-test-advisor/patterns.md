# Patterns & Conventions

## File Structure (Actual, verified from Button component)

```
src/components/{ComponentName}/
  ├── {ComponentName}.tsx           # Component implementation
  ├── {ComponentName}.stories.tsx   # Storybook stories (co-located)
  ├── index.tsx                     # Public exports
  └── __tests__/
      ├── {ComponentName}-rn.test.tsx   # Jest + @testing-library/react-native
      ├── {ComponentName}-web.test.tsx  # Vitest + react-native-web (browser)
      └── __snapshots__/
          ├── {ComponentName}-rn.test.tsx.snap
          └── {ComponentName}-web.test.tsx.snap
```

## Story Conventions (Button.stories.tsx)

```tsx
import type { Meta, StoryObj } from "@storybook/react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { View } from "react-native";
import { Button } from "./Button";  // relative import from source

const meta = {
  title: "Button",           // just ComponentName, no "Components/" prefix
  component: Button,
  tags: ["autodocs"],
  args: {
    onPress: fn(),           // fn() in meta-level args
    text: "Click me!",
  },
  parameters: {
    a11y: { test: "error" }, // a11y errors are pipeline-blocking
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

// Each story overrides onPress with a fresh fn() to get isolated call counts
export const Basic: Story = { args: { onPress: fn() } };
export const WithLongText: Story = { args: { onPress: fn(), text: "..." } };

// Play functions use userEvent.click (not press) for web compatibility
export const InteractionTest: Story = {
  args: { onPress: fn(), text: "Click me!" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Click me!");
    expect(button).toBeVisible();
    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalledTimes(2);
  },
};
```

## Jest Test Pattern (Button-rn.test.tsx)

```tsx
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import * as stories from '../Button.stories';
import { test, expect } from '@jest/globals';

const composedStories = composeStories(stories);

// Three test.each loops over all composed stories:
// 1. Snapshot: render + toMatchSnapshot()
// 2. Render: getByText(Story.args.text ?? "") + toBeTruthy()
// 3. Interaction: fireEvent.press + expect(Story.args.onPress).toHaveBeenCalledTimes(1)
```

Key details:
- Imports `composeStories` from `@storybook/react` (NOT `@storybook/react-native`)
- Uses `test.each(Object.entries(composedStories))` - no `describe` blocks
- Relies on `Story.args.text` to find the button text (every story MUST have `text` in args)
- `Story.args.onPress` must be a `fn()` mock (set in story args, not meta args alone)
- Snapshot includes the decorator's wrapping `<View style={{ padding: 16 }}>`

## Vitest Test Pattern (Button-web.test.tsx)

```tsx
import { test, expect } from "vitest";
import { composeStories } from "@storybook/react-native-web-vite";
import * as stories from "../Button.stories";

const composedStories = composeStories(stories);

// Only snapshot test via Story.run() (runs play function if present)
test.each(Object.entries(composedStories))(
  "Button/%s should match snapshot",
  async (_name, Story) => {
    await Story.run();
    expect(document.body.firstChild).toMatchSnapshot();
  },
);
```

Key details:
- Imports from `@storybook/react-native-web-vite`
- Uses `Story.run()` which executes the play function if present
- Snapshots to `document.body.firstChild` (DOM snapshot, not RN component tree)
- Runs in browser (chromium via playwright)
- The existing web snapshots are empty (likely a known limitation)

## Critical: Story Args Requirements for Tests

Because `Button-rn.test.tsx` reads `Story.args.text` and `Story.args.onPress` directly:
1. Every story MUST have `text` explicitly in its `args` (or fall back to meta args)
2. Every story MUST have `onPress: fn()` in its `args` (not just meta-level)
3. The `composeStories` pattern merges meta args into story args, so meta-level `text`
   covers stories that don't override it - BUT meta-level `onPress: fn()` is shared
   across stories, so each story should define its own `fn()` for isolated call counts.

## What the Button Component Currently Exposes

Props: `onPress: () => void`, `text: string`
- No variants (single style: purple background, white bold text)
- No disabled state
- No loading state
- No size variants
- No icon support
- No accessibility label prop beyond the text content

## Coverage Gaps in Current Stories

1. No story for a very short/minimal text (single character or word)
2. No story testing disabled-like behavior (component has no disabled prop yet)
3. `InteractionTest` verifies 2 clicks but could also verify no extra calls
4. No story showing composition/usage in a form context
5. The `Basic` story and `InteractionTest` story render identically in snapshot
   (same text "Click me!" from meta args) - snapshots are redundant

## Improvement Opportunities

### Stories
- Rename `Basic` -> `Default` to match storybook conventions
- Add `ShortText` story with single-word text
- Consider removing `InteractionTest` as a separate story - its play function
  could be merged into `Default` (or kept for documentation clarity)
- The duplicate snapshot issue: `Basic` and `InteractionTest` use same text -
  consider giving each story unique text to make snapshots meaningful

### Jest Tests (Button-rn.test.tsx)
- The `fireEvent.press` test fires on `btnEl` found by `getByText` (the Text node),
  which correctly bubbles to TouchableOpacity - this is correct
- Missing: test for `text` prop being rendered with exact content
- Missing: test that pressing non-functional version doesn't throw (no onPress)
  - Note: Button.tsx requires `onPress`, so this is not applicable without prop change

### Vitest Tests (Button-web.test.tsx)
- Only has snapshot tests currently
- Could add render assertions using `@testing-library/react` equivalents
- The empty snapshots suggest the web snapshot mechanism may not be capturing
  rendered output correctly - worth investigating

## Setup Files

- Jest setup: `tests/jest.setup.ts` - calls `jest.useFakeTimers()`
- Vitest setup: `tests/vitest.setup.ts` - calls `setProjectAnnotations` with storybook preview

## Import Notes

- `composeStories` for Jest comes from `@storybook/react` (not `@storybook/react-native`)
- `composeStories` for Vitest comes from `@storybook/react-native-web-vite`
- Stories import `fn, expect, userEvent, within` from `storybook/test`
