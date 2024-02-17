import {
  Text as DefaultText,
  View as DefaultView,
  Pressable,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { Link } from "expo-router";
import { PropsWithChildren, useState } from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function SecondaryText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

type IconProps = ThemeProps &
  React.ComponentProps<typeof MaterialCommunityIcons> & {
    text?: string;
    background?: true;
  };

type IconRefButtonProps = IconProps & {
  href: React.ComponentProps<typeof Link>["href"];
};

export function Icon({
  name,
  text,
  size,
  color,
  background,
  lightColor,
  darkColor,
}: IconProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tabIconDefault"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const iconText = <Text style={{ paddingLeft: 6 }}>{text}</Text>;

  return (
    <DefaultView
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        backgroundColor: background ? backgroundColor : "transparent",
      }}
    >
      <MaterialCommunityIcons
        name={name}
        size={size || 24}
        color={color || defaultColor}
      />
      {text && iconText}
    </DefaultView>
  );
}

export function IconRefButton({
  href,
  lightColor,
  darkColor,
  ...iconProps
}: IconRefButtonProps) {
  const tabDefaultColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "tabIconDefault"
  );
  const tabSelectedColor = useThemeColor({}, "tabIconSelected");

  return (
    <Link href={href} asChild>
      <Pressable
        hitSlop={10}
        android_ripple={{
          color: tabSelectedColor,
          borderless: false,
          foreground: true,
        }}
        style={{
          overflow: "hidden",
          borderWidth: 1,
          borderColor: tabDefaultColor,
          padding: 3,
          paddingHorizontal: 12,
          borderRadius: 100,
        }}
      >
        <Icon {...iconProps}></Icon>
      </Pressable>
    </Link>
  );
}

type AccordionProps = PropsWithChildren<{
  title: string;
}>;

export function Accordion({ children, title }: AccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const highlightColor = useThemeColor({}, "highlight");

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordionBody}>{children}</View>;

  return (
    <View style={styles.accordionContainer}>
      <Pressable
        android_ripple={{
          color: highlightColor,
          borderless: false,
          foreground: true,
        }}
        style={styles.accordionHeader}
        onPress={toggleItem}
      >
        <Text style={[styles.accordionTitle]}>{title}</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} />
      </Pressable>
      {expanded && children && body}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 4,
  },
  accordionHeader: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordionTitle: {
    fontSize: 18,
  },
  accordionBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});
