import { Chef } from "./Chef";
import { Dish } from "./Dish";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  chef: Chef;
  status: string;
  stars: string;
  dishes: Dish[];
}
