import { Button } from "@marys-ui";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>Example component:</Text>
      <Button text="Press the button" onPress={() => {}}></Button>
    </View>
  );
}
