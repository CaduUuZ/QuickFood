"use client"

import Link from "next/link"
import { ShoppingCart, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-xl font-bold text-primary-foreground">Q</span>
            </div>
            <span className="text-xl font-bold text-foreground">QuickFood</span>
          </Link>

          {/* Location */}
          <div className="hidden items-center gap-2 md:flex">
            <MapPin className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Entregar em</span>
              <span className="text-sm font-medium">Rua Exemplo, 123</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild className="hidden md:flex">
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
