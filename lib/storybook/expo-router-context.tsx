import { ExpoRoot } from "expo-router";
import React from "react";

type RouteModule = {
  default: React.ComponentType;
  [key: string]: unknown;
};

type InMemoryRoutes = Record<string, RouteModule | React.ComponentType>;

/**
 * Creates an in-memory require context compatible with expo-router's ExpoRoot.
 * Replicates expo-router/build/testing-library/context-stubs#inMemoryContext
 * without the Node.js `path` dependency.
 */
function inMemoryContext(routes: InMemoryRoutes) {
  return Object.assign(
    function (id: string) {
      const normalized = id.replace(/^\.\//, "").replace(/\.\w*$/, "");
      const route = routes[normalized];
      return typeof route === "function" ? { default: route } : route;
    },
    {
      resolve: (key: string) => key,
      id: "0",
      keys: () =>
        Object.keys(routes).map((key) => {
          key = key.replace(/^\.\//, "");
          if (!key.startsWith("/")) key = `./${key}`;
          if (!/\.\w+$/.test(key)) key = `${key}.js`;
          return key;
        }),
    }
  );
}

// Force synchronous imports for web/Storybook
if (typeof process !== "undefined") {
  process.env.EXPO_ROUTER_IMPORT_MODE = "sync";
}

/**
 * Prevent expo-router from hijacking the browser URL in the Storybook iframe.
 * expo-router's createMemoryHistory calls window.history.pushState/replaceState
 * which changes the iframe URL, breaking Storybook's navigation.
 *
 * Patched at module level so it's active before ExpoRoot's first render.
 */
if (typeof window !== "undefined" && window.history) {
  const origPushState = window.history.pushState.bind(window.history);
  const origReplaceState = window.history.replaceState.bind(window.history);

  // Allow state changes but strip the URL argument,
  // so the iframe URL stays as Storybook expects it.
  window.history.pushState = (state: unknown, title: string) => {
    origPushState(state, title);
  };
  window.history.replaceState = (state: unknown, title: string) => {
    origReplaceState(state, title);
  };

  // Block popstate events from reaching expo-router's listener,
  // preventing Storybook URL changes from triggering navigation.
  window.addEventListener(
    "popstate",
    (e) => e.stopImmediatePropagation(),
    true
  );
}

/**
 * Wraps a component tree in a real expo-router ExpoRoot with in-memory routes.
 * Isolates the router from the browser URL so it doesn't interfere with Storybook.
 *
 * @example
 * ```tsx
 * <ExpoRouterContext
 *   routes={{
 *     '_layout': { default: () => <Tabs>...</Tabs> },
 *     'index': { default: () => <Text>Home</Text> },
 *   }}
 *   initialUrl="/"
 * />
 * ```
 */
export function ExpoRouterContext({
  routes,
  initialUrl = "/",
}: {
  routes: InMemoryRoutes;
  initialUrl?: string;
}) {
  const context = React.useMemo(() => inMemoryContext(routes), [routes]);

  return <ExpoRoot context={context} location={initialUrl} />;
}
