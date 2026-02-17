# marys-ui

Design system for hospital user guidance - A React Native UI library for healthcare applications.

## Features

- 🏥 **Healthcare-focused** UI components designed for hospital user guidance
- 📱 **Cross-platform** - Works on React Native (iOS/Android) and React Native Web
- 🔒 **TypeScript** with strict type safety for robust development
- 📚 **Comprehensive documentation** via dual Storybook setup (web and on-device)
- ✅ **Fully tested** with Jest and React Testing Library
- ♿ **Accessibility** considerations (ongoing improvements)

## Installation

```bash
npm install marys-ui
# or
yarn add marys-ui
```

## Usage

```typescript
import { Button } from 'marys-ui';

export const MyComponent = () => {
  return (
    <Button
      text="Click me"
      onPress={() => console.log('Button pressed')}
    />
  );
};
```

## Available Components

- **Button** - Interactive button component with customizable text and press handler
- _More components coming soon_

## Documentation

- **[Component Showcase](https://your-storybook-url.azurewebsites.net)** - Interactive Storybook deployed to Azure App Services
- **[Contributing Guide](./CONTRIBUTING.md)** - How to add new components
- **[Project Context](./CLAUDE.md)** - Comprehensive project documentation for AI-assisted development

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development mode (TypeScript watch + on-device Storybook)
npm run dev

# Start web-only development (faster iteration)
npm run dev:web
```

When using `npm run dev:web`, open your browser to [http://localhost:6006](http://localhost:6006) to view the Storybook.

### Available Scripts

- **`npm run dev`** - Watch mode with on-device Storybook (Expo)
- **`npm run dev:web`** - Watch mode with web Storybook (port 6006)
- **`npm test`** - Run tests with coverage
- **`npm run test:update`** - Update Jest snapshots
- **`npm run build`** - Build library to dist/
- **`npm run storybook`** - On-device Storybook only (without TypeScript watch)
- **`npm run storybook:web`** - Web Storybook only (without TypeScript watch)

### Project Structure

```
marys-ui/
├── src/                    # UI library source code
│   ├── components/         # React Native components
│   │   ├── Button/
│   │   └── index.ts       # Components barrel export
│   ├── index.ts           # Main entry point
│   └── setupTests.ts      # Test configuration
├── dist/                  # Built output (compiled JS + TypeScript declarations)
├── storybook/             # Development workspace (npm workspace)
│   ├── .storybook/        # Web Storybook configuration
│   ├── .rnstorybook/      # React Native Storybook configuration
│   ├── stories/           # Component stories
│   └── package.json       # Workspace package.json
├── templates/             # Component scaffolding templates
├── CLAUDE.md              # Comprehensive project documentation
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md             # This file
```

## Requirements

- **React Native** 0.81.5 or higher
- **React** 19.1.0 or higher
- **TypeScript** 5.9.3 or higher
- **Node.js** 18+ (recommended)

## Technology Stack

- **Framework**: React Native with React Native Web support
- **Language**: TypeScript (strict mode enabled)
- **Testing**: Jest with React Testing Library
- **Documentation**: Storybook (dual setup: web and on-device)
- **Build**: TypeScript compiler (tsc)
- **CI/CD**: Azure DevOps Pipelines
- **Distribution**: Azure DevOps Artifacts (private npm registry)
- **Hosting**: Azure App Services (Storybook web)

# Testing
- Unit testing with Jest
- E2E testing with Maestro

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Setting up your development environment
- Creating new components
- Writing tests
- Submitting pull requests

### Quick Contribution Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-new-component`)
3. Follow the [component creation guide](./CONTRIBUTING.md)
4. Ensure tests pass (`npm test`) and build succeeds (`npm run build`)
5. Commit your changes
6. Push to your branch and create a Pull Request

## Development Workflow

### Adding a Component

1. Create component directory: `src/components/YourComponent/`
2. Implement component with TypeScript
3. Write tests (snapshot, render, interaction)
4. Create Storybook story
5. Register in `src/components/index.ts`
6. Verify with `npm test` and `npm run build`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed step-by-step instructions and templates.

### Testing in a Consuming App

To test the library in a real application before publishing:

```bash
# In marys-ui directory
npm pack

# This creates: marys-ui-1.0.0.tgz

# In your consuming app
npm install /path/to/marys-ui-1.0.0.tgz
```

## Monorepo Structure

This project uses npm workspaces:

- **Root package (marys-ui)**: The UI library that gets published
- **Workspace (storybook/)**: Development environment for building and documenting components

The workspace consumes the library from the built `dist/` directory, mirroring how end users will use it.

## Publishing

The library is published to Azure DevOps Artifacts (private npm registry).

**Manual publish** (when Azure Artifacts is configured):
```bash
npm run build    # Build the library
npm test         # Ensure all tests pass
npm publish      # Publish to registry
```

**Automated publish** (future): Merge to `main` branch triggers Azure DevOps pipeline.

## Architecture Decisions

- **TypeScript compiler only**: No bundler complexity, simple npm package structure
- **Dual Storybook**: Web for fast iteration, on-device for accurate testing
- **Cross-platform first**: Use React Native core components, avoid platform-specific code
- **Strict mode**: TypeScript strict mode enforced for type safety
- **Collocated tests**: Tests live with components in `__tests__/` directories

For deeper architecture rationale, see [CLAUDE.md](./CLAUDE.md).

## Browser & Platform Support

- **React Native**: iOS 13+, Android 5.0+
- **React Native Web**: Modern browsers (Chrome, Firefox, Safari, Edge)

# Troubleshooting
Common issue that can occur

## iOS
* When running `expo run:ios` the first time the app can crash with following error:
  ```[CoreFoundation] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[RCTView setColor:]: unrecognized
selector sent to instance 0x1156901d0'
  ```
  This can be solved by running commands:
    * `cd tests/example/ios`
    * `rm -rf Pods Podfile.lock build`
    * `pod install`

