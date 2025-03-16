"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RestaurantCard } from "./restaurant-card"
import {Restaurant_Type} from "@/lib/types";

type RestaurantExplorerProps = {
  restaurants: Restaurant_Type[]
}

export default function RestaurantExplorer({restaurants}: RestaurantExplorerProps) {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant_Type[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([])
  const [cuisines, setCuisines] = useState<string[]>([])
  const [boroughs, setBoroughs] = useState<string[]>([])

  useEffect(() => {
    setFilteredRestaurants(restaurants)
    const uniqueCuisines = Array.from(new Set(restaurants.map((r) => r.cuisine))).sort()
    const uniqueBoroughs = Array.from(new Set(restaurants.map((r) => r.borough))).sort()

    setCuisines(uniqueCuisines)
    setBoroughs(uniqueBoroughs)
    setLoading(false)
  }, [restaurants])

  useEffect(() => {
    let filtered = restaurants

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) || restaurant.address.street.toLowerCase().includes(query),
      )
    }

    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((restaurant) => selectedCuisines.includes(restaurant.cuisine))
    }

    if (selectedBoroughs.length > 0) {
      filtered = filtered.filter((restaurant) => selectedBoroughs.includes(restaurant.borough))
    }

    setFilteredRestaurants(filtered)
  }, [searchQuery, selectedCuisines, selectedBoroughs, restaurants])

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  const toggleBorough = (borough: string) => {
    setSelectedBoroughs((prev) => (prev.includes(borough) ? prev.filter((b) => b !== borough) : [...prev, borough]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCuisines([])
    setSelectedBoroughs([])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">NYC Restaurant Explorer</h1>
        <p className="text-center text-muted-foreground mb-6">
          Discover the best dining spots across New York City's five boroughs
        </p>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Cuisine
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {cuisines.map((cuisine) => (
                  <DropdownMenuCheckboxItem
                    key={cuisine}
                    checked={selectedCuisines.includes(cuisine)}
                    onCheckedChange={() => toggleCuisine(cuisine)}
                  >
                    {cuisine}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <MapPin className="h-4 w-4" />
                  Borough
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {boroughs.map((borough) => (
                  <DropdownMenuCheckboxItem
                    key={borough}
                    checked={selectedBoroughs.includes(borough)}
                    onCheckedChange={() => toggleBorough(borough)}
                  >
                    {borough}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(selectedCuisines.length > 0 || selectedBoroughs.length > 0 || searchQuery) && (
              <Button variant="ghost" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCuisines.length > 0 || selectedBoroughs.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCuisines.map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="flex items-center gap-1">
                {cuisine}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => toggleCuisine(cuisine)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedBoroughs.map((borough) => (
              <Badge key={borough} variant="secondary" className="flex items-center gap-1">
                {borough}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => toggleBorough(borough)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {filteredRestaurants.length} of {restaurants.length} restaurants
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">No restaurants found matching your criteria</p>
            <Button variant="link" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

