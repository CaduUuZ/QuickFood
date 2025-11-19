"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, CreditCard, ShoppingBag, LogOut } from "lucide-react"

interface UserData {
  name: string
  email: string
}

const mockOrders = [
  {
    id: "1",
    restaurant: "Burger House",
    date: "2025-01-15",
    total: 45.8,
    status: "Entregue",
    items: ["Classic Burger", "Batata Frita", "Coca-Cola"],
  },
  {
    id: "2",
    restaurant: "Pizza Napolitana",
    date: "2025-01-10",
    total: 98.8,
    status: "Entregue",
    items: ["Margherita", "Pepperoni"],
  },
  {
    id: "3",
    restaurant: "Sushi Master",
    date: "2025-01-05",
    total: 125.5,
    status: "Cancelado",
    items: ["Combo Sushi", "Temaki Salmão"],
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setName(userData.name)
      setEmail(userData.email)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedUser = { name, email }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    alert("Perfil atualizado com sucesso!")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg p-2 text-sm">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Dados pessoais</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg p-2 text-sm">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Endereços</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg p-2 text-sm">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Pagamentos</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg p-2 text-sm">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Pedidos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="orders">Pedidos</TabsTrigger>
                <TabsTrigger value="addresses">Endereços</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados pessoais</CardTitle>
                    <CardDescription>Atualize suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                      </div>
                      <Button type="submit">Salvar alterações</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Meus pedidos</CardTitle>
                    <CardDescription>Histórico de pedidos realizados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockOrders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">{order.restaurant}</h3>
                                <span
                                  className={`text-sm font-medium ${
                                    order.status === "Entregue"
                                      ? "text-green-600"
                                      : order.status === "Cancelado"
                                        ? "text-red-600"
                                        : "text-primary"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="mb-2 text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString("pt-BR")}
                              </p>
                              <p className="mb-2 text-sm text-muted-foreground">{order.items.join(", ")}</p>
                              <p className="text-lg font-bold text-primary">
                                R$ {order.total.toFixed(2).replace(".", ",")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Endereços de entrega</CardTitle>
                    <CardDescription>Gerencie seus endereços salvos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">Casa</h3>
                              <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                              <p className="text-sm text-muted-foreground">Centro - São Paulo, SP</p>
                              <p className="text-sm text-muted-foreground">CEP: 01234-567</p>
                            </div>
                            <Badge variant="secondary">Principal</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="outline" className="w-full bg-transparent">
                        Adicionar novo endereço
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
