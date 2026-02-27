import { ReactNode } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type BodyProps = ScrollViewProps & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  decoStyles?: StyleProp<ViewStyle>;
  withoutDecoration?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  noTabs?: boolean;
};

export default function Body({
  children,
  style,
  contentStyle,
  decoStyles,
  withoutDecoration = false,
  contentContainerStyle,
  noTabs = false,
  ...props
}: BodyProps) {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        { flexGrow: 1, paddingBottom: noTabs ? 0 : 115 },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      <View style={{ flex: 1 }}>
        {!withoutDecoration && <View style={[styles.decoration, decoStyles]} />}
        <View style={[styles.innerContent, contentStyle]}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#ECEEF1",
  },
  decoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    borderBottomLeftRadius: 230,
    borderBottomRightRadius: 230,
    backgroundColor: "#F8F8F8",
    zIndex: 0,
  },
  innerContent: {
    padding: 20,
    paddingTop: 10,
    gap: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
    flex: 1,
  },
});
