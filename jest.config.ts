import type { Config } from 'jest';

const config: Config = {
  fakeTimers: {
    doNotFake: ['nextTick'],
    timerLimit: 1000,
  },
  preset: 'react-native',
  displayName: 'marys-ui',
  testPathIgnorePatterns: [
    '<rootDir>/package',
    '<rootDir>/storybook'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@react-native|react-native|storybook|@storybook)/)'
  ],
  coveragePathIgnorePatterns: [],
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.test.tsx',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
    '!src/**/index.tsx'
  ],
  collectCoverage: true,
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testRegex: '/__tests__/.*-rn\.test\.(ts|tsx|js)$',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;