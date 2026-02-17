# Contributing to marys-ui

Thank you for your interest in contributing to marys-ui! This guide will help you add new components to the UI library following our established patterns and conventions.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed (check with `node --version`)
- **Project dependencies** installed (`npm install` in project root)
- **Familiarity** with React Native and TypeScript
- **Understanding** of the project structure (see [CLAUDE.md](./CLAUDE.md))

## Adding a New Component

Follow these steps to add a new component to the library. We'll use "TextField" as an example component name.

### Step 1: Create Component Directory Structure

Create the component directory with a `__tests__` subdirectory:

```bash
mkdir -p src/components/TextField/__tests__
```

**Pattern**: `src/components/{ComponentName}/__tests__/`

### Step 2: Implement the Component

Create the component implementation file:

**File**: `src/components/TextField/TextField.tsx`

```typescript
import { View, TextInput, Text, StyleSheet } from "react-native";

export interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const TextField = ({
  label,
  value,
  onChangeText,
  placeholder
}: TextFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
});
```

**Key Requirements**:
- Export a TypeScript interface for props named `{ComponentName}Props`
- Export the component as a named export (not default)
- Use functional components (not class components)
- Use `StyleSheet.create()` for all styling
- Use React Native core components (View, Text, TouchableOpacity, etc.)

**Reference**: See [src/components/Button/Button.tsx](src/components/Button/Button.tsx) for a complete example.

### Step 3: Create Public Exports

Create an index file to export the component and its types:

**File**: `src/components/TextField/index.tsx`

```typescript
export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';
```

**Pattern**: Always export both the component and its props type from index.tsx.

**Reference**: See [src/components/Button/index.tsx](src/components/Button/index.tsx).

### Step 4: Write Tests

Create comprehensive tests for your component:

**File**: `src/components/TextField/__tests__/TextField.spec.tsx`

```typescript
import { jest, describe, test, expect } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import { TextField } from '../TextField';

describe('TextField', () => {
  // Test Category 1: Snapshot
  test('should match snapshot', () => {
    const component = render(
      <TextField
        label="Username"
        value=""
        onChangeText={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  // Test Category 2: Render
  test('should render with label and value', () => {
    const { getByText, getByDisplayValue } = render(
      <TextField
        label="Email"
        value="test@example.com"
        onChangeText={() => {}}
      />
    );

    expect(getByText('Email')).toBeDefined();
    expect(getByDisplayValue('test@example.com')).toBeDefined();
  });

  // Test Category 3: Interaction
  test('should handle text change events', () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <TextField
        label="Name"
        value="John"
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByDisplayValue('John');
    fireEvent.changeText(input, 'Jane');

    expect(mockOnChangeText).toHaveBeenCalledWith('Jane');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  test('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TextField
        label="Search"
        value=""
        onChangeText={() => {}}
        placeholder="Type to search..."
      />
    );

    expect(getByPlaceholderText('Type to search...')).toBeDefined();
  });
});
```

**Required Test Categories**:
1. **Snapshot test**: Captures component structure
2. **Render test**: Verifies component renders correctly with props
3. **Interaction tests**: Tests all user-facing events (onPress, onChange, onFocus, etc.)

**Additional Guidelines**:
- Import from `@jest/globals` (jest, describe, test, expect)
- Import from `@testing-library/react-native` (render, fireEvent)
- Use `jest.fn()` for mock callbacks
- Test edge cases and error states where applicable

**Reference**: See [src/components/Button/__tests__/Button.spec.tsx](src/components/Button/__tests__/Button.spec.tsx).

### Step 5: Register the Component

Add your component to the main components barrel export:

**File**: `src/components/index.ts`

```typescript
export * from './Button';
export * from './TextField';  // Add this line
```

This makes your component available when users import from the library:

```typescript
import { TextField } from 'marys-ui';
```

### Step 6: Create Storybook Story

Create stories to document your component in Storybook:

**File**: `storybook/stories/TextField/TextField.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";
import { View } from "react-native";
import { TextField } from "marys-ui";

const meta = {
  title: "TextField",
  component: TextField,
  args: {
    label: "Label",
    value: "",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Username",
    value: "",
    onChangeText: fn(),
    placeholder: "Enter your username",
  },
};

export const WithValue: Story = {
  args: {
    label: "Email",
    value: "user@example.com",
    onChangeText: fn(),
  },
};

export const LongLabel: Story = {
  args: {
    label: "This is a very long label for testing",
    value: "Some value",
    onChangeText: fn(),
  },
};
```

**Story Requirements**:
- Export a `meta` object with title, component, default args, and decorators
- Create at least one "Basic" story showing default usage
- Create variant stories showing different prop combinations
- Use `fn()` from `storybook/test` for action callbacks

**Reference**: See [storybook/stories/Button/Button.stories.tsx](storybook/stories/Button/Button.stories.tsx).

### Step 7: Verify Implementation

Run the following commands to verify everything works:

```bash
# 1. Run tests (should all pass)
npm test

# 2. Build the library (should compile without errors)
npm run build

# 3. Start Storybook web to see your component
npm run dev:web
# Open http://localhost:6006 and find your component

# 4. (Optional) Test in on-device Storybook
npm run dev
# Open with Expo Go or simulator
```

**Success Criteria**:
- ✅ All tests pass (green output from `npm test`)
- ✅ Build completes without TypeScript errors
- ✅ Component appears in Storybook web
- ✅ Component is interactive and functions as expected

---

