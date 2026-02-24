import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Button } from "@marys-ui";
import { Text, View } from "react-native";

const GET_GREETING = gql`
  query GetGreeting {
    greeting {
      message
    }
  }
`;

export default function Index() {
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
      <Text style={{ marginBottom: 20 }}>Example component:</Text>
      <Text style={{ marginBottom: 20 }}>{data?.greeting?.message}</Text>
      <Button text="Press the button" onPress={() => {}}></Button>
    </View>
  );
}
