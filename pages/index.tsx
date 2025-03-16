import {useEffect, useState} from "react";
import { Restaurant_Type } from "@/lib/types";
import {getAllRestaurants} from "@/lib/Service";
import { Inter } from "next/font/google";
import RestaurantExplorer from "@/components/restauraunt-explorer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant_Type[]>([]);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <RestaurantExplorer restaurants={restaurants} />
    </main>
  );
}
