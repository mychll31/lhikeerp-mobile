import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { usePathname } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Colors = {
  white: "#FFFFFF",
  green: "#2E7D32",
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const pathname = usePathname();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const iconMap: Record<string, any> = {
          index: "bar-chart",
          roas_tracker: "find-in-page",
          roas_summary: "book",
          profitability_formula: "calculate",
        };

        const iconName = iconMap[route.name] ?? "ellipse-outline";

        const onPress = () => {
          navigation.navigate(route.name as never);
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={onPress}
          >
            <View style={[styles.iconWrapper, isFocused && styles.active]}>
              <MaterialIcons
                name={iconName}
                size={26}
                color={isFocused ? "white" : "#3598DC"}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    left: "5%",
    width: "90%",
    height: 70,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    paddingHorizontal: 10,

    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#3598DC",
    transform: [{ translateY: -20 }],
    borderRadius: 20,
    elevation: 4,
  },
});
