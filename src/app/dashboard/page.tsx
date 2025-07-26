"use client"
import { MetricCard } from "@/components/ui/metric-card"
import { LocationChart } from "@/components/ui/location-chart"
import LocationByRegionChart from "@/components/ui/LocationByRegionChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationTable } from "@/components/ui/location-table"
import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface DashboardData {
  totalDeLugares: number
  totalDeUsers: number
  contagemlogados: number
  lugaresPorTipo: Array<{ type: string; quantidade: number }>
  lugaresPorRegiao: Array<{ location: string; quantidade: number }>
}


const api = axios.create({
  baseURL: "https://squad-03-server-production.up.railway.app",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use((config) => {

  const token = localStorage.getItem('authToken')
  if (token) {
    
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove o token em caso de não autorizado
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default function DashboardPage() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalDeLugares: 0,
    totalDeUsers: 0,
    contagemlogados: 0,
    lugaresPorTipo: [],
    lugaresPorRegiao: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
      
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('Token de autenticação não encontrado')
        }

        // Formata e codifica a data
        const today = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })
        const encodedDate = today.replace(/\//g, '%2F')
        
        console.log('Token:', token)
        console.log('URL:', `/dashboard/${encodedDate}`)

        const response = await api.get<DashboardData>(`/dashboard/${encodedDate}`)
        
        setDashboardData(response.data)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Sessão expirada. Por favor, faça login novamente.')
            localStorage.removeItem('authToken')
            router.push('/login')
          } else {
            setError(err.response?.data?.message || err.message || 'Erro ao carregar dados')
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div>Carregando dados da dashboard...</div>
    </div>
  )

  if (error) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-red-500">Erro: {error}</div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Seção de Métricas */}
        <section id="visao-geral">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Visão Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <MetricCard
                  title="USUÁRIOS CADASTRADOS"
                  value={formatNumber(dashboardData.totalDeUsers)}
                  change="+15%"
                  changeType="positive"
                  subtitle="vs. mês anterior"
                  color="blue"
                />
                <MetricCard
                  title="LOCAIS CADASTRADOS"
                  value={formatNumber(dashboardData.totalDeLugares)}
                  change="+8%"
                  changeType="positive"
                  subtitle="este mês"
                  color="green"
                />
                <MetricCard
                  title="VISITAS HOJE"
                  value={formatNumber(dashboardData.contagemlogados)}
                  change="-3%"
                  changeType="negative"
                  subtitle="vs. ontem"
                  color="red"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Seção de Gráficos */}
        <section id="graficos">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card className="rounded-lg shadow-sm border border-gray-100">
              <CardContent className="pt-0">
                <LocationChart />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <LocationByRegionChart />
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Seção de Tabela */}
        <section id="tabela-locais">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <LocationTable/>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}