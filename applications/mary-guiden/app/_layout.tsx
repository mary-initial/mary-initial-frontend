import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { MaryUIProvider } from "@marys-ui";
import { Stack } from "expo-router";

export default function RootLayout() {
  const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URL }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <MaryUIProvider brandName="marys">
        <Stack />
      </MaryUIProvider>
    </ApolloProvider>
  );
}
