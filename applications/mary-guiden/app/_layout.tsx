import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import {
  ActivityStar,
  ActivityStarFill,
  BottomTabs,
  Food,
  FoodFill,
  Learn,
  LearnFill,
  MaryHome,
  MaryHomeFill,
  MaryUIProvider,
  Progression,
  ProgressionFill,
  useThemeFonts,
} from "@marys-ui";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

const tabScreens = [
  { name: "index", title: "MARYS", Icon: MaryHome, IconFill: MaryHomeFill },
  {
    name: "activities",
    title: "Aktiviteter",
    Icon: ActivityStar,
    IconFill: ActivityStarFill,
  },
  { name: "food", title: "Mad", Icon: Food, IconFill: FoodFill },
  { name: "learn-about", title: "Viden om", Icon: Learn, IconFill: LearnFill },
  {
    name: "treatment",
    title: "Forløb",
    Icon: Progression,
    IconFill: ProgressionFill,
  },
];

export default function RootLayout() {
  const [loaded, error] = useThemeFonts();

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.EXPO_PUBLIC_API_URL,
    }),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <MaryUIProvider brandName="marys">
        <BottomTabs tabScreens={tabScreens} />
      </MaryUIProvider>
    </ApolloProvider>
  );
}
