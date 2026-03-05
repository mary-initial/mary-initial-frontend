import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import {
  ActivityStar,
  ActivityStarFill,
  Food,
  FoodFill,
  Learn,
  LearnFill,
  MaryHome,
  MaryHomeFill,
  MaryUIProvider,
  Progression,
  ProgressionFill,
  useTheme,
} from "@marys-ui";
import { Tabs } from "expo-router";
import { View } from "react-native";

function TabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: focused ? "white" : "transparent",
      }}
    >
      {children}
    </View>
  );
}

const TABS = [
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
] as const;

export default function RootLayout() {
  const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URL }),
    cache: new InMemoryCache(),
  });
  const { theme } = useTheme();

  return (
    <ApolloProvider client={client}>
      <MaryUIProvider brandName="marys">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              paddingTop: 20,
              height: 100,
              backgroundColor: theme.colors.buttons.navigation,
            },
          }}
        >
          {TABS.map(({ name, title, Icon, IconFill }) => (
            <Tabs.Screen
              key={name}
              name={name}
              options={{
                title,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused}>
                    {focused ? <IconFill /> : <Icon />}
                  </TabIcon>
                ),
              }}
            />
          ))}
        </Tabs>
      </MaryUIProvider>
    </ApolloProvider>
  );
}
