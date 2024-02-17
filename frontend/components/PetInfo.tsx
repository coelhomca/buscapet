import { Text, View, Icon, useThemeColor } from "./Themed";
import { StyleSheet, Platform, UIManager } from "react-native";

import { PetType } from "@/utils/types";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type PetInfoProps = {
  pet: PetType;
};

export default function PetInfo({ pet }: PetInfoProps) {
  const searchStatus = pet.found ? "Achado" : "Perdido";
  const statusColor = pet.found
    ? { lightColor: "#72ee97", darkColor: "#178739" }
    : { lightColor: "#ee7272", darkColor: "#871717" };
  const statusBackgroundColor = pet.found
    ? { lightColor: "#afeec2", darkColor: "#144d25" }
    : { lightColor: "#f0a8a8", darkColor: "#541212" };
  const tintColor = useThemeColor({}, "tint");

  const tagStyle = [
    { backgroundColor: tintColor, borderColor: tintColor },
    styles.tag,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={pet.type} size={28} color={tintColor} />
          <Text style={styles.headerTitle}>{pet.name}</Text>
        </View>
        <View style={styles.headerStatus} {...statusBackgroundColor}>
          <Icon name={"circle"} size={10} {...statusColor} />
          <Text style={styles.headerStatusText}>{searchStatus}</Text>
        </View>
      </View>
      <View style={styles.tags}>
        <Text style={tagStyle}>Raça: {pet.breed}</Text>
        <Text style={tagStyle}>Pêlo: {pet.fur}</Text>
        <Text style={tagStyle}>Tamanho: {pet.size}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 2,
  },
  header: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
  },
  headerStatus: {
    flexDirection: "row",
    padding: 5,
    paddingRight: 7,
    paddingBottom: 8,
    borderRadius: 100,
  },
  headerStatusText: {
    fontSize: 14,
  },
  tags: {
    marginHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tag: {
    marginBottom: 4,
    marginHorizontal: 2,
    padding: 6,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 40,
  },
  tagText: {},
});
