import { Button } from "@marys-ui";
import { useState } from "react";
import { Text } from "react-native";
import { PageLayout } from "../../components/PageLayout";

export default function Index() {
    const [count, setCount] = useState(0);

  return (
    <PageLayout>
      <Button text="Click me!" onPress={() => setCount(count + 1)} variant="primary"></Button>
      <Text style={{marginTop: 10}}>No of times clicked: {count}</Text>
    </PageLayout>
  );
}
