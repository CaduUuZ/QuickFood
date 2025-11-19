"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartData {
  items: CartItem[]
  restaurant: {
    id: string
    name: string
  }
}

export default function CartPage() {
  const router = useRouter()
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartData(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (newCartData: CartData) => {
    setCartData(newCartData)
    localStorage.setItem("cart", JSON.stringify(newCartData))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (!cartData) return

    if (newQuantity === 0) {
      removeItem(itemId)
      return
    }

    const updatedItems = cartData.items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))

    updateCart({ ...cartData, items: updatedItems })
  }

  const removeItem = (itemId: string) => {
    if (!cartData) return

    const updatedItems = cartData.items.filter((item) => item.id !== itemId)

    if (updatedItems.length === 0) {
      localStorage.removeItem("cart")
      setCartData(null)
    } else {
      updateCart({ ...cartData, items: updatedItems })
    }
  }

  const applyCoupon = () => {
    // Simple coupon logic
    if (couponCode.toUpperCase() === "DESCONTO10") {
      setDiscount(0.1) // 10% discount
    } else if (couponCode.toUpperCase() === "PRIMEIRACOMPRA") {
      setDiscount(0.15) // 15% discount
    } else {
      alert("Cupom inválido")
    }
  }

  const handleCheckout = () => {
    // In a real app, this would process the order
    alert("Pedido realizado com sucesso! Em breve você receberá a confirmação.")
    localStorage.removeItem("cart")
    router.push("/")
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="pt-12 pb-12">
              <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-bold text-foreground">Seu carrinho está vazio</h2>
              <p className="mb-6 text-muted-foreground">Adicione itens do cardápio para começar seu pedido</p>
              <Button onClick={() => router.push("/")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const subtotal = cartData.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const discountAmount = subtotal * discount
  const total = subtotal + deliveryFee - discountAmount

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Carrinho</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pedido de {cartData.restaurant.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/restaurant/${cartData.restaurant.id}`)}
                    className="text-primary"
                  >
                    Adicionar mais itens
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartData.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-primary">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                <div className="space-y-2">
                  <Label htmlFor="coupon">Cupom de desconto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600">Cupom aplicado: {(discount * 100).toFixed(0)}% de desconto</p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-foreground">R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Desconto</span>
                      <span className="text-green-600">- R$ {discountAmount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>

                <Button onClick={handleCheckout} size="lg" className="w-full">
                  Finalizar pedido
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Ao finalizar, você concorda com nossos termos de uso
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
