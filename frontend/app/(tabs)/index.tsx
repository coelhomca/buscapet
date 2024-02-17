import { View } from "@/components/Themed";
import { StyleSheet, FlatList } from "react-native";

import Card from "../../components/Card";
import useGetSearches from "@/hooks/useGetSearches";

export default function FeedScreen() {
  const searches = useGetSearches();

  return (
    <View style={styles.feed}>
      <FlatList
        data={searches}
        renderItem={({ item }) => <Card search={item}></Card>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
  },
});
