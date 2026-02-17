import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, RelativePathString } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

interface PageLink {
  key: string;
  link: RelativePathString;
}

export default function Index() {
  const pages: PageLink[] = [
    { key: 'Button', link: './button' }
  ];

  const linkItem = ({ item }: { item: PageLink }) => (
    <Link href={item.link} asChild>
      <Pressable style={styles.linkItem}>
        <Text style={styles.linkText}>{item.key}</Text>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Link>
  );

  const separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={pages}
          renderItem={linkItem}
          ItemSeparatorComponent={separator}
          ListHeaderComponent={
            <Text style={styles.title}>Mary UI Components</Text>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    paddingVertical: 24,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  linkText: {
    fontSize: 17,
    color: '#1a1a2e',
  },
  chevron: {
    fontSize: 22,
    color: '#999',
  },
  separator: {
    height: 8,
  },
});
