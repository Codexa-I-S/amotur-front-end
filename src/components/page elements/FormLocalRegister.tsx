'use client'

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Controller } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const validationLocalSchema = z.object({
    name: z.string().min(5, "O nome é muito curto."),
    type: z.enum(["hotel", "pousada", "bar", "restaurante"]),
    description: z.string().nonempty("Coloque uma descrição").min(10, "Descrição muito curta."),
    lat: z.number(),
    lng: z.number(),
    email: z.string().email("E-mail inválido."),
    phone: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Formato de telefone inválido. Ex: (99) 99999-9999"),
    Instagram: z.string().url("Insira uma url válida."),
})

type LocalFormData = z.infer<typeof validationLocalSchema>

type Props = {
    lat: number;
    lng: number;
}

// Mapeamento para converter os valores do select para o formato esperado pelo servidor
const typeMapping = {
  hotel: "Hotel",
  pousada: "Pousada",
  bar: "Bar",
  restaurante: "Restaurante"
};

export default function FormLocalRegister({ lat, lng }: Props) {
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [photoFiles, setPhotoFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    // Criando instância do Axios
    const api = axios.create({
        baseURL: 'https://squad-03-server-production.up.railway.app',
        timeout: 30000
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<LocalFormData>({
        resolver: zodResolver(validationLocalSchema),
        defaultValues: {
            lat,
            lng,
            type: undefined // Alterado para string vazia para evitar warning de uncontrolled/controlled
        }
    })
            // diz que so pode 1 arquivo pra logo
            const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                    setLogoFile(e.target.files[0])
                }
            }
            
            // diz que so pode 3 arquivo pra fotos
                const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                    const selectedFiles = Array.from(e.target.files)

                    if (selectedFiles.length > 3) {
                        alert("Você pode selecionar no máximo 4 fotos.") // substituir por um mensagem 
                        return
                    }

                    setPhotoFiles(selectedFiles)
                }
            }

    async function onSubmit(data: LocalFormData) {
        setIsSubmitting(true)
        
        try {
            const token = localStorage.getItem('authToken')
            
            if (!token) {
                alert('Você precisa estar logado para cadastrar um local!')// substituir por um mensagem 
                router.push('/login')
                return
            }

            const formData = new FormData()
            
            // Adiciona os campos básicos ao FormData
            formData.append('name', data.name)
            // Converte o tipo para o formato esperado pelo servidor
            formData.append('type', typeMapping[data.type as keyof typeof typeMapping])
            formData.append('description', data.description)
            
            // transforma as coordenadas como string JSON
            const coordinates = JSON.stringify({
                lat: data.lat,
                lon: data.lng
            })
            formData.append('coordinates', coordinates)
            
            // transfirma os contatos como string JSON
            const contacts = JSON.stringify({
                telefone: data.phone,
                email: data.email
            })
            formData.append('contacts', contacts)
            
            // Adiciona os arquivos
            if (logoFile) formData.append('logo', logoFile)
            photoFiles.forEach(file => formData.append('photos', file))

            
            for (const [key, value] of formData.entries()) {
                console.log(key, value)
            }

            // Faz a requisição
            const response = await api.post("/place", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
            })

            alert("Local cadastrado com sucesso!")// substituir por um mensagem 
            window.location.reload()
            
        } catch (error: any) {
            console.error('Erro detalhado:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config,
                headers: error.response?.headers
            })
            
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('authToken')
                alert('Acesso negado. Faça login novamente. O token pode estar expirado ou inválido.')
                router.push('/login')
            } else if (error.response?.status === 400) {
                alert(`Erro de validação: ${JSON.stringify(error.response.data, null, 2)}`)
            } else {
                alert(error.response?.data?.message || "Ocorreu um erro ao cadastrar o local.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* Name */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Nome:</label>
                <Input
                    {...register("name")}
                    type="text"
                    placeholder="Digite o nome da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            
            {/* Type */}
            <div className="flex items-center">
                <label>Tipo: </label>
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px] ml-9 sm:ml-12 text-15">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="z-[1003]">
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="pousada">Pousada</SelectItem>
                                <SelectItem value="bar">Bar</SelectItem>
                                <SelectItem value="restaurante">Restaurante</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}

            {/* Description */}
            <div>
                <label>Descrição:</label>
                <Textarea
                    {...register("description")}
                    placeholder="Descrição do local"
                    className="mt-2"
                />
            </div>
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {/* Coordinates */}
            <div className="flex flex-col sm:flex-row">
                <label className="sm:w-20 mr-2">Latitude:</label>
                <Input
                    type="text"
                    value={lat}
                    className="w-full mt-2 sm:w-[30%] sm:mt-0 h-8 p-2 lg:text-[14px]"
                    readOnly
                />

                <label className="sm:w-20 px-2 mr-6">Longitude:</label>
                <Input
                    type="text"
                    value={lng}
                    className="w-full mt-2 sm:w-[30%] sm:mt-0 h-8 p-2 lg:text-[14px]"
                    readOnly
                />
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Email:</label>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Digite o e-mail da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Telefone:</label>
                <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="(99) 99999-9999"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Instagram:</label>
                <Input
                    {...register("Instagram")}
                    type="text"
                    placeholder="https://www.instagram.com/sualoja"
                    className="w-full sm:ml-4 sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.Instagram && <p className="text-red-500">{errors.Instagram.message}</p>}

            {/* logo */}
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label>Logo:</label>
                <Input 
                    type="file"
                    onChange={handleLogoChange}
                    className="mt-2 sm:ml-5 sm:mt-0"
                    accept="image/*"
                />
            </div>

            {/* Photos */}
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label>Fotos:</label>
                <Input 
                    multiple
                    type="file"
                    onChange={handlePhotosChange}
                    className="mt-2 sm:ml-5 sm:mt-0"
                    accept="image/*"
                />
            </div>

            <div className="flex justify-center">
                <Button 
                    variant={"designButton"} 
                    size={"sm"}
                    className="px-4"
                    disabled={isSubmitting}
                > 
                    {isSubmitting ? "Enviando..." : "Cadastrar"}
                </Button>
            </div>
        </form>
    )
}