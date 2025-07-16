"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const locations = [
  {
    id: 1,
    name: "Praia de Icaraí",
    region: "Icaraí",
    visits: 4500,
    status: "Ativo",
    lastUpdate: "2024-01-15",
  },
  {
    id: 2,
    name: "Centro de Niterói",
    region: "Centro",
    visits: 3200,
    status: "Ativo",
    lastUpdate: "2024-01-14",
  },
  {
    id: 3,
    name: "Moitas Shopping",
    region: "Moitas",
    visits: 2800,
    status: "Inativo",
    lastUpdate: "2024-01-13",
  },
  {
    id: 4,
    name: "Praia do Ingá",
    region: "Ingá",
    visits: 2200,
    status: "Ativo",
    lastUpdate: "2024-01-15",
  },
  {
    id: 5,
    name: "São Francisco",
    region: "São Francisco",
    visits: 1800,
    status: "Ativo",
    lastUpdate: "2024-01-12",
  },
]

export function LocationTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">Locais Cadastrados</CardTitle>
        <Button className="bg-[#4e73df] hover:bg-[#3a5bc7] text-white text-sm w-full sm:w-auto">Adicionar Local</Button>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3">
                    Nome do Local
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3">Região</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3">Visitas</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3 hidden sm:table-cell">
                    Última Atualização
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm px-4 py-3 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-800 text-xs sm:text-sm px-4 py-3">
                      <div className="max-w-[150px] sm:max-w-none truncate">{location.name}</div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-xs sm:text-sm px-4 py-3">{location.region}</TableCell>
                    <TableCell className="text-gray-800 font-medium text-xs sm:text-sm px-4 py-3">
                      {location.visits.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={location.status === "Ativo" ? "default" : "secondary"}
                        className={`text-xs ${
                          location.status === "Ativo"
                            ? "bg-[#1cc88a] hover:bg-[#17a673] text-white"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                        }`}
                      >
                        {location.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 text-xs sm:text-sm px-4 py-3 hidden sm:table-cell">
                      {new Date(location.lastUpdate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-[#4e73df] hover:text-[#3a5bc7] hover:bg-blue-50"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-[#f6c23e] hover:text-[#d4a017] hover:bg-yellow-50"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-[#e74a3b] hover:text-[#c82333] hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
