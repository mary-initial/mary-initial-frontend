Review a marys-ui component for best practices and suggest concrete improvements.

If the user hasn't specified a component, ask for the component name or file path.

## Steps

1. Read all files for the component:
   - `lib/components/<Name>/<Name>.tsx`
   - `lib/components/<Name>/<Name>.stories.tsx`
   - `lib/components/<Name>.test.tsx`

2. Review against this checklist:

### Implementation
- [ ] Props interface exported and named `<Name>Props`
- [ ] `style` passthrough prop (ViewStyle/TextStyle)
- [ ] No hardcoded color/spacing values (should use theme tokens)
- [ ] `StyleSheet.create()` used (no inline style objects)
- [ ] No unnecessary re-renders (stable callbacks, no object literals in render)
- [ ] TypeScript — no `any` types

### Accessibility
- [ ] `accessibilityLabel` or `accessibilityRole` set where needed
- [ ] Interactive elements have `accessible={true}`
- [ ] Color contrast sufficient (if colors visible)
- [ ] Works with screen reader (logical reading order)

### Stories
- [ ] All prop variants have a story
- [ ] Interactive stories use `play()` function
- [ ] Stories cover edge cases (long text, empty, disabled)
- [ ] a11y testing enabled (not suppressed without reason)

### Tests
- [ ] Snapshot test included
- [ ] User interactions tested (not just renders)
- [ ] All stories parameterized via `composeStories`
- [ ] `.test.tsx` test file exist

3. Output a prioritized list of improvements with:
   - Priority: High / Medium / Low
   - Issue description
   - Concrete code fix or suggestion
