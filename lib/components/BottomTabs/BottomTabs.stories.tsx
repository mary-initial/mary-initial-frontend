import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
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
import { BottomTabs } from "./BottomTabs";

const meta = {
  title: "BottomTabs",
  component: BottomTabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof BottomTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

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

// Large — Active states
export const BottomNavigationLinks: Story = {
  args: {
    tabScreens,
  },
};
