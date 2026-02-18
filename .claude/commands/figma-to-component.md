Transfer a Figma design spec to a marys-ui component with stories and tests.

## Steps

1. **Get Figma design context**
   Use the `get_design_context` MCP tool on the currently selected Figma node (or ask the user to select a node in Figma Desktop first).

2. **Extract design information**
   From the Figma context, identify:
   - Component name (derive from layer name if not obvious)
   - All variants and states (default, hover, pressed, disabled, loading, etc.)
   - Colors → note as future theme tokens (e.g., `primary: #8B00FF`)
   - Spacing values (padding, gap, margin)
   - Typography (fontSize, fontWeight, lineHeight, fontFamily)
   - Border radius values
   - Shadow/elevation values
   - Icon usage
   - Text content patterns

3. **Create the component**
   Follow the `/new-component` pattern exactly. For each Figma variant, create a corresponding prop (e.g., variant, size, state).

4. **Create stories for all Figma variants**
   One story per Figma variant/state. Story names should match Figma frame/variant names.

5. **Create tests**
   Both `-rn.test.tsx` and `-web.test.tsx` covering all stories.

6. **Output a summary** including:
   - Component created: `lib/components/<Name>/`
   - Props added and their types
   - Design tokens extracted (color, spacing values found) — these should be noted for future theme setup
   - Any Figma specs that couldn't be mapped (e.g., unsupported effects)

## Rules
- Never hardcode colors/spacing directly — add `// TODO: theme.colors.primary` comments
- If variant names in Figma use different naming (e.g. "Primary / Large"), normalize to camelCase props
- Use `get_screenshot` MCP tool if you need to visually verify the design