## Component Creation Checklist

Use this checklist before submitting a pull request:

### File Structure
- [ ] Component directory created: `src/components/{ComponentName}/`
- [ ] Component implementation file: `{ComponentName}.tsx`
- [ ] Index file with exports: `index.tsx`
- [ ] Test file: `__tests__/{ComponentName}.spec.tsx`
- [ ] Story file: `storybook/stories/{ComponentName}/{ComponentName}.stories.tsx`

### Code Quality
- [ ] Component uses TypeScript with exported interface (`{ComponentName}Props`)
- [ ] Component is a functional component (not class component)
- [ ] Styles use `StyleSheet.create()` from `react-native`
- [ ] Only React Native core components used (no platform-specific code)
- [ ] Follows naming conventions (PascalCase for component name)
- [ ] No TypeScript errors (strict mode compliance)

### Exports
- [ ] Component exported from `index.tsx`
- [ ] Props interface exported from `index.tsx`
- [ ] Component registered in `src/components/index.ts`

### Tests
- [ ] Snapshot test written
- [ ] Render test(s) written
- [ ] Interaction test(s) for all user events written
- [ ] All tests passing (`npm test`)
- [ ] Coverage includes the new component

### Storybook
- [ ] Story file created in `storybook/stories/{ComponentName}/`
- [ ] At least one "Basic" story defined
- [ ] Variant stories showing different props
- [ ] Component visible in Storybook web (`npm run dev:web`)

### Verification
- [ ] `npm test` passes
- [ ] `npm run build` succeeds with no errors
- [ ] Component tested in both web and native Storybook (if applicable)
- [ ] Cross-platform compatibility verified

---

## Code Standards

### Component Design
- **Functional components only** - No class components
- **Props via interface** - Define `{ComponentName}Props` interface
- **Named exports** - Export component and types from index.tsx
- **Single responsibility** - Each component should do one thing well
- **Composable** - Components should be usable in different contexts

### TypeScript
- **Strict mode** - All code must pass TypeScript strict mode checks
- **Explicit types** - No implicit `any` types
- **Props interfaces** - Always export props interface
- **Return types** - Prefer explicit return types for complex functions

### Styling
- **StyleSheet.create()** - All styles must use this approach
- **Inline styles** - Component-specific styles in the component file
- **Cross-platform** - Only use styles supported on all platforms
- **Future**: Shared design tokens (colors, spacing, typography) when theme system is established

### Testing
- **Three categories** - Snapshot, render, and interaction tests
- **Mock callbacks** - Use `jest.fn()` for event handlers in tests
- **Edge cases** - Test error states and boundary conditions
- **No snapshot abuse** - Only snapshot test the full component, not individual parts

### Documentation
- **Storybook stories** - Document component usage with stories
- **Story variants** - Show different prop combinations
- **Comments** - Add comments for complex logic (but keep code self-documenting when possible)

---

## Quick Start with Templates

To speed up component creation, use the boilerplate templates in the [templates/](templates/) directory:

```bash
# Create component structure
mkdir -p src/components/YourComponent/__tests__
mkdir -p storybook/stories/YourComponent

# Copy templates
cp templates/Component.tsx.template src/components/YourComponent/YourComponent.tsx
cp templates/index.tsx.template src/components/YourComponent/index.tsx
cp templates/Component.spec.tsx.template src/components/YourComponent/__tests__/YourComponent.spec.tsx
cp templates/Component.stories.tsx.template storybook/stories/YourComponent/YourComponent.stories.tsx

# Replace ComponentName with your actual component name in all files
# (Use find-and-replace in your editor)

# Update src/components/index.ts
echo "export * from './YourComponent';" >> src/components/index.ts

# Verify
npm test
npm run build
npm run dev:web
```

See [templates/README.md](templates/README.md) for more details.

---

## Getting Help

### Reference Materials
- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive project documentation
- **[README.md](./README.md)** - Project overview and quick start
- **[Button Component](src/components/Button/)** - Complete example component
- **[Component Templates](templates/)** - Boilerplate files

### Common Issues
- **TypeScript errors**: Check [tsconfig.json](tsconfig.json), ensure strict mode compliance
- **Tests not running**: Verify [jest.config.ts](jest.config.ts) and [src/setupTests.ts](src/setupTests.ts)
- **Component not in Storybook**: Check story file location and Storybook config
- **Build errors**: Run `npm run build` and check compiler output

### Questions?
If you're unsure about any step or encounter issues:
1. Review the [Button component](src/components/Button/) as a reference
2. Check [CLAUDE.md](./CLAUDE.md) for architecture and patterns
3. Open an issue or reach out to the maintainers

---

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/add-textfield-component
   ```

2. **Make your changes** following this guide

3. **Run verification**:
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add TextField component with tests and stories"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feature/add-textfield-component
   ```

6. **Complete the PR checklist** (if a PR template exists)

7. **Wait for review** - Maintainers will review your code

---

## Additional Guidelines

### Accessibility
- Consider adding accessibility props (accessibilityLabel, accessibilityRole, etc.)
- Test with screen readers when possible
- Follow React Native accessibility guidelines

### Performance
- Avoid unnecessary re-renders (use React.memo if needed)
- Keep components lightweight
- Minimize dependencies

### Breaking Changes
- Avoid breaking existing component APIs
- If a breaking change is necessary, discuss with maintainers first
- Document breaking changes clearly

---

Thank you for contributing to marys-ui! Your work helps create better healthcare applications. 🏥
