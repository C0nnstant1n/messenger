import { IUser } from "./IUser";

export interface Room {
  id: number;
  author: number;
  name: string;
  members: IUser[];
}

export interface ApiData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Room[];
}
