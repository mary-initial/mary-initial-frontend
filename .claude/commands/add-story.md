Add or improve Storybook stories for an existing lib component.

If the user hasn't specified a component name or file, ask for it.

## Steps

1. Read the component's Props interface from `lib/components/<Name>/<Name>.tsx`
2. Read existing stories from `lib/components/<Name>/<Name>.stories.tsx` (if they exist)
3. Identify gaps: which prop combinations and states don't have a story yet?

4. Add stories for:
   - Each distinct `variant` or `size` prop value
   - Each meaningful boolean prop toggled on
   - Disabled / loading / error states if applicable
   - Edge cases: very long text, empty content, etc.
   - Interactive states with `play()` functions where behavior can be tested

5. Write the updated or new stories file following these conventions:
   - CSF3 format with `Meta<typeof Component>` and `StoryObj<typeof Component>`
   - Decorator: `View` with `style={{ padding: 16 }}`
   - Story names: PascalCase, descriptive (e.g., `PrimaryLarge`, `DisabledState`)
   - `play()` for any clickable/interactive stories

## Reference
See `lib/components/Button/Button.stories.tsx` for the exact pattern to follow.
