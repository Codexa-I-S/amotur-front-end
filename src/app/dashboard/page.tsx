"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { LocationChart } from "@/components/ui/location-chart"
import LocationByRegionChart from "@/components/ui/LocationByRegionChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationTable } from "@/components/ui/location-table"
import { useEffect, useState } from "react"
import axios from "axios"

interface MetricData {
  totalDeLugares: number
  totalDeUsers: number
  contagemlogados: number
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const today = new Date()
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`
        
        // Requisição sem token de autenticação
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${formattedDate}`
        )

        if (!response.data) {
          throw new Error("Resposta da API sem dados")
        }

        setMetrics({
          totalDeLugares: response.data.totalDeLugares || 0,
          totalDeUsers: response.data.totalDeUsers || 0,
          contagemlogados: response.data.contagemlogados || 0
        })
      } catch (err) {
        console.error('Erro na requisição:', err)
        
        let errorMessage = 'Falha ao carregar métricas'
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            errorMessage = "Endpoint não encontrado"
          } else {
            errorMessage = `Erro na API: ${err.message}`
          }
        }
        
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const formatNumber = (num: number | undefined) => {
    return num?.toLocaleString('pt-BR') || "0"
  }

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
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-[120px] bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center p-4">
                  <p className="text-red-500 mb-2">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-blue-600 hover:underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <MetricCard
                    title="LOCAIS CADASTRADOS"
                    value={formatNumber(metrics?.totalDeLugares)}
                    change="+0%"
                    changeType="positive"
                    subtitle="total"
                    color="green"
                  />
                  <MetricCard
                    title="USUÁRIOS CADASTRADOS"
                    value={formatNumber(metrics?.totalDeUsers)}
                    change="+0%"
                    changeType="positive"
                    subtitle="total"
                    color="blue"
                  />
                  <MetricCard
                    title="USUÁRIOS LOGADOS"
                    value={formatNumber(metrics?.contagemlogados)}
                    change="+0%"
                    changeType="positive"
                    subtitle="hoje"
                    color="red"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Seções de Gráficos e Tabela (mantidas estáticas) */}
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