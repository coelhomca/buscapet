import { SightingType } from "@/utils/types";
import { View, Text, Icon, SecondaryText } from "./Themed";
import { FlatList, StyleSheet } from "react-native";
import useHoursFrom from "@/utils/auxfuncs";
type PlacesHistoryProps = {
  sightings: SightingType[];
};

export default function PlacesHistory({ sightings }: PlacesHistoryProps) {
  return (
    <View style={styles.petTracker}>
      <FlatList
        data={sightings}
        keyExtractor={({ datetime }) => datetime.toString()}
        renderItem={({ item }) => (
          <View style={styles.sightingItem}>
            <Icon name="eye-circle-outline" background></Icon>
            <Text style={styles.sightingAddr}>{item.loc} </Text>
            <SecondaryText>
              ⋅ há {useHoursFrom(item.datetime)}h
            </SecondaryText>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  petTracker: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "14%",
    width: "100%",
  },
  sightingItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 6,
  },
  sightingAddr: {
    fontSize: 18,
    paddingLeft: 4,
  },
});
