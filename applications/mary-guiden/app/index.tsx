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

export default function Marys() {
  const { loading, data } = useQuery(GET_GREETING);

  if (loading) return <Text>Loading...</Text>;

  const message = data?.greeting?.message;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <Text>Mary&apos;s Page</Text>
        {message ? <Text style={{ marginBottom: 20 }}>{message}</Text> : <></>}
      </SafeAreaView>
    </View>
  );
}
