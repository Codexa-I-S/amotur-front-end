import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, MapPin, Eye, Star } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  subtitle: string
  color: "blue" | "green" | "red" | "purple"
}

const colorClasses = {
  blue: "border-l-4 border-l-[#4e73df]",
  green: "border-l-4 border-l-[#1cc88a]",
  red: "border-l-4 border-l-[#e74a3b]",
  purple: "border-l-4 border-l-[#6f42c1]",
}

const iconClasses = {
  blue: "text-[#4e73df]",
  green: "text-[#1cc88a]",
  red: "text-[#e74a3b]",
  purple: "text-[#6f42c1]",
}

const getIcon = (title: string, color: string) => {
  const className = `h-5 w-5 sm:h-6 sm:w-6 ${iconClasses[color as keyof typeof iconClasses]}`

  if (title.includes("USUÁRIOS")) return <Users className={className} />
  if (title.includes("LOCAIS")) return <MapPin className={className} />
  if (title.includes("VISITAS")) return <Eye className={className} />
  if (title.includes("AVALIAÇÃO")) return <Star className={className} />

  return <Users className={className} />
}

export function MetricCard({ title, value, change, changeType, subtitle, color }: MetricCardProps) {
  const isPositive = changeType === "positive"

  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-all ${colorClasses[color]} h-full flex flex-col min-w-[200px]`}
    >
      <CardContent className="p-4 sm:p-5 flex-grow">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs sm:text-[0.8rem] font-semibold text-gray-600 uppercase tracking-wide truncate">
              {title}
            </p>
            <div className="ml-2 flex-shrink-0">
              {getIcon(title, color)}
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {value}
              </p>
              <div
                className={`flex items-center gap-1 ${isPositive ? "text-[#1cc88a]" : "text-[#e74a3b]"} flex-shrink-0`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="text-xs sm:text-sm font-medium">{change}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 truncate">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}