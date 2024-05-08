import { Restaurant } from "./Restaurant";

export interface Chef {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  restaurants: Restaurant[];
}
