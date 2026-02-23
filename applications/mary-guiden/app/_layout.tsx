import { MaryUIProvider } from "@marys-ui";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MaryUIProvider initialBrand="marys" initialMode="light">
      <Stack />
    </MaryUIProvider>
  )
}
