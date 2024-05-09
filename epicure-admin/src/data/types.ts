
export type CollectionItem = Dish | Chef | Restaurant;

export type CollectionItems = CollectionItem[];

export interface Field {
  name: string;
  label: string;
  type: string;
}


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

export interface Chef {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  restaurants: Restaurant[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  chef: Chef;
  status: string;
  stars: string;
  dishes: Dish[];
}

