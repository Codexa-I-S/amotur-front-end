'use client'

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
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

const validationLocalSchema = z.object({
    name: 
        z.string()
        .min(5, "O nome é muito curto."),

    type:   
        z.enum(["hotel", "pousada", "bar", "restaurante"]),

    description:   
        z.string().nonempty("Coloque uma descrição") 
        .min(10, "Descrição muito curta."),

    lat: 
        z.number(),

    lng: 
        z.number(),

    email: 
        z.string()
        .email("E-mail inválido."),

    phone: 
        z.string()
        .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
        "Formato de telefone inválido. Ex: (99) 99999-9999"),
    
    Instagram: 
        z.string()
        .url("Insira uma url válida."),

})

type LocalFormData = z.infer<typeof validationLocalSchema>


type props = {
    lat: number;
    lng: number;
}

export default function FormLocalRegister({lat, lng} : props) {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitSuccessful}
    } = useForm<LocalFormData>({
        resolver: zodResolver(validationLocalSchema),
        defaultValues: {
            lat,
            lng
        }
    })

    function onSubmit(data: LocalFormData) {
        //lugar da requisição
    }

    return (

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >

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
            {errors.name && <p className="text-red-500" >
                {errors.name.message}    
            </p>}
            

            {/* Type */}
            <div className="flex items-center">
                <label>Tipo: </label>
                <Select
                    {...register("type")} >
                    <SelectTrigger className="w-[180px] ml-9 sm:ml-12 text-15">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="z-[1003]" >
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="pousada">Pousada</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="restaurante">Restaurante</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {errors.type && <p className="text-red-500" >
                {errors.type.message}    
            </p>}

            {/* Description */}
            <div>
                <label>Descrição:</label>
                <Textarea
                {...register("description")}
                placeholder="Descrição do local"
                className="mt-2"
                />
            </div>
            {errors.description && <p className="text-red-500" >
                {errors.description.message}    
            </p>}

            {/* Coordinates */}
            <div className="flex flex-col sm:flex-row" >
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
            {errors.email && <p className="text-red-500" >
                {errors.email.message}    
            </p>}

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Telefone:</label>
                <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="Digite o número de telefone da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.phone && <p className="text-red-500" >
                {errors.phone.message}    
            </p>}
            
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Instagram:</label>
                <Input
                    {...register("Instagram")}
                    type="text"
                    placeholder="Digite a url para o instagram da empresa"
                    className="w-full sm:ml-4 sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            {errors.Instagram && <p className="text-red-500" >
                {errors.Instagram.message}    
            </p>}

            {/* logo */}
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label>Logo:</label>
                <Input 
                type="file"
                className="mt-2 sm:ml-5 sm:mt-0"
                />
            </div>

            {/* Photos */}
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label>Fotos:</label>
                <Input 
                multiple
                type="file"
                className="mt-2 sm:ml-5 sm:mt-0"
                />
            </div>

            <div className="flex justify-center">
                <Button 
                variant={"designButton"} 
                size={"sm"}
                className="px-4"
                > Cadastrar
                </Button>
            </div>

        </form>

    )

}