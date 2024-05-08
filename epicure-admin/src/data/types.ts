import { Dish } from "../models/Dish";
import { Chef } from "../models/Chef";
import { Restaurant } from "../models/Restaurant";

export type CollectionItem = Dish | Chef | Restaurant;

export type CollectionItems = CollectionItem[];

export interface Field {
  name: string;
  label: string;
  type: string;
}
