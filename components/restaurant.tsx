import {Restaurant_Type} from "@/lib/types";

type RestaurantProps = {
  restaurant: Restaurant_Type;
}

const Restaurant = ({restaurant} : RestaurantProps) => {
  return (
    <>
      <div className={"flex flex-col justify-center w-full text-center"}>
        <div className={"font-bold "}>Name: {restaurant.name}</div>
        <div>Cuisine: {restaurant.cuisine}</div>
        <div>Borough: {restaurant.borough}</div>
      </div>
    </>
  );
}

export default Restaurant;