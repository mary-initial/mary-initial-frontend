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
└── <Name>.test.tsx                     Jest (React Native)
```

After creating: add to `lib/components/index.ts`.

## Component Conventions
- Props interface: `<Name>Props`
- Styles: `StyleSheet.create()` — never inline style objects
- No hardcoded color/spacing values — always use `theme.*` tokens via `useTheme()`
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
- `.test.tsx`: Jest preset `react-native`

## Maestro E2E Tests
- Location: `.maestro/` (root) + `.maestro/<app-name>/` (app-specific)
- Config: `.maestro/config.yml` (already configured)
- App IDs:
  - `mary-ui-app` → `dk.marys.marysuiexample`
  - `mary-guiden` → `dk.marys.maryguiden`
- Pattern: `launchApp` → navigate → interact → `assertVisible` → `takeScreenshot`

## Tech Stack
- React Native 0.81.5, New Architecture enabled
- React 19 with React Compiler
- Expo 54 / Expo Router 6
- TypeScript 5.9 (strict: false currently)
- Storybook 10 (web: react-native-web-vite, RN: Metro-based)
- Jest 30 (RN tests) + Vitest 4 (web tests, browser via Playwright)
- Figma Desktop MCP available — use `get_design_context` for Figma specs

## Theme System
Three-layer model: **primitive tokens → brand themes → color mode**

| Layer | Files | Purpose |
|---|---|---|
| Primitive tokens | `lib/theme/tokens/*.ts` | Raw values from Figma Variables |
| Brand themes | `lib/theme/themes/{marys,activity,information}.ts` | Semantic color mappings per brand |
| Color mode | `light` / `dark` key in each brand theme | Resolved via `themes[brand][mode]` |

**Provider:** `<MaryUIProvider initialBrand="marys" initialMode="light">`
**Hooks:** `useTheme()` → `{ theme, brand, mode, setBrand, setMode, toggleMode }`
**Style pattern:** `const styles = useMemo(() => createStyles(theme), [theme])` with `makeStyles()`
**Token sync:** `npm run tokens:sync` — reads Figma Variables JSON → writes `lib/theme/tokens/*.ts`
**Token reference:** `lib/theme/TOKENS.md` (auto-generated)

### BrandName + ColorMode types
```ts
type BrandName = 'marys' | 'activity' | 'information';
type ColorMode = 'light' | 'dark';
```

### Available semantic color keys
`theme.colors.background.{primary,secondary,surface}`
`theme.colors.text.{primary,secondary,disabled,inverse}`
`theme.colors.primary.{default,light,dark,contrast}`
`theme.colors.status.{success,error,warning,info}`
`theme.colors.border.{default,strong,focus}`

## Key File Paths
- `lib/components/Button/Button.tsx` — reference component implementation
- `lib/components/Button/Button.stories.tsx` — reference stories
- `lib/components/Button/Button.test.tsx` — reference component test
- `.maestro/mary-ui-app/Button.yml` — reference Maestro flow
- `lib/components/index.ts` — component barrel exports
- `lib/index.ts` — library root export
- `lib/theme/index.ts` — theme system barrel export
- `lib/theme/TOKENS.md` — design token reference (run tokens:sync to update)
