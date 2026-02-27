import Button from "@/components/Button";
import CustomTabBar from "@/components/CustomTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

const TAB_LABELS = {
  index: "Sales Warehouse Logistics",
  roas_summary: "Adspent ROAS Summary",
  roas_tracker: "Page ROAS Tracker",
  profitability_formula: "Profitability Formula",
  "(notification)": "Activities",
};

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();
  const currentTab = useMemo(() => {
    const match = segments[1] ?? "index";
    return TAB_LABELS[match] ?? "Unknown";
  }, [segments]);

  return (
    <>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#141A1E",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          {currentTab}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Button
            icon={<Ionicons name="notifications" size={28} color="#3598DC" />}
            onPress={() => router.push("../notification")}
          />

          {/* Profile Button with floating menu */}
          <Button
            icon={<Ionicons name="person" size={28} color="#3598DC" />}
            actionMenu={{
              title: "Profile Options",
              content: [
                {
                  name: "View Profile",
                  action: () => router.push("../profile"),
                },
                {
                  name: "Logout",
                  action: () => router.replace("/"),
                },
              ],
              height: 120,
            }}
          />
        </View>
      </View>

      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="roas_tracker" />
        <Tabs.Screen name="roas_summary" />
        <Tabs.Screen name="profitability_formula" />
      </Tabs>
    </>
  );
}
