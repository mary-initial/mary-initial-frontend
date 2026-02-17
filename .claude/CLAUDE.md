# Project Summary

This project is a **UI library for React Native applications** targeted at healthcare user guidance. The library is named **marys-ui** and provides the following to React Native applications:

* **UI Components**: Smaller, reusable parts of UI to be interacted with (buttons, inputs, cards, etc.)
* **Layout Helpers**: Ensure proper spacing and alignment between components
* **Common Styles**: Consistent appearance of typography, colors, spacing, and other design tokens

This library is meant to be included as an npm package in React Native applications. All components are **cross-platform**, supporting both React Native and React Native Web.

**Target Audience**: Healthcare application developers building React Native apps

**Key Characteristics**:
- Monorepo structure with npm workspaces
- TypeScript with strict mode enabled
- Fully tested with Jest and React Testing Library
- Comprehensive documentation via dual Storybook setup (web and on-device)
- Build output: Compiled JavaScript with TypeScript declarations (dist/)

# Project Structure

The project is structured as an **npm workspace monorepo** with two main parts:

## Root Package (marys-ui)
- **Location**: `./src/` directory
- **Purpose**: Source code of the UI library
- **Build Output**: `./dist/` - Compiled JavaScript + TypeScript declarations
- **Package Info**: Main entry point is `dist/index.js`, types at `dist/index.d.ts`
- **Distribution**: Only `dist/` folder is published to npm (see `files` in package.json)

## Storybook Workspace
- **Location**: `./storybook/` directory
- **Purpose**: Development workspace for building and documenting components
- **Features**:
  - Dual Storybook setup (web via Vite + on-device React Native)
  - Expo-based app structure using expo-router
  - Component stories for interactive documentation
- **Package**: Marked as `private: true`, not published

**Workspace Relationship**: The storybook workspace consumes the UI library by importing from the built `dist/` directory, allowing iterative development that mirrors how consuming applications will use the library.

# Source Code Explanation

The UI library source code is **TypeScript-based** and follows strict patterns:

**Technology Stack**:
- TypeScript 5.9.3 (strict mode enabled)
- React 19.1.0
- React Native 0.81.5
- React Native Web 0.21.0

**Code Organization**:
- `src/components/` - All UI components
- `src/index.ts` - Main entry point, re-exports all components
- Component structure (see "Code Patterns & Conventions" section below)

**Build Process**:
- TypeScript compiler (tsc) transforms `src/` → `dist/`
- No bundler used (simple, standard npm package approach)
- Watch mode available via `npm run dev`

# Storybook Explanation

The UI library is documented and developed using **Storybook** in the workspace. The storybook workspace is an npm workspace linked to the root project.

**Dual Storybook Setup**:

1. **Web Storybook** (`storybook/.storybook/`):
   - Framework: @storybook/react-native-web-vite
   - Port: 6006 (default)
   - Purpose: Fast iteration during development
   - Run: `npm run dev:web` or `npm run storybook:web --workspace=storybook`

2. **On-Device Storybook** (`storybook/.rnstorybook/`):
   - Framework: @storybook/react-native
   - Purpose: Test components in real React Native environment
   - Run: `npm run dev` or `npm run storybook --workspace=storybook`

**Story Location**: Component stories are in `storybook/stories/{ComponentName}/`

# DevOps Specification

The following outputs are expected in the DevOps pipeline:

1. **NPM Package**: Built UI library published to Azure DevOps Artifacts (private npm registry)
2. **Storybook Website**: Static site displaying components in web view, deployed to Azure App Services
3. **Storybook React Native App**: Standalone app to display components in a React Native context (deployment TBD)

**Build Requirements**:
- `npm run build` - Compiles TypeScript to dist/
- `npm test` - Runs tests with coverage (quality gate)
- `npm run build-storybook --workspace=storybook` - Builds static Storybook site

# Environment Specification

The following infrastructure is expected:

- **Azure DevOps Pipelines**: Build and publishing automation
- **Azure DevOps Artifacts**: Private npm registry for package distribution
- **Azure App Services**: Hosting for Storybook web deployment
- **Standalone App**: The Storybook React Native app might be deployed as a standalone app (undecided)

