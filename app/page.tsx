import { Header } from "@/components/header"
import { CategoryCard } from "@/components/category-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  { name: "Hambúrgueres", icon: "🍔", href: "/restaurants?category=burgers" },
  { name: "Pizzas", icon: "🍕", href: "/restaurants?category=pizza" },
  { name: "Japonesa", icon: "🍱", href: "/restaurants?category=japanese" },
  { name: "Italiana", icon: "🍝", href: "/restaurants?category=italian" },
  { name: "Sobremesas", icon: "🍰", href: "/restaurants?category=desserts" },
  { name: "Bebidas", icon: "🥤", href: "/restaurants?category=drinks" },
]

const promotedRestaurants = [
  {
    id: "1",
    name: "Burger House",
    image: "/gourmet-burger-restaurant.png",
    rating: 4.8,
    deliveryTime: "20-30 min",
    category: "Hambúrgueres",
    promoted: true,
  },
  {
    id: "2",
    name: "Pizza Napolitana",
    image: "/italian-pizza-restaurant.jpg",
    rating: 4.9,
    deliveryTime: "30-40 min",
    category: "Pizzas",
    promoted: true,
  },
  {
    id: "3",
    name: "Sushi Master",
    image: "/japanese-sushi-restaurant.png",
    rating: 4.7,
    deliveryTime: "25-35 min",
    category: "Japonesa",
    promoted: true,
  },
]

const allRestaurants = [
  {
    id: "4",
    name: "Pasta & Vino",
    image: "/italian-pasta-restaurant.png",
    rating: 4.6,
    deliveryTime: "35-45 min",
    category: "Italiana",
  },
  {
    id: "5",
    name: "Taco Loco",
    image: "/mexican-taco-restaurant.png",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "Mexicana",
  },
  {
    id: "6",
    name: "Sweet Dreams",
    image: "/dessert-bakery-cafe.jpg",
    rating: 4.8,
    deliveryTime: "15-25 min",
    category: "Sobremesas",
  },
  {
    id: "7",
    name: "Grill & Chill",
    image: "/steakhouse-grill-restaurant.jpg",
    rating: 4.7,
    deliveryTime: "40-50 min",
    category: "Carnes",
  },
  {
    id: "8",
    name: "Veggie Delight",
    image: "/healthy-vegetarian-restaurant.jpg",
    rating: 4.6,
    deliveryTime: "25-35 min",
    category: "Vegetariana",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">O que você quer pedir hoje?</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Descubra os melhores restaurantes e peça com entrega rápida
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar restaurantes ou pratos..."
                className="h-14 rounded-full pl-12 pr-4 text-base shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Categorias</h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Promoted Restaurants */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Promoções</h2>
            <Button variant="ghost" className="text-primary">
              Ver todas
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {promotedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* All Restaurants */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Restaurantes perto de você</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">Q</span>
                </div>
                <span className="text-xl font-bold text-foreground">QuickFood</span>
              </div>
              <p className="text-sm text-muted-foreground">Delivery de comida rápido e prático</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre nós</li>
                <li>Carreiras</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Ajuda</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Central de ajuda</li>
                <li>Contato</li>
                <li>Termos de uso</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Parceiros</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Seja um parceiro</li>
                <li>Entregadores</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 QuickFood. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
