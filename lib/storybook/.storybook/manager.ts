import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

addons.setConfig({
  theme: themes.light,
});

addons.register("marys-ui/theme-sync", (api) => {
  const channel = api.getChannel();
  if (!channel) return;

  channel.on(GLOBALS_UPDATED, ({ globals }: { globals: Record<string, unknown> }) => {
    const colorMode = globals?.colorMode ?? "light";
    addons.setConfig({
      theme: colorMode === "dark" ? themes.dark : themes.light,
    });
  });
});
