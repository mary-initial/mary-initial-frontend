// GENERATED from Figma Variables — run npm run tokens:sync to update

import { Easing } from "react-native";

export const animationTokens = {
  ease: {
    in: Easing.bezier(0.5, 0, 0.9, 0.5),
    out: Easing.bezier(0.2, 0.7, 0.3, 1),
    inOut: Easing.bezier(0.2, 0, 0.2, 1),
    outBackEmphasized: Easing.bezier(0.3, 1.6, 0.6, 1),
    outBack: Easing.bezier(0.3, 1.4, 0.6, 1),
  },
  duration: {
    xfast: 150,
    fast: 300,
    medium: 400,
    long: 600,
  },
} as const;

export type AnimationTokens = typeof animationTokens;
