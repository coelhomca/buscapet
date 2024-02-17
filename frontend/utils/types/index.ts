export type UserType = {
  id: string;
  username: string;
  name: string;
  image: string;
};

type TypeOfPet = 'dog'|'cat'|'bird';

export type PetType = {
  name: string;
  found: boolean;
  type: TypeOfPet;
  breed: string;
  fur: string;
  size: string;
  images?: string[];
};

export function isTypeOfPet(t: string): t is TypeOfPet {
  return ['dog', 'cat', 'bird'].includes(t);
}

export type SightingType = {
  loc: string;
  datetime: Date;
};

export type SearchType = {
  id: string;
  user: UserType;
  createdAt: Date;
  pet: PetType;
  poster: string;
  sightings: SightingType[];
};