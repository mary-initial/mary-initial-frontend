import { SurfaceMode } from "./types";

/**
 * Resolve surface mode based on wether the element is on color
 * @param onColor wether the element is on color
 * @returns the surface mode
 */
export function resolveSurfaceMode(onColor: boolean): SurfaceMode {
  return onColor ? "impact" : "surface";
}
