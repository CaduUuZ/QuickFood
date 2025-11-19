import Link from "next/link"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  icon: string
  href: string
}

export function CategoryCard({ name, icon, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="group flex h-24 flex-col items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg">
        <div className="text-4xl">{icon}</div>
        <span className="text-sm font-medium text-foreground">{name}</span>
      </Card>
    </Link>
  )
}
