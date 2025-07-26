"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { useRouter } from "next/navigation"

interface ChartDataItem {
  type: string
  quantidade: number
  fill?: string
}

interface ApiResponse {
  lugaresPorTipo: ChartDataItem[]
  totalDeLugares: number
}

// Cores para cada tipo de local
const typeColors: Record<string, string> = {
  "Bar": "#8b5cf6",
  "Ponto Turístico": "#3b82f6",
  "Pousada": "#f59e0b",
  "Restaurante": "#ef4444",
  "Hotel": "#10b981",
  "Petiscaria": "#ec4899"
}

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
      <p className="font-semibold text-gray-900">{data.type}</p>
      <p className="text-gray-600">
        Quantidade: <span className="font-medium text-gray-900">{payload[0].value}</span>
      </p>
    </div>
  )
}

export function LocationChart() {
  const router = useRouter()
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Obtém o token do localStorage (mesmo padrão do LocationByRegionChart)
        const token = localStorage.getItem('authToken')
        
        if (!token) {
          throw new Error('Token de autenticação não encontrado')
        }

        // Formata a data igual ao componente que funciona
        const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '%2F')
        
        // Faz a requisição com a mesma URL base e headers
        const response = await axios.get<ApiResponse>(
          `https://squad-03-server-production.up.railway.app/dashboard/${today}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        // Adiciona cores aos dados
        const formattedData = response.data.lugaresPorTipo.map(item => ({
          ...item,
          fill: typeColors[item.type] || "#8884d8"
        }))

        setChartData(formattedData)
      } catch (err) {
        console.error("Erro ao buscar dados:", err)
        
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Erro ao carregar dados')
          // Redireciona para login se não autorizado
          if (err.response?.status === 401) {
            router.push('/login')
          }
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Ocorreu um erro desconhecido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
            Locais Cadastrados por Categorias
          </CardTitle>
        </CardHeader>
        <CardContent className="px-1 sm:px-4">
          <Skeleton className="h-[320px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
            Locais Cadastrados por Categorias
          </CardTitle>
        </CardHeader>
        <CardContent className="px-1 sm:px-4">
          <div className="h-[320px] flex items-center justify-center text-red-500">
            {error}
          </div>
        </CardContent>
      </Card>
    )
  }

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
              data={chartData} 
              margin={{ top: 20, right: 10, left: 20, bottom: 40 }}
              barCategoryGap="15%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="type"
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
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="quantidade" 
                radius={[4, 4, 0, 0]} 
                name="Quantidade"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}