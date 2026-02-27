import Body from "@/components/Body";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, Text } from "react-native";

export default function Roas_Summary() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  return (
    <Body
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
      <Text>Edit app/(tabs)/roas_summary.tsx to edit this screen.</Text>
    </Body>
  );
}