---

# Development Workflows

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development mode (TypeScript watch + on-device Storybook)
npm run dev

# 3. OR start web-only development (faster iteration)
npm run dev:web

# 4. View components
# - Web: http://localhost:6006
# - Native: Use Expo Go or simulator via Expo
```

## Common Development Tasks

### Add a New Component
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed step-by-step instructions.

Quick summary:
1. Create `src/components/{ComponentName}/` directory
2. Implement component, index, and tests
3. Register in `src/components/index.ts`
4. Create Storybook story
5. Verify with `npm test` and `npm run build`

### Run Tests
```bash
npm test                # Run all tests with coverage
npm run test:update     # Update Jest snapshots
```

### Build Library
```bash
npm run build           # Compile TypeScript to dist/
```

### Test in a Consuming Application
```bash
npm pack                # Creates a tarball (e.g., marys-ui-1.0.0.tgz)
# Then in consuming app:
npm install /path/to/marys-ui-1.0.0.tgz
```

## Development Modes

- **`npm run dev`**: Watch mode with on-device Storybook (tsc watch + Expo)
- **`npm run dev:web`**: Watch mode with web Storybook (tsc watch + web Storybook on port 6006)
- **`npm run storybook`**: On-device Storybook only (without tsc watch)
- **`npm run storybook:web`**: Web Storybook only (without tsc watch)

**Recommendation**: Use `npm run dev:web` for fastest iteration during development, then test in `npm run dev` (on-device) before finalizing.

---

# Code Patterns & Conventions

## Component Structure (STRICT PATTERN)

**Every component MUST follow this exact structure**:

```
src/components/{ComponentName}/
  ├── index.tsx                      # Public exports (component + types)
  ├── {ComponentName}.tsx            # Component implementation
  └── __tests__/
      ├── {ComponentName}.spec.tsx   # Tests
      └── __snapshots__/             # Jest snapshots (auto-generated)
```

**Reference**: See [src/components/Button/](src/components/Button/) for complete example.

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `TextField.tsx`, `Card.tsx`)
- **Tests**: `{ComponentName}.spec.tsx` (NOT `.test.tsx`)
- **Stories**: `{ComponentName}.stories.tsx`
- **Index files**: Always `index.tsx` or `index.ts`

## Export Pattern

All components follow a consistent export pattern:

**Component index.tsx** ([example](src/components/Button/index.tsx)):
```typescript
// Export both component and types
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

**Components barrel export** (`src/components/index.ts`):
```typescript
// Re-export all components
export * from './Button';
export * from './TextField';
// ... etc
```

**Main library entry** (`src/index.ts`):
```typescript
// Re-export everything from components
export * from './components';
```

## TypeScript Standards

- **Strict Mode**: Enabled in [tsconfig.json](tsconfig.json) - all code must comply
- **Props Interfaces**: Always export interfaces for component props
- **Props Naming**: Use pattern `{ComponentName}Props` (e.g., `ButtonProps`)
- **No Implicit Any**: All variables and parameters must have explicit types
- **Return Types**: Prefer explicit return types for complex functions
- **Module Resolution**: `nodenext` (ESM-style imports)

## Component Implementation Pattern

**Reference**: [Button.tsx](src/components/Button/Button.tsx)

```typescript
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// 1. Export interface for props
export interface ComponentNameProps {
  onPress: () => void;
  text: string;
  // ... other props
}

// 2. Export functional component
export const ComponentName = ({ onPress, text }: ComponentNameProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

// 3. Styles using StyleSheet.create()
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: "purple",
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
```

## Styling Conventions

- **Always use `StyleSheet.create()`** from `react-native`
- **Inline styles** for component-specific styling (defined in component file)
- **Future**: Shared theme/design tokens to be established as library grows
- **Cross-platform**: Use only React Native core components and styles (avoid platform-specific code unless necessary)

---

# Testing Guidelines

## Testing Framework & Configuration

- **Framework**: Jest 30.2.0 with React Native preset
- **Testing Library**: @testing-library/react-native 13.3.3
- **Configuration**: [jest.config.ts](jest.config.ts)
- **Setup File**: [src/setupTests.ts](src/setupTests.ts) - Configures fake timers

