import searches from "@/assets/data/searches";
import Card from "@/components/Card";
import useGetSearches from "@/hooks/useGetSearches";
import { useLocalSearchParams } from "expo-router";
import NotFoundScreen from "../+not-found";

export default function Search() {
  const { id } = useLocalSearchParams();
  const search = useGetSearches().find((t) => t.id === id);

  if (search === undefined) {
    return;
  }
  
  return <Card search={search} />;
}
