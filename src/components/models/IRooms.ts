import { User } from "./IUser";

export interface Room {
  id: number;
  author: number;
  name: string;
  members: User[];
}

export interface RoomsData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Room[];
}
