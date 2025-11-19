"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { RestaurantCard } from "@/components/restaurant-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"

const allRestaurants = [
  {
    id: "1",
    name: "Burger House",
    image: "/gourmet-burger-restaurant.png",
    rating: 4.8,
    deliveryTime: "20-30 min",
    category: "burgers",
    categoryLabel: "Hambúrgueres",
    promoted: true,
  },
  {
    id: "2",
    name: "Pizza Napolitana",
    image: "/italian-pizza-restaurant.jpg",
    rating: 4.9,
    deliveryTime: "30-40 min",
    category: "pizza",
    categoryLabel: "Pizzas",
    promoted: true,
  },
  {
    id: "3",
    name: "Sushi Master",
    image: "/japanese-sushi-restaurant.png",
    rating: 4.7,
    deliveryTime: "25-35 min",
    category: "japanese",
    categoryLabel: "Japonesa",
    promoted: false,
  },
  {
    id: "4",
    name: "Pasta & Vino",
    image: "/italian-pasta-restaurant.png",
    rating: 4.6,
    deliveryTime: "35-45 min",
    category: "italian",
    categoryLabel: "Italiana",
  },
  {
    id: "5",
    name: "Taco Loco",
    image: "/mexican-taco-restaurant.png",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "mexican",
    categoryLabel: "Mexicana",
  },
  {
    id: "6",
    name: "Sweet Dreams",
    image: "/dessert-bakery-cafe.jpg",
    rating: 4.8,
    deliveryTime: "15-25 min",
    category: "desserts",
    categoryLabel: "Sobremesas",
  },
  {
    id: "7",
    name: "Grill & Chill",
    image: "/steakhouse-grill-restaurant.jpg",
    rating: 4.7,
    deliveryTime: "40-50 min",
    category: "steakhouse",
    categoryLabel: "Carnes",
  },
  {
    id: "8",
    name: "Veggie Delight",
    image: "/healthy-vegetarian-restaurant.jpg",
    rating: 4.6,
    deliveryTime: "25-35 min",
    category: "vegetarian",
    categoryLabel: "Vegetariana",
  },
  {
    id: "9",
    name: "Burger King",
    image: "/burger-restaurant.png",
    rating: 4.4,
    deliveryTime: "25-35 min",
    category: "burgers",
    categoryLabel: "Hambúrgueres",
  },
  {
    id: "10",
    name: "Pizza Hut",
    image: "/bustling-pizza-restaurant.png",
    rating: 4.3,
    deliveryTime: "35-45 min",
    category: "pizza",
    categoryLabel: "Pizzas",
  },
  {
    id: "11",
    name: "Sushi Express",
    image: "/bustling-sushi-restaurant.png",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "japanese",
    categoryLabel: "Japonesa",
  },
  {
    id: "12",
    name: "Pasta Paradise",
    image: "/italian-pasta-restaurant.png",
    rating: 4.7,
    deliveryTime: "30-40 min",
    category: "italian",
    categoryLabel: "Italiana",
  },
]

const categories = [
  { value: "all", label: "Todas" },
  { value: "burgers", label: "Hambúrgueres" },
  { value: "pizza", label: "Pizzas" },
  { value: "japanese", label: "Japonesa" },
  { value: "italian", label: "Italiana" },
  { value: "mexican", label: "Mexicana" },
  { value: "desserts", label: "Sobremesas" },
  { value: "steakhouse", label: "Carnes" },
  { value: "vegetarian", label: "Vegetariana" },
]

function RestaurantsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  // Filter restaurants
  let filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort restaurants
  filteredRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "deliveryTime") {
      const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
      const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
      return aTime - bTime
    }
    return 0
  })

  const selectedCategoryLabel = categories.find((cat) => cat.value === selectedCategory)?.label || "Todas"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Restaurantes</h1>
          <p className="text-muted-foreground">Encontre os melhores restaurantes perto de você</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar restaurantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Melhor avaliação</SelectItem>
                <SelectItem value="deliveryTime">Mais rápido</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Toggle */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Categorias</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory("all")} className="text-primary">
                  Limpar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtros ativos:</span>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategoryLabel}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "restaurante encontrado" : "restaurantes encontrados"}
          </p>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                category={restaurant.categoryLabel}
                promoted={restaurant.promoted}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">Nenhum restaurante encontrado</h3>
            <p className="text-sm text-muted-foreground">Tente ajustar seus filtros ou buscar por outro termo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RestaurantsContent />
    </Suspense>
  )
}
