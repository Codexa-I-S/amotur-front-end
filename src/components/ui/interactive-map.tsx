"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

export function InteractiveMap() {
  const locations = [
    { id: 1, name: "Praia de Icaraí", x: 65, y: 30, visits: 4500, status: "high" },
    { id: 2, name: "Centro", x: 45, y: 50, visits: 3200, status: "high" },
    { id: 3, name: "Moitas", x: 25, y: 70, visits: 2800, status: "medium" },
    { id: 4, name: "Ingá", x: 70, y: 60, visits: 2200, status: "medium" },
    { id: 5, name: "São Francisco", x: 80, y: 40, visits: 1800, status: "low" },
    { id: 6, name: "Charitas", x: 90, y: 25, visits: 1500, status: "low" },
  ]

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "high":
        return "#1cc88a"
      case "medium":
        return "#f6c23e"
      case "low":
        return "#e74a3b"
      default:
        return "#4e73df"
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="truncate">Mapa Interativo - Niterói</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="relative h-[250px] sm:h-[300px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-12 h-6 sm:w-16 sm:h-8 bg-green-300 rounded"></div>
            <div className="absolute top-12 right-8 w-16 h-8 sm:w-20 sm:h-12 bg-green-200 rounded"></div>
            <div className="absolute bottom-8 left-8 w-20 h-12 sm:w-24 sm:h-16 bg-green-300 rounded"></div>
            <div className="absolute bottom-4 right-4 w-8 h-16 sm:w-12 sm:h-20 bg-blue-300 rounded"></div>
          </div>

          {/* Location markers */}
          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <div className="relative">
                <MapPin
                  className="h-5 w-5 sm:h-6 sm:w-6 drop-shadow-lg transition-transform group-hover:scale-110"
                  style={{ color: getMarkerColor(location.status) }}
                  fill="currentColor"
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 max-w-[150px] sm:max-w-none">
                  <div className="font-medium truncate">{location.name}</div>
                  <div>{location.visits.toLocaleString()} visitas</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-xs">
            <div className="font-medium mb-1 sm:mb-2 text-xs">Legenda</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#1cc88a] flex-shrink-0"></div>
                <span className="text-xs truncate">Alto movimento</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#f6c23e] flex-shrink-0"></div>
                <span className="text-xs truncate">Médio movimento</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#e74a3b] flex-shrink-0"></div>
                <span className="text-xs truncate">Baixo movimento</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
