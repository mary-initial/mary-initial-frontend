import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
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
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor: focused
                      ? theme.colors.buttons.standard.secondary
                      : "transparent",
                  },
                ]}
              >
                {focused ? (
                  <IconFill color={theme.colors.icon.standard} />
                ) : (
                  <Icon color={theme.colors.icon.standard.disabled} />
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 999,
    top: -12,
    paddingBottom: 24,
  },
});
