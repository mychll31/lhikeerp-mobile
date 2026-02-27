import Body from "@/components/Body";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, Text } from "react-native";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  return (
    <Body
      withoutDecoration
      noTabs
      contentStyle={{ alignItems: "center", justifyContent: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            setRefreshing(false);
          }}
        />
      }
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Go to Tabs" onPress={() => router.replace("/(tabs)")} />
    </Body>
  );
}
