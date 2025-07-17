"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// requisiçao (mocado)
const data = [
  { region: "Pontos Turisticos", locais: 32, fill: "#1cc88a" }, 
  { region: "Hoteis", locais: 43, fill: "#2c3e50" },           
  { region: "Pousadas", locais: 34, fill: "#8e44ad" },         
  { region: "Restaurantes", locais: 28, fill: "#e74a3b" },   
  { region: "Bares", locais: 22, fill: "#f39c12" },             
  { region: "Petiscaria", locais: 1, fill: "#f39c12" },         
];

export function LocationChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
          Locais Cadastrados por Categorias
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
