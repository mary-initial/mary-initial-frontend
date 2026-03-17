import { Tabs } from "expo-router";
import { useTheme } from "../../theme";

export interface BottomTabsProps {
  tabScreens: {
    name: string;
    title: string;
    Icon: React.ElementType;
    IconFill: React.ElementType;
  }[];
}

export const BottomTabs = ({ tabScreens }: BottomTabsProps) => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.txt.standard.default,
        tabBarInactiveTintColor: theme.colors.txt.standard.muted,
        tabBarStyle: {
          paddingTop: 20,
          height: 108,
          backgroundColor: theme.colors.buttons.navigation,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {tabScreens.map(({ name, title, Icon, IconFill }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconFill color={theme.colors.icon.standard.default} />
              ) : (
                <Icon color={theme.colors.icon.standard.disabled} />
              ),
          }}
        />
      ))}
    </Tabs>
  );
};
