/* eslint-disable @typescript-eslint/no-require-imports */
import { useFonts } from "expo-font";

export const useThemeFonts = () => {
  return useFonts({
    "Mari-Regular": require("../fonts/Mari-Regular.otf"),
    "Mari-Light": require("../fonts/Mari-Light.otf"),
    "Mari-Bold": require("../fonts/Mari-Bold.otf"),
    "Mari-Poster": require("../fonts/Mari-Poster.otf"),
    "Mari-Book": require("../fonts/Mari-Book.otf"),
  });
};
