import Body from "@/components/Body";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, Text } from "react-native";

export default function Profitability_Formula() {
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
      <Text>
        Edit app/(tabs)/profitability_formula.tsx to edit this screen.
      </Text>
    </Body>
  );
}
