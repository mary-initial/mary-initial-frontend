import React from "react";
import { Text, View } from "react-native";

const TabsScreen = ({
  name,
  options,
}: {
  name: string;
  options?: { title?: string };
}) => (
  <View testID={`tab-${name}`}>
    <Text>{options?.title ?? name}</Text>
  </View>
);

const Tabs = ({
  children,
}: {
  children: React.ReactNode;
  screenOptions?: unknown;
}) => <View testID="bottom-tabs">{children}</View>;

Tabs.Screen = TabsScreen;

const ExpoRoot = ({
  context,
}: {
  context: (id: string) => { default?: React.ComponentType } | undefined;
  location?: string;
}) => {
  const layoutModule = context("./_layout");
  const Layout = layoutModule?.default;
  return Layout ? (
    <View>
      <Layout />
    </View>
  ) : null;
};

export { Tabs, ExpoRoot };
