export type CollectionItem = IDish | IChef | IRestaurant;

export type CollectionItems = CollectionItem[];

export interface IField {
  name: string;
  label: string;
  type: string;
}

export interface IDish {
  id: string;
  name: string;
  price: number;
  image?: string;
  ingredients: string[];
  tags: string[];
  status: string;
  restaurant: IRestaurant;
}

export interface IChef {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  restaurants: IRestaurant[];
}

export interface IRestaurant {
  id: string;
  name: string;
  image: string;
  chef: IChef;
  status: string;
  stars: string;
  dishes: IDish[];
}


