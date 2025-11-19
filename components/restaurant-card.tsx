import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import Image from "next/image"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  category: string
  promoted?: boolean
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  category,
  promoted = false,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          {promoted && <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">Promoção</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-foreground">{name}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}</span>
            </div>
            <span>{category}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
