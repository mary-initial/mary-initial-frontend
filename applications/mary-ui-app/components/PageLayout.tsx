import { MaryUIProvider } from "@marys-ui";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MaryUIProvider brandName="marys">
        <View style={styles.container}>
          <View style={styles.content}>
            {children}
          </View>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </View>
      </MaryUIProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    paddingVertical: 18,
    backgroundColor: 'rgb(103, 116, 130)',
    marginHorizontal: 18,
    borderRadius: 12
  },
  backText: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
