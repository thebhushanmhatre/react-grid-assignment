import data from '../data/factwiseData.json';
import type { UserType } from '../models/User';

export function useFetchData(): UserType[] {
  // Ideally we would fetch data from an API here asyncronously, but for the sake of this assignment, we will use the local JSON file.
  // Just wanted to show the file structure that I like to create

  return data.employees as UserType[];
}
