import { createElement } from "react";
import { View } from "react-native";

export default function SvgMock() {
  return createElement(View, { accessible: true, accessibilityRole: "image" });
}
