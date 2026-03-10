/* eslint-disable @typescript-eslint/no-require-imports */
import { useFonts } from "expo-font";

export const useThemeFonts = () => {
  return useFonts({
    "Inter-Regular": require("./fonts/Inter_28pt-Regular.ttf"),
    "Inter-Light": require("./fonts/Inter_28pt-Light.ttf"),
    "Inter-Bold": require("./fonts/Inter_28pt-Bold.ttf"),
    "Inter-ExtraBold": require("./fonts/Inter_28pt-ExtraBold.ttf"),
  });
};
