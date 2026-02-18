import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          storybookTest({
            configDir: path.resolve(dirname, './storybook/.storybook'),
            storybookScript: 'npm run storybook:web -- --no-open'
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
          setupFiles: ["./vitest.setup.ts"],
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
          include: ["**/__tests__/**/*-web.test.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
});
