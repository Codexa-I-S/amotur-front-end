"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartDataItem {
  region: string
  locais: number
  fill?: string
}

interface LocationChartProps {
  data?: ChartDataItem[]
}

const defaultData: ChartDataItem[] = [
  { region: "Pontos Turísticos", locais: 32, fill: "#3b82f6" },
  { region: "Hotéis", locais: 43, fill: "#10b981" },
  { region: "Pousadas", locais: 34, fill: "#f59e0b" },
  { region: "Restaurantes", locais: 28, fill: "#ef4444" },
  { region: "Bares", locais: 22, fill: "#8b5cf6" },
  { region: "Petiscaria", locais: 1, fill: "#ec4899" },
]

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: {
    payload: ChartDataItem
    value: number
    name: string
    dataKey: string
  }[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-md text-sm backdrop-blur-sm bg-opacity-90">
      <p className="font-semibold text-gray-900">{data.region}</p>
      <p className="text-gray-600">
        Locais: <span className="font-medium text-gray-900">{payload[0].value}</span>
      </p>
    </div>
  )
}

export function LocationChart({ data = defaultData }: LocationChartProps) {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
          Locais Cadastrados por Categorias
        </CardTitle>
      </CardHeader>
      <CardContent className="px-1 sm:px-4">
        <div 
          className="h-[280px] sm:h-[320px] w-full"
          role="graphics-document"
          aria-label="Gráfico de locais cadastrados por categorias"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 10, left: 20, bottom: 40 }}
              accessibilityLayer
              barCategoryGap="15%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                angle={-30}
                textAnchor="end"
                height={50}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "#6b7280" }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickCount={6}
                label={{
                  value: "Quantidade",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                  fill: "#6b7280",
                  offset: 10
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
              />
              <Bar 
                dataKey="locais" 
                radius={[4, 4, 0, 0]} 
                name="Locais"
                aria-label="Quantidade de locais"
              >
                {data.map((entry, index) => (
                  <rect key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}