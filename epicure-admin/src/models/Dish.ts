import { Restaurant } from "./Restaurant";

export interface Dish {
  id: string;
  name: string;
  price: number;
  image?: string;
  ingredients: string[];
  tags: string[];
  status: string;
  restaurant: Restaurant;
}
