// GENERATED from Figma Variables — run npm run tokens:sync to update

export const animationTokens = {
  ease: {
    in: [0.5, 0, 0.9, 0.5],
    out: [0.2, 0.7, 0.3, 1],
    inOut: [0.2, 0, 0.2, 1],
    outBackEmphasized: [0.3, 1.6, 0.6, 1],
    outBack: [0.3, 1.4, 0.6, 1],
  },
  duration: {
    xfast: 150,
    fast: 300,
    medium: 400,
    long: 600,
  },
} as const;

export type AnimationTokens = typeof animationTokens;
