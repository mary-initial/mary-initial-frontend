Scaffold a new component in the marys-ui design system library.

If the user hasn't provided a component name, ask for it (must be PascalCase).

## Steps

1. Read these reference files to match exact patterns:
   - `lib/components/Button/Button.tsx`
   - `lib/components/Button/index.tsx`
   - `lib/components/Button/Button.stories.tsx`
   - `lib/components/Button/Button.test.tsx`
   - `lib/components/index.ts`

2. Create these files for `lib/components/<Name>/`:
   - `<Name>.tsx` — component with StyleSheet.create, <Name>Props interface, style passthrough, testID prop
   - `index.tsx` — named export: `export { <Name> } from './<Name>'`
   - `<Name>.stories.tsx` — CSF3 with Meta and StoryObj, View decorator (padding: 16), Default story + meaningful variants
   - `<Name>.test.tsx` — Jest using composeStories, snapshot + behavior tests

3. Add export to `lib/components/index.ts`:
   `export * from './<Name>'`

## Rules
- No hardcoded color values — use placeholder comments like `// TODO: use theme token`
- Props interface must be exported
- Stories must cover all meaningful prop combinations
