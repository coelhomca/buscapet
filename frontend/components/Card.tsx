import { StyleSheet, Image, Pressable } from "react-native";
import { View, IconRefButton } from "@/components/Themed";

import PetInfo from "./PetInfo";
import UserInfo from "./UserInfo";

import { SearchType } from "../utils/types";
import PlacesHistory from "./PlacesHistory";
import { Link } from "expo-router";

type CardProps = {
  search: SearchType;
};

export default function Card({ search }: CardProps) {
  return (
    <Link href={`/search/${search.id}`} asChild>
      <Pressable style={styles.card}>
        <UserInfo user={search.user} creationTime={search.createdAt} />

        <PetInfo pet={search.pet} />
        <Pressable style={styles.posterContainer}>
          <Image src={search.poster} style={styles.posterImage} />
        </Pressable>

        <PlacesHistory sightings={search.sightings} />

        <View style={styles.footer}>
          <IconRefButton name="eye-plus-outline" href={"/modal" as never} />
          <IconRefButton name="comment-eye-outline" href={"notf" as never} />
          <IconRefButton name="share-outline" href={"notf" as never} />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
  posterContainer: {
    padding: 10,
    width: "100%",
    height: 250,
  },
  posterImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  footer: {
    padding: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
