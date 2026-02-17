import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          storybookTest({
            configDir: path.resolve(dirname, './storybook/.storybook'),
            storybookScript: 'npm run storybook-test'
          }),
        ],
        test: {
          name: "storybook",
          dir: dirname,
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./tests/vitest.setup.ts"],
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: {
            "react-native": "react-native-web",
          },
        },
        test: {
          name: "unitTests",
          include: ["src/**/__tests__/**/*-web.test.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./tests/vitest.setup.ts"],
        },
      },
    ],
  },
});