## Test File Organization

- **Location**: `__tests__/` subdirectory **within component folder**
- **Naming**: `{ComponentName}.spec.tsx`
- **Snapshots**: Auto-generated in `__tests__/__snapshots__/`

## Test Pattern (Three Categories)

**Reference**: [Button.spec.tsx](src/components/Button/__tests__/Button.spec.tsx)

```typescript
import { jest, describe, test, expect } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  // Category 1: Snapshot Test
  test('should match snapshot', () => {
    const component = render(<ComponentName text="Test" />);
    expect(component).toMatchSnapshot();
  });

  // Category 2: Render Test
  test('should render with text', () => {
    const { getByText } = render(<ComponentName text="Test Text" />);
    expect(getByText('Test Text')).toBeDefined();
  });

  // Category 3: Interaction Test
  test('should handle press event', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ComponentName text="Press me" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Press me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

## Test Requirements

**All new components MUST have**:
- ✅ Snapshot test (`toMatchSnapshot()`)
- ✅ Render test (component renders correctly with props)
- ✅ Interaction tests for all user-facing events (onPress, onChange, onFocus, etc.)

**Additional Guidelines**:
- Use `jest.fn()` for mock callbacks
- Update snapshots only when UI changes are intentional (`npm run test:update`)
- Test edge cases and error states where applicable
- Coverage is enabled by default (excludes index files)

## Running Tests

```bash
npm test                # Run all tests with coverage
npm run test:update     # Update snapshots after intentional UI changes
```

---

# Architecture Decisions

## Monorepo Structure

**Structure**:
- **Root package** (marys-ui): UI library source + build configuration
- **Workspace** (storybook/): Development and documentation environment

**Rationale**:
- Allows iterative development while consuming the library as end users will
- Storybook workspace imports from built `dist/` directory, mirroring real usage
- Keeps development tooling separate from published package
- Enables dual Storybook setup without complicating library dependencies

## Build System Choice

**Chosen**: TypeScript compiler (tsc) - No bundler

**Output**:
- Format: CommonJS modules (dist/)
- Includes: Compiled JavaScript + TypeScript declaration files (.d.ts)
- Source maps: Not currently generated

**Rationale**:
- Simple, standard npm package structure
- TypeScript declarations enable autocomplete in consuming apps
- No bundler complexity (Rollup, Webpack, Vite) for a library
- Works seamlessly with both React Native and React Native Web

**Configuration**: [tsconfig.json](tsconfig.json)

## Dual Storybook Setup

**Why Two Storybooks?**

1. **Web Storybook** (Vite-based):
   - **Pro**: Extremely fast hot-reload, instant feedback
   - **Con**: Uses react-native-web, may not reflect true native behavior
   - **Use Case**: Quick iteration during component development

2. **On-Device Storybook** (React Native):
   - **Pro**: Real React Native environment, accurate testing
   - **Con**: Slower startup, requires simulator/device
   - **Use Case**: Final verification before PR, platform-specific testing

**Workflow**: Develop on web Storybook, verify on on-device Storybook.

## Cross-Platform Approach

**Strategy**: Write once, render everywhere

**Guidelines**:
- Use **React Native core components** (View, Text, TouchableOpacity, etc.)
- Avoid platform-specific code unless absolutely necessary
- If platform-specific code is needed, use `Platform.OS` checks
- Test on both web (react-native-web) and native (iOS/Android simulators)
- Prioritize components that work across all platforms

**Compatibility Matrix**:
- React Native (iOS/Android): Primary target
- React Native Web (browser): Supported
- Platform-specific features: Avoid unless critical

---

# DevOps Integration

## Target Infrastructure

- **Azure DevOps Pipelines**: Automated build, test, and deployment
- **Azure DevOps Artifacts**: Private npm registry for package distribution
- **Azure App Services**: Hosting for Storybook web documentation

## Expected Pipeline Outputs

1. **NPM Package**:
   - Built library (dist/) published to Azure Artifacts
   - Triggered on: Merge to main branch
   - Versioning: Manual (update package.json)

2. **Storybook Web**:
   - Static site built and deployed to Azure App Services
   - URL: https://your-storybook-url.azurewebsites.net (to be configured)
   - Triggered on: Merge to main branch

3. **Storybook Native App**:
   - Standalone React Native app (deployment strategy TBD)

## Build Requirements

Pipeline must execute these commands successfully:

```bash
npm ci                                        # Clean install
npm run build                                 # Build library (dist/)
npm test                                      # Run tests with coverage (quality gate)
npm run build-storybook --workspace=storybook # Build static Storybook
```

## Current State

- **Pipeline Files**: Not yet created (planned for future phase)
- **Manual Process**: Currently manual build, test, and publish
- **Versioning**: Manual update of package.json version field

---

# Common Tasks for Claude Code

This section provides guidance for Claude Code on how to approach common development tasks.

## When Asked to "Add a Component"

Follow these steps **in order**:

1. **Create directory structure**:
   ```bash
   mkdir -p src/components/{ComponentName}/__tests__
   ```

2. **Implement component** (`src/components/{ComponentName}/{ComponentName}.tsx`):
   - Define TypeScript interface for props
   - Export interface and component
   - Use StyleSheet.create() for styles
   - Use React Native core components

3. **Create index file** (`src/components/{ComponentName}/index.tsx`):
   ```typescript
   export { ComponentName } from './ComponentName';
   export type { ComponentNameProps } from './ComponentName';
   ```

4. **Write tests** (`src/components/{ComponentName}/__tests__/{ComponentName}.spec.tsx`):
   - Snapshot test
   - Render test
   - Interaction tests for all user events

5. **Register component** in `src/components/index.ts`:
   ```typescript
   export * from './ComponentName';
   ```

6. **Create Storybook story** (`storybook/stories/{ComponentName}/{ComponentName}.stories.tsx`):
   - Default story
   - Variant stories showing different prop combinations

7. **Verify implementation**:
   ```bash
   npm test          # All tests pass
   npm run build     # Compiles successfully
   npm run dev:web   # Component appears in Storybook
   ```

**Reference**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guide with templates.

## When Asked to "Review Code"

Check the following **in order**:

1. **Component Structure**:
   - ✅ Follows directory pattern (Component.tsx + index.tsx + __tests__/)
   - ✅ Files named correctly (PascalCase component, .spec.tsx test)

2. **TypeScript Compliance**:
   - ✅ Props interface exported (named `{ComponentName}Props`)
   - ✅ Strict mode compliance (no `any`, all types explicit)
   - ✅ No TypeScript errors when running `npm run build`

3. **Exports**:
   - ✅ Component exported from index.tsx
   - ✅ Props interface exported from index.tsx
   - ✅ Component registered in src/components/index.ts

4. **Tests**:
   - ✅ Tests exist in __tests__/ directory
   - ✅ Three categories covered: snapshot, render, interaction
   - ✅ All tests passing (`npm test`)

5. **Storybook**:
   - ✅ Story file exists in storybook/stories/{ComponentName}/
   - ✅ At least one story variant defined
   - ✅ Component visible in Storybook web/native

6. **Code Quality**:
   - ✅ Uses StyleSheet.create() for styling
   - ✅ Uses React Native core components
   - ✅ No platform-specific code (unless documented why)
   - ✅ Follows existing code style (see Button as reference)

## When Asked About "Publishing"

The publishing process:

1. **Build the library**:
   ```bash
   npm run build
   ```

2. **Run tests** (quality gate):
   ```bash
   npm test
   ```
   Tests must pass before publishing.

3. **Update version** (manual for now):
   - Edit `package.json` version field
   - Follow semantic versioning (MAJOR.MINOR.PATCH)

4. **Publish to registry**:
   - **Manual**: `npm publish` (when Azure Artifacts configured)
   - **Pipeline**: Merge to main triggers automated publish (when pipeline exists)

5. **Tag release** (optional but recommended):
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## When Troubleshooting

**Common issues and solutions**:

- **TypeScript compilation errors**: Check [tsconfig.json](tsconfig.json), ensure strict mode compliance
- **Tests failing**: Check [jest.config.ts](jest.config.ts) and [src/setupTests.ts](src/setupTests.ts)
- **Storybook not showing component**:
  - Verify story file exists in `storybook/stories/`
  - Check Storybook config in `storybook/.storybook/main.ts` (web) or `storybook/.rnstorybook/` (native)
  - Rebuild: `npm run build` then restart Storybook
- **Import errors in consuming app**:
  - Verify `dist/` was built successfully
  - Check `package.json` fields: `main` and `types`
  - Ensure component is exported from `src/index.ts`

---

# Project Constraints & Boundaries

## Technology Constraints

- **React Native**: Version 0.81.5 (specific version, upgrade carefully with testing)
- **React**: Version 19.1.0 (latest)
- **TypeScript**: Version 5.9.3 (strict mode enabled)
- **Node.js**: 18+ recommended (add .nvmrc if needed)

## Design System Scope

**In Scope**:
- Healthcare-focused UI components
- Reusable components (buttons, inputs, cards, modals, etc.)
- Layout helpers (spacing, alignment)
- Typography, colors, spacing standards (to be established)
- Accessibility compliance (future consideration)

**Out of Scope**:
- Business logic (UI library only)
- API clients or data fetching (consuming apps handle this)
- Application routing (consuming apps use React Navigation or similar)
- Platform-specific native modules (keep cross-platform)
- Authentication/authorization (app-level concern)

## When to ASK vs. IMPLEMENT

### Ask the User When:

- **Breaking changes** to existing component APIs
- **Adding new dependencies**, especially native modules (requires native setup)
- **Changing build/test configuration** (impacts all developers)
- **Architecture decisions** affecting multiple components or the entire library
- **Accessibility patterns** to establish (need user/stakeholder input)
- **Design token systems** (colors, spacing, typography scales)
- **Major refactoring** that changes file structure or exports

### Implement Directly When:

- **Adding new components** following established patterns (use templates, existing components as reference)
- **Fixing bugs** that don't change component APIs
- **Adding tests** for existing components
- **Updating documentation** (CLAUDE.md, CONTRIBUTING.md, etc.)
- **Refactoring without API changes** (internal improvements)
- **Adding Storybook stories** for existing components
- **Updating TypeScript types** to fix errors or improve type safety (as long as no breaking changes)

**Rule of Thumb**: If it might break existing code or requires a decision on approach, ask. If it follows established patterns and is non-breaking, implement.

---

# Additional Documentation

## Available Now

- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Step-by-step guide for adding components, includes templates and checklist
- **[README.md](./README.md)**: Project overview, installation, usage examples, and scripts
- **[templates/](./templates/)**: Component boilerplate templates for quick scaffolding

## Future Documentation (To Be Created as Needed)

- **DEVELOPMENT.md**: Detailed development environment setup, IDE configuration, troubleshooting
- **docs/ARCHITECTURE.md**: Deep dive on architecture decisions, design patterns, and rationale
- **docs/TROUBLESHOOTING.md**: Common issues and solutions, FAQ
- **docs/CI_CD_SETUP.md**: Azure DevOps pipeline configuration and deployment guide
- **.nvmrc**: Node version specification for consistency

---

# Quick Reference

## Key File Locations

- **Main Entry**: [src/index.ts](src/index.ts)
- **Components**: [src/components/](src/components/)
- **Example Component**: [src/components/Button/](src/components/Button/)
- **Example Test**: [src/components/Button/__tests__/Button.spec.tsx](src/components/Button/__tests__/Button.spec.tsx)
- **Jest Config**: [jest.config.ts](jest.config.ts)
- **TypeScript Config**: [tsconfig.json](tsconfig.json)
- **Package Info**: [package.json](package.json)
- **Storybook Workspace**: [storybook/](storybook/)
- **Component Templates**: [templates/](templates/)

## Most Used Commands

```bash
npm install                # Install dependencies
npm run dev:web            # Development mode (web Storybook, fastest)
npm run dev                # Development mode (on-device Storybook)
npm test                   # Run tests with coverage
npm run test:update        # Update Jest snapshots
npm run build              # Build library to dist/
```

## Component Creation Quick Start

1. Use templates from [templates/](templates/) directory
2. Follow step-by-step guide in [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Reference [Button component](src/components/Button/) as example
4. Run `npm test` and `npm run build` to verify 