'use client'

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


export default function FormLocalRegister() {

    return (

        <form className="space-y-4">

            {/* Name */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Nome:</label>
                <Input
                    type="text"
                    placeholder="Digite o nome da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>

            {/* Type */}
            <div className="flex items-center">
                <label>Tipo: </label>
                <Select>
                    <SelectTrigger className="w-[180px] ml-9 sm:ml-12 text-15">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="pousada">Pousada</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="restaurante">Restaurante</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Description */}
            <div>
                <label>Descrição:</label>
                <Textarea
                placeholder="Descrição do local"
                className="mt-2"
                />
            </div>

            {/* Coordinates */}
            <div className="flex flex-col sm:flex-row" >
                <label className="sm:w-20 mr-2">Latitude:</label>
                <Input
                    type="text"
                    value={""}
                    className="w-full mt-2 sm:w-[30%] sm:mt-0 h-8 p-2 lg:text-[14px]"
                    readOnly
                />

                <label className="sm:w-20 px-2 mr-6">Longitude:</label>
                <Input
                    type="text"
                    value={""}
                    className="w-full mt-2 sm:w-[30%] sm:mt-0 h-8 p-2 lg:text-[14px]"
                    readOnly
                />
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Email:</label>
                <Input
                    type="email"
                    placeholder="Digite o e-mail da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Telefone:</label>
                <Input
                    type="tel"
                    placeholder="Digite o número de telefone da empresa"
                    className="w-full sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>
            
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <label className="sm:w-20">Instagram:</label>
                <Input
                    type="text"
                    placeholder="Digite a url para o instagram da empresa"
                    className="w-full sm:ml-4 sm:w-[70%] h-8 p-2 lg:text-[14px]"
                />
            </div>

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

        </form>

    )

}