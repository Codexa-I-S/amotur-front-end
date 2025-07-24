"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { LocationChart } from "@/components/ui/location-chart"
import LocationByRegionChart from "@/components/ui/LocationByRegionChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationTable } from "@/components/ui/location-table"
 
export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Seção de Métricas */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Visão Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <MetricCard
                  title="USUÁRIOS CADASTRADOS"
                  value="1.234"
                  change="+15%"
                  changeType="positive"
                  subtitle="vs. mês anterior"
                  color="blue"
                />
                <MetricCard
                  title="LOCAIS CADASTRADOS"
                  value="856"
                  change="+8%"
                  changeType="positive"
                  subtitle="este mês"
                  color="green"
                />
                <MetricCard
                  title="VISITAS HOJE"
                  value="12.450"
                  change="-3%"
                  changeType="negative"
                  subtitle="vs. ontem"
                  color="red"
                />
                <MetricCard
                  title="AVALIAÇÃO MÉDIA"
                  value="4.8"
                  change="+0.2"
                  changeType="positive"
                  subtitle="de 5 estrelas"
                  color="purple"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Seção de Gráficos */}
        <section>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
           <Card className="rounded-lg shadow-sm border border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Locais por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <LocationChart />
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Locais por Região
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationByRegionChart />
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
                <LocationTable/>
            </div>
        </section>
      </main>
    </div>
  )
}