import { useEffect, useState } from "react";
import { SearchType, isTypeOfPet } from "@/utils/types";
import _searches from "../assets/data/searches";


export default function useGetSearches() {
  const [searches, setSearches] = useState<SearchType[]>([]);
  
  useEffect(() => {
    const normalizedSearches = _searches.map((obj) => {
      const createdAt = new Date(obj.createdAt);
      const sightings = obj.sightings
        .map((sighting) => ({
          ...sighting,
          datetime: new Date(sighting.datetime),
        }))
        .sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
      const type = isTypeOfPet(obj.pet.type) ? obj.pet.type : "dog";
  
      return {
        ...obj,
        pet: {
          ...obj.pet,
          type,
        },
        createdAt,
        sightings,
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  setSearches(normalizedSearches);
  }, [_searches]);
  
  return searches;
}