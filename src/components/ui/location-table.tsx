"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Search, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

type Location = {
  id: number
  name: string
  region: string
  type: string
}

export function LocationTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const locations: Location[] = [
    {
      id: 1,
      name: "Praia de Icaraí",
      region: "Icaraí",
      type: "Praia",
    },
    {
      id: 2,
      name: "Açai do Biel",
      region: "Caetanos",
      type: "Alimentação",
    },
    {
      id: 3,
      name: "Moitas Academia",
      region: "Moitas",
      type: "Academia",
    },
    {
      id: 4,
      name: "Restaurante Maré Alta",
      region: "Centro",
      type: "Restaurante",
    },
    {
      id: 5,
      name: "Pousada Sol Nascente",
      region: "Praia Grande",
      type: "Hospedagem",
    },
    {
      id: 6,
      name: "Café Cultural",
      region: "Histórico",
      type: "Cafeteria",
    },
  ]

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage)
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-gray-800">Locais Cadastrados</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar local, região ou tipo..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
        <Button className="bg-[#4e73df] hover:bg-[#3a5bc7] text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Local</span>
        </Button>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 px-4 py-3">ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-3 min-w-[180px]">
                    Nome do Local
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-3">Região</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-3">Type</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-3 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLocations.length > 0 ? (
                  paginatedLocations.map((location) => (
                    <TableRow key={location.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="text-gray-600 px-4 py-3">{location.id}</TableCell>
                      <TableCell className="font-medium text-gray-800 px-4 py-3">
                        <div className="max-w-[180px] truncate">{location.name}</div>
                      </TableCell>
                      <TableCell className="text-gray-600 px-4 py-3">{location.region}</TableCell>
                      <TableCell className="text-gray-600 px-4 py-3">{location.type}</TableCell>
                      <TableCell className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-[#4e73df] hover:text-[#3a5bc7] hover:bg-blue-50"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-[#f6c23e] hover:text-[#d4a017] hover:bg-yellow-50"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-[#e74a3b] hover:text-[#c82333] hover:bg-red-50"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum local encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredLocations.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, filteredLocations.length)} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredLocations.length)} de{' '}
              {filteredLocations.length} locais
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-1 pl-2.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </Button>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-1 pr-2.5"
                  >
                    <span>Próxima</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  )
}