import { useQuery } from "@apollo/client/react";
import { graphql } from "@generated/gql";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GET_GREETING = graphql(`
  query GetGreeting {
    greeting {
      message
    }
  }
`);

export default function Marrys() {
  const { loading, error, data } = useQuery(GET_GREETING);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <Text>Marry's Page</Text>
        <Text style={{ marginBottom: 20 }}>{data?.greeting?.message}</Text>
      </SafeAreaView>
    </View>
  );
}
