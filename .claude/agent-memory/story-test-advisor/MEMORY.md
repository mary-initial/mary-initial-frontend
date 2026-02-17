# Story & Test Advisor Memory

## Key Project Deviations from CLAUDE.md

The actual codebase differs from CLAUDE.md in important ways. See `patterns.md` for details.

- Stories live in `src/components/{ComponentName}/{ComponentName}.stories.tsx` (NOT `storybook/stories/`)
- Storybook `main.ts` points to `../../src/**/*.stories.?(ts|tsx|js|jsx)`
- Test files are named `{ComponentName}-rn.test.tsx` and `{ComponentName}-web.test.tsx` (NOT `.spec.tsx`)
- Both test files co-locate in `src/components/{ComponentName}/__tests__/`

## Testing Architecture (Two Separate Test Runners)

1. **Jest** runs `*-rn.test.tsx` files (react-native preset, `testRegex: /__tests__/.*-rn\.test\.(ts|tsx|js)$`)
2. **Vitest** runs `*-web.test.tsx` files (react-native-web via alias, browser: chromium via playwright)

See `patterns.md` for established patterns in each.

## Story Location & Import

- Stories import from `./Button` (relative source path), NOT from `marys-ui` package
- Stories are co-located in the component source directory: `src/components/{ComponentName}/{ComponentName}.stories.tsx`
- The Storybook web config (`storybook/.storybook/main.ts`) picks them up via glob

## Links

- Detailed patterns: `patterns.md`
