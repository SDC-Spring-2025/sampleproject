import {Restaurant_Type} from "@/lib/types";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {MapPin} from "lucide-react";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant_Type }) {
  return (
    <Card className="overflow-hidden hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <Badge>{restaurant.cuisine}</Badge>
        </div>
        <p className="text-muted-foreground flex items-center gap-1 mt-2">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {restaurant.address.street}, {restaurant.borough}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}