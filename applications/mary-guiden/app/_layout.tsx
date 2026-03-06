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
} from "@marys-ui";

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
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.EXPO_PUBLIC_API_URL,
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <MaryUIProvider brandName="marys">
        <BottomTabs tabScreens={tabScreens} />
      </MaryUIProvider>
    </ApolloProvider>
  );
}
