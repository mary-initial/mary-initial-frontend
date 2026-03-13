import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["default", "github-actions"]
      : ["default"],
    projects: [
      {
        plugins: [
          storybookTest({
            configDir: path.resolve(dirname, "./storybook/.storybook"),
            storybookScript: "npm run storybook:web -- --no-open",
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
    ],
  },
});
