"use client"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Search, Plus, ChevronLeft, ChevronRight, Loader2} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import FormLocalRegisterDashboard  from "@/components/page-elements/FormLocalRegisterDashboard" 

type Location = {
  id: string
  name: string
  region: string
  type: string
}

type ApiLocation = {
  id: string
  name: string
  localization: string
  type: string
}

export function LocationTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const itemsPerPage = 5

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/place/page?limit=${itemsPerPage}&page=${currentPage}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        }
      )

      setLocations(response.data.data.map((item: ApiLocation) => ({
        id: item.id,
        name: item.name,
        region: item.localization,
        type: item.type
      })))

      setTotalItems(response.data.meta.total)
      setLastPage(response.data.meta.lastPage)
    } catch (err) {
      console.error("Erro ao buscar locais:", err)
      setError("Falha ao carregar locais. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations, currentPage])

  const handleDeleteLocation = async (id: string) => {
    try {
      setIsDeleting(id)
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/place/id=${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        }
      )

      toast.success("Local deletado com sucesso!")
      
      // Recarregar os dados mantendo a página atual
      if (locations.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else {
        fetchLocations()
      }
    } catch (err) {
      console.error("Erro ao deletar local:", err)
      
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error("Sessão expirada", {
            description: "Faça login novamente para continuar",
            duration: 3000
          })
          router.push('/login')
        } else {
          toast.error("Erro ao deletar local", {
            description: err.response?.data?.message || "Ocorreu um erro ao deletar o local",
            duration: 3000
          })
        }
      } else {
        toast.error("Erro desconhecido", {
          description: "Ocorreu um erro inesperado",
          duration: 3000
        })
      }
    } finally {
      setIsDeleting(null)
    }
  }

  const handleAddSuccess = () => {
    setIsAddModalOpen(false)
    fetchLocations() // Atualiza a tabela após adicionar um novo local
  }

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (loading && locations.length === 0) {
    return (
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">Locais Cadastrados</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">Locais Cadastrados</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="h-32 flex items-center justify-center text-red-500">
            {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
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
          <Button 
            className="bg-[#4e73df] hover:bg-[#3a5bc7] text-white flex items-center gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
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
                    <TableHead className="font-semibold text-gray-700 px-4 py-3">Categoria</TableHead>
                    <TableHead className="font-semibold text-gray-700 px-4 py-3 text-right">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <TableRow key={location.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="text-gray-600 px-4 py-3">
                          {location.id.substring(0, 8)}...
                        </TableCell>
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
                              onClick={() => handleDeleteLocation(location.id)}
                              disabled={isDeleting === location.id}
                            >
                              {isDeleting === location.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
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

          {totalItems > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} de{' '}
                {totalItems} locais
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="gap-1 pl-2.5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Anterior</span>
                    </Button>
                  </PaginationItem>
                  
                  {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
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
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === lastPage}
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

      {/* Modal de Adicionar Local */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <FormLocalRegisterDashboard onSuccess={handleAddSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}