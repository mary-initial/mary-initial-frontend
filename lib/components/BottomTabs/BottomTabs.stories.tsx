import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";
import {
  ActivityStar,
  ActivityStarFill,
  Food,
  FoodFill,
  Learn,
  LearnFill,
  MaryHome,
  MaryHomeFill,
  Progression,
  ProgressionFill,
} from "../../icons";
import { ExpoRouterContext } from "../../storybook/expo-router-context";
import { BottomTabs } from "./BottomTabs";

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

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>{name}</Text>
  </View>
);

const routes = {
  _layout: {
    default: () => <BottomTabs tabScreens={tabScreens} />,
  },
  index: { default: () => <PlaceholderScreen name="MARYS" /> },
  activities: { default: () => <PlaceholderScreen name="Aktiviteter" /> },
  food: { default: () => <PlaceholderScreen name="Mad" /> },
  "learn-about": { default: () => <PlaceholderScreen name="Viden om" /> },
  treatment: { default: () => <PlaceholderScreen name="Forløb" /> },
};

const meta = {
  title: "BottomTabs",
  component: BottomTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof BottomTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BottomNavigationLinks: Story = {
  args: {
    tabScreens,
  },
  render: () => <ExpoRouterContext initialUrl="/" routes={routes} />,
  parameters: {
    docs: {
      source: {
        code: `
<BottomTabs
  tabScreens={[
    { name: "index", title: "MARYS", Icon: MaryHome, IconFill: MaryHomeFill },
    { name: "activities", title: "Aktiviteter", Icon: ActivityStar, IconFill: ActivityStarFill },
    { name: "food", title: "Mad", Icon: Food, IconFill: FoodFill },
    { name: "learn-about", title: "Viden om", Icon: Learn, IconFill: LearnFill },
    { name: "treatment", title: "Forløb", Icon: Progression, IconFill: ProgressionFill },
  ]}
/>`,
      },
    },
  },
};
