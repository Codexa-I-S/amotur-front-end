"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { LocationChart } from "@/components/ui/location-chart"
import LocationByRegionChart from "@/components/ui/LocationByRegionChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationTable } from "@/components/ui/location-table"
 
export default function DashboardPage() {
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