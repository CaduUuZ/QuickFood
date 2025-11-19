"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, MapPin, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"

// Mock restaurant data
const restaurantData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Burger House",
    image: "/gourmet-burger-restaurant.png",
    rating: 4.8,
    reviews: 234,
    deliveryTime: "20-30 min",
    deliveryFee: "R$ 5,00",
    category: "Hambúrgueres",
    address: "Rua das Flores, 123 - Centro",
    description: "Os melhores hambúrgueres artesanais da cidade, feitos com ingredientes frescos e de qualidade.",
    menu: [
      {
        id: "1",
        name: "Classic Burger",
        description: "Hambúrguer de carne bovina, queijo, alface, tomate e molho especial",
        price: 25.9,
        image: "/classic-burger.jpg",
        category: "Hambúrgueres",
      },
      {
        id: "2",
        name: "Bacon Burger",
        description: "Hambúrguer com bacon crocante, queijo cheddar e cebola caramelizada",
        price: 29.9,
        image: "/bacon-burger.jpg",
        category: "Hambúrgueres",
      },
      {
        id: "3",
        name: "Veggie Burger",
        description: "Hambúrguer vegetariano de grão de bico com guacamole",
        price: 24.9,
        image: "/veggie-burger.jpg",
        category: "Hambúrgueres",
      },
      {
        id: "4",
        name: "Batata Frita",
        description: "Porção de batatas fritas crocantes",
        price: 12.9,
        image: "/french-fries.jpg",
        category: "Acompanhamentos",
      },
      {
        id: "5",
        name: "Onion Rings",
        description: "Anéis de cebola empanados e fritos",
        price: 14.9,
        image: "/onion-rings.jpg",
        category: "Acompanhamentos",
      },
      {
        id: "6",
        name: "Coca-Cola",
        description: "Refrigerante 350ml",
        price: 6.9,
        image: "/soda-can.jpg",
        category: "Bebidas",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Pizza Napolitana",
    image: "/italian-pizza-restaurant.jpg",
    rating: 4.9,
    reviews: 456,
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 6,00",
    category: "Pizzas",
    address: "Av. Paulista, 456 - Bela Vista",
    description: "Pizzas artesanais com massa fina e ingredientes importados da Itália.",
    menu: [
      {
        id: "1",
        name: "Margherita",
        description: "Molho de tomate, mussarela, manjericão e azeite",
        price: 45.9,
        image: "/margherita-pizza.jpg",
        category: "Pizzas",
      },
      {
        id: "2",
        name: "Pepperoni",
        description: "Molho de tomate, mussarela e pepperoni",
        price: 49.9,
        image: "/pepperoni-pizza.jpg",
        category: "Pizzas",
      },
      {
        id: "3",
        name: "Quattro Formaggi",
        description: "Quatro queijos: mussarela, gorgonzola, parmesão e provolone",
        price: 52.9,
        image: "/quattro-formaggi-pizza.jpg",
        category: "Pizzas",
      },
    ],
  },
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const restaurant = restaurantData[restaurantId]

  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Restaurante não encontrado</h1>
          <Button onClick={() => router.push("/")}>Voltar para home</Button>
        </div>
      </div>
    )
  }

  const categories = ["all", ...Array.from(new Set(restaurant.menu.map((item: any) => item.category)))]
  const filteredMenu =
    selectedCategory === "all"
      ? restaurant.menu
      : restaurant.menu.filter((item: any) => item.category === selectedCategory)

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId)
    })
  }

  const getItemQuantity = (itemId: string) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleGoToCart = () => {
    // Store cart in localStorage
    localStorage.setItem(
      "cart",
      JSON.stringify({ items: cart, restaurant: { id: restaurant.id, name: restaurant.name } }),
    )
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      {/* Restaurant Header */}
      <div className="relative h-64 w-full md:h-80">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        {/* Restaurant Info */}
        <div className="-mt-16 relative z-10 mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-foreground">{restaurant.name}</h1>
                  <p className="mb-3 text-muted-foreground">{restaurant.description}</p>
                  <Badge variant="secondary">{restaurant.category}</Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{restaurant.rating}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.reviews} avaliações</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">{restaurant.deliveryTime}</p>
                    <p className="text-xs text-muted-foreground">Tempo de entrega</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">{restaurant.deliveryFee}</p>
                    <p className="text-xs text-muted-foreground">Taxa de entrega</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">{restaurant.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Cardápio</h2>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              {categories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredMenu.map((item: any) => {
                  const quantity = getItemQuantity(item.id)
                  return (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex gap-4">
                          <div className="relative h-32 w-32 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between py-4 pr-4">
                            <div>
                              <h3 className="mb-1 font-semibold text-foreground">{item.name}</h3>
                              <p className="mb-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              <p className="text-lg font-bold text-primary">
                                R$ {item.price.toFixed(2).replace(".", ",")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {quantity === 0 ? (
                                <Button size="sm" onClick={() => addToCart(item)} className="gap-1">
                                  <Plus className="h-4 w-4" />
                                  Adicionar
                                </Button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="outline" onClick={() => removeFromCart(item.id)}>
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold">{quantity}</span>
                                  <Button size="icon" onClick={() => addToCart(item)}>
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
          <div className="container mx-auto">
            <Button onClick={handleGoToCart} size="lg" className="w-full gap-2 shadow-lg">
              <ShoppingCart className="h-5 w-5" />
              Ver carrinho ({cartItemsCount} {cartItemsCount === 1 ? "item" : "itens"}) • R${" "}
              {cartTotal.toFixed(2).replace(".", ",")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
