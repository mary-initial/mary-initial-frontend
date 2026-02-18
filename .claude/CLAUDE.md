# Project: marys-ui

Hospital-related applications to improve patient life.

## Structure
- `lib/` — `marys-ui` design system package (components, storybook, tests)
- `applications/mary-guiden/` — Hospital patient guide app (Expo Router, tabs)
- `applications/mary-ui-app/` — UI component showcase/demo app

## Commands
| Command | What it does |
|---|---|
| `npm run lib:dev` | Storybook web + RN simultaneously |
| `npm run test` | Jest (RN) + Vitest (web) + Maestro E2E |
| `npm run lint` | ESLint across all workspaces |
| `npm run build` | Build lib to dist/ |
| `npm run storybook:web` | Web Storybook only |
| `npm run storybook:rn-ios` | RN Storybook on iOS simulator |
| `npm run mary-guiden` | Start mary-guiden app |
| `npm run mary-ui-app:ios` | Start mary-ui-app on iOS |

## Component Anatomy
Every component in `lib/components/<Name>/` needs exactly these files:

```
<Name>/
├── <Name>.tsx                          Component implementation
├── index.tsx                           Named export only
├── <Name>.stories.tsx                  CSF3 stories (all variants)
└── __tests__/
    ├── <Name>-rn.test.tsx              Jest (React Native)
    └── <Name>-web.test.tsx             Vitest (web/browser)
```

After creating: add to `lib/components/index.ts`.

## Component Conventions
- Props interface: `<Name>Props`
- Styles: `StyleSheet.create()` — never inline style objects
- No hardcoded color/spacing values — use theme tokens (once theme is established)
- Support `style` prop passthrough (`ViewStyle` or `TextStyle`)
- Platform variants: `.ios.tsx` / `.android.tsx` suffix when needed
- `testID` prop for Maestro targeting

## Storybook Story Conventions
- Format: CSF3 with `Meta<typeof Component>` and `StoryObj<typeof Component>`
- One story per meaningful variant/state
- `play()` function for any interactive behavior
- Decorator: `View` with `padding: 16`
- Always include: `parameters: { a11y: { config: { rules: [{ id: '...', enabled: false }] } } }` or `tags: ['!a11y']` only if justified; default is a11y errors enabled

## Test Conventions
- Use `composeStories` from `@storybook/react-native` to import stories as test subjects
- Test: snapshot + key user interactions + text rendering
- Parameterize across all stories with `Object.entries(composeStories(stories))`
- `-rn.test.tsx`: Jest preset `react-native`
- `-web.test.tsx`: Vitest with `react-native-web` alias

## Maestro E2E Tests
- Location: `.maestro/` (root) + `.maestro/<app-name>/` (app-specific)
- Config: `.maestro/config.yml` (already configured)
- App IDs:
  - `mary-ui-app` → `dk.marys.marysuiexample`
  - `mary-guiden` → `com.anonymous.mary-guiden`
- Pattern: `launchApp` → navigate → interact → `assertVisible` → `takeScreenshot`
- Components need `testID` props for reliable element targeting

## Tech Stack
- React Native 0.81.5, New Architecture enabled
- React 19 with React Compiler
- Expo 54 / Expo Router 6
- TypeScript 5.9 (strict: false currently)
- Storybook 10 (web: react-native-web-vite, RN: Metro-based)
- Jest 30 (RN tests) + Vitest 4 (web tests, browser via Playwright)
- Figma Desktop MCP available — use `get_design_context` for Figma specs

## Key File Paths
- `lib/components/Button/Button.tsx` — reference component implementation
- `lib/components/Button/Button.stories.tsx` — reference stories
- `lib/components/Button/__tests__/Button-rn.test.tsx` — reference RN test
- `lib/components/Button/__tests__/Button-web.test.tsx` — reference web test
- `.maestro/mary-ui-app/Button.yml` — reference Maestro flow
- `lib/components/index.ts` — component barrel exports
- `lib/index.ts` — library root export
