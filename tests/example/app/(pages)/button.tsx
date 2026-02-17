import { Text } from "react-native";
import { useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { Button } from "@marys-ui";

export default function Index() {
    const [count, setCount] = useState(0);

  return (
    <PageLayout>
      <Button text="Click me!" onPress={() => setCount(count + 1)}></Button>
      <Text style={{marginTop: 10}}>No of times clicked: {count}</Text>
    </PageLayout>
  );
}
