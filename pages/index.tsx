import {useEffect, useState} from "react";
import { Restaurant_Type } from "@/lib/types";
import {getAllRestaurants} from "@/lib/Service";
import { Inter } from "next/font/google";
import Restaurant from "@/components/restaurant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant_Type[]>([]);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data);
    });
  }, []);

  return (
    <div className={"flex flex-col justify-center items-center w-full"}>
      <h1 className={"text-2xl font-bold text-red-400 py-4"}>Restaurants in New York</h1>
      <div className={"flex flex-col gap-2"}>
        {restaurants && restaurants.map((restaurant, i) => (
          <Restaurant restaurant={restaurant} key={i} />
        ))}
      </div>
    </div>

  );
}
