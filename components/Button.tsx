import { ReactNode, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  ImageStyle,
  InteractionManager,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ActionItem = {
  name: string;
  action: () => void;
};

type ActionMenu = {
  height?: number;
  title?: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  content?: ActionItem[];
};

type ButtonProps = {
  title?: string;
  icon?: ReactNode;
  iconName?: ImageSourcePropType;
  iconPos?: "left" | "right";
  preset?: "default" | "transparent" | "disabled";
  actionMenu?: ActionMenu;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  children?: ReactNode;
  disabled?: boolean;
};

export default function Button({
  title,
  icon,
  iconName,
  iconPos = "left",
  preset = "default",
  actionMenu,
  onPress,
  style = {},
  textStyle = {},
  iconStyle = {},
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  const [menuState, setMenuState] = useState<boolean>(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.07,
        duration: 80,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    InteractionManager.runAfterInteractions(() => {
      if (actionMenu) {
        setMenuState((prev) => !prev); // toggle menu
      } else {
        onPress?.();
      }
    });
  };

  let computedPreset = preset;
  if (disabled) computedPreset = "disabled";
  else if (preset === "default" && !title) computedPreset = "transparent";

  return (
    <>
      <View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            style={[
              buttonPresets.default,
              computedPreset !== "default" ? buttonPresets[computedPreset] : {},
              {
                flexDirection: iconPos === "right" ? "row-reverse" : "row",
              },
              style,
            ]}
            onPress={handlePress}
            disabled={disabled}
            {...props}
          >
            {children ? (
              children
            ) : (
              <>
                {icon
                  ? icon
                  : iconName && (
                      <Image
                        source={iconName}
                        style={[{ width: 20, height: 20 }, iconStyle]}
                      />
                    )}

                {title && (
                  <Text
                    style={[styles.text, textStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {title}
                  </Text>
                )}
              </>
            )}
          </Pressable>
        </Animated.View>
      </View>

      {/* === Action Menu === */}
      {actionMenu && (
        <Modal
          transparent
          visible={menuState}
          animationType="fade"
          onRequestClose={() => setMenuState(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuState(false)}
          >
            <View
              style={[
                styles.menuContainer,
                { height: actionMenu.height || "auto" },
                actionMenu.style,
              ]}
            >
              {actionMenu.title && (
                <Text style={styles.menuTitle}>{actionMenu.title}</Text>
              )}

              {actionMenu.content?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    item.action();
                    setMenuState(false);
                  }}
                >
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}

              {actionMenu.children && actionMenu.children}
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const buttonPresets = StyleSheet.create({
  default: {
    position: "relative",
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3598DC",
    borderRadius: 10,
    padding: 13,
    gap: 5,
  },
  transparent: {
    backgroundColor: "transparent",
    padding: 0,
  },
  disabled: {
    backgroundColor: "lightgrey",
  },
});

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "white",
    flexShrink: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: 200,
    backgroundColor: "#141A1E",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
