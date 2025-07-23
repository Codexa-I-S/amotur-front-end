"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Interface para os dados do gráfico
interface ChartDataItem {
  region: string
  locais: number
  fill?: string
}

// Tipo para as propriedades do componente
interface LocationChartProps {
  data?: ChartDataItem[] // Opcional para permitir uso sem dados
}

// Dados mockados com tipo explícito
const defaultData: ChartDataItem[] = [
  { region: "Pontos Turísticos", locais: 32, fill: "#1cc88a" },
  { region: "Hotéis", locais: 43, fill: "#2c3e50" },
  { region: "Pousadas", locais: 34, fill: "#8e44ad" },
  { region: "Restaurantes", locais: 28, fill: "#e74a3b" },
  { region: "Bares", locais: 22, fill: "#f39c12" },
  { region: "Petiscaria", locais: 1, fill: "#f39c12" },
]

// Interface para o Tooltip customizado
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: {
    payload: ChartDataItem
    value: number
    name: string
    dataKey: string
  }[]
}

// Componente de Tooltip customizado com tipagem forte
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-md text-sm">
      <p className="font-semibold text-gray-900">{data.region}</p>
      <p className="text-gray-600">
        Locais: <span className="font-medium text-gray-900">{payload[0].value}</span>
      </p>
    </div>
  )
}

// Componente principal com tipagem
export function LocationChart({ data = defaultData }: LocationChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
          Locais Cadastrados por Categorias
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div 
          className="h-[250px] sm:h-[300px] w-full"
          role="graphics-document"
          aria-label="Gráfico de locais cadastrados por categorias"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              accessibilityLayer
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 10, fill: "#666" }}
                axisLine={{ stroke: "#e0e0e0" }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: "#666" }} 
                axisLine={{ stroke: "#e0e0e0" }}
                label={{
                  value: "Quantidade",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                  fill: "#666"
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(78, 115, 223, 0.1)" }}
              />
              <Bar 
                dataKey="locais" 
                radius={[4, 4, 0, 0]} 
                fill="#4e73df" 
                name="Locais"
                aria-label="Quantidade de locais"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}