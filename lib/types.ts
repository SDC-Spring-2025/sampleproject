
export type Restaurant_Type = {
  id: string;
  name: string;
  cuisine: string;
  borough: string;
  address: Address;
  restaurant_id: string;
}

export type Address = {
  street: string;
  building: string;
  coord: number[];
}