"use client"

import { Search, User, ChevronDown, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MetricCard } from "@/components/ui/metric-card"
import { LocationChart } from "@/components/ui/location-chart"
import { LocationTable } from "@/components/ui/location-table"
import { InteractiveMap } from "@/components/ui/interactive-map"

export function DashboardContent() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <SidebarTrigger />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar..." className="pl-10 w-48 lg:w-64 bg-gray-50 border-gray-300" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 flex-shrink-0">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">João Silva</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Metric Cards */}
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

        {/* Charts and Map Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <LocationChart /> {/* esse é o conponente de grafico de regioes */}
          <InteractiveMap />{/* esse é o conponente de grafico de interaçoes */}
        </div>

        {/* Popular Locations Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">Locais Mais Visitados</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">Praia de Icaraí</p>
                  <p className="text-xs sm:text-sm text-gray-600">Niterói, RJ</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-base sm:text-lg text-gray-800">4.500</p>
                  <div className="flex items-center gap-1 text-green-600 justify-end">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">+8%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">Centro de Niterói</p>
                  <p className="text-xs sm:text-sm text-gray-600">Niterói, RJ</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-base sm:text-lg text-gray-800">3.200</p>
                  <div className="flex items-center gap-1 text-green-600 justify-end">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">+12%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">Moitas</p>
                  <p className="text-xs sm:text-sm text-gray-600">Niterói, RJ</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-base sm:text-lg text-gray-800">2.800</p>
                  <div className="flex items-center gap-1 text-red-600 justify-end">
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">-5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Table */}
        <LocationTable />
      </main>
    </div>
  )
}
