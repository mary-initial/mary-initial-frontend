// GENERATED from Figma Variables — run npm run tokens:sync to update

export const gridTokens = {
  mobile: {
    outer: 8,
    inner: 32,
    gutter: 16,
    columns: 2,
  },
  tablet: {
    outer: 16,
    inner: 40,
    gutter: 24,
    columns: 4,
  },
  desktop: {
    outer: 24,
    inner: 56,
    gutter: 24,
    columns: 4,
  },
} as const;

export type GridTokens = typeof gridTokens;
