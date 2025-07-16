"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { region: "Icaraí", locais: 45, fill: "#4e73df" },
  { region: "Centro", locais: 32, fill: "#1cc88a" },
  { region: "Moitas", locais: 28, fill: "#36b9cc" },
  { region: "Frecheiras", locais: 22, fill: "#f6c23e" },
]

export function LocationChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
          Locais Cadastrados por Região
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={{
            locais: {
              label: "Locais",
              color: "#4e73df",
            },
          }}
          className="h-[250px] sm:h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
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
              <YAxis tick={{ fontSize: 10, fill: "#666" }} axisLine={{ stroke: "#e0e0e0" }} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(78, 115, 223, 0.1)" }} />
              <Bar dataKey="locais" radius={[4, 4, 0, 0]} fill="#4e73df" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
