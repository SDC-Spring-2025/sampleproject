import {useEffect, useState} from "react";
import { Restaurant_Type } from "@/lib/types";
import {getAllRestaurants} from "@/lib/Service";


export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant_Type[]>([]);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data);
    });
  }, []);

  return (
    <div>
      {restaurants && restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.borough}</p>
        </div>
      ))}
    </div>
  );
}
