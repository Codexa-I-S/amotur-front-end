'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// Validações de input
const validationSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string()
        .min(8, "A senha deve conter no mínimo 8 caracteres.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter ao menos um caractere especial."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
})

type FormData = z.infer<typeof validationSchema>

// instância do axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:3123',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Importante para CORS com credenciais
  
});

export default function CadastroPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (data: FormData) => {
        const { confirmPassword, ...formData } = data
        setIsLoading(true)
        
        try {
            const response = await api.post('/auth/register', formData)
            alert('Cadastro realizado com sucesso!')
            
            // Redireciona para a página inicial
            router.push('/Inicio')

        } catch (error: any) {
            console.error('Erro no cadastro:', error)
            
            // Tratamento de erros com axios
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // O servidor respondeu com um status fora do range 2xx
                    if (error.response.status === 409) {
                        alert('Este e-mail já está cadastrado')
                    } else {
                        const errorMessage = error.response.data?.message || 
                                          error.response.data?.error || 
                                          'Erro no servidor'
                        alert(errorMessage)
                    }
                } else if (error.request) {
                    // A requisição foi feita mas não houve resposta
                    alert('Não foi possível conectar ao servidor. Verifique sua conexão.')
                } else {
                    // Outros erros
                    alert('Erro ao configurar a requisição: ' + error.message)
                }
            } else {
                // Erro não relacionado ao axios
                alert('Erro desconhecido: ' + error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[url('/imagem_2.png')] bg-cover bg-center h-screen w-screen flex flex-col lg:flex-row">
            
            {/* logo */}
            <div className="h-1/3 lg:h-screen w-screen lg:w-1/2 flex justify-center items-center lg:mt-[-20]">
                <Image
                    className="lg:w-[350px]"
                    src={'/amotur_azul.png'}
                    width={250}
                    height={50}
                    alt="Logo-Amotur"
                />
            </div>

            {/* Forms */}
            <div className="bg-[#009089] h-2/3 lg:h-screen w-screen lg:w-1/2 rounded-t-[100px] lg:rounded-none flex flex-col justify-center items-center">
                <div className="mt-60 lg:mt-40 w-[80%] lg:w-[60%] h-[80%] text-[20px] flex-row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <label className="text-white">E-mail</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-4 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {/* Senha */}
                        <label className="text-white">Senha:</label>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="Digite sua senha"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        
                        {/* Confirmar senha */}
                        <label className="text-white">Confirme sua senha:</label>
                        <Input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="Confirme sua senha"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                        
                        {/* Botão */}
                        <div className="flex justify-center mt-5 lg:mt-7">
                            <Button 
                                variant={"designButton"} 
                                size={"buttonSize"}
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? 'Cadastrando...' : 'Cadastre-se'}
                            </Button>
                        </div>
                        
                        {/* Link para login */}
                        <div className="flex justify-center mt-3 text-[14px] text-white lg:text-[15px]">
                            <p>
                                Já tem uma conta? <br /> 
                                <a className="flex justify-center hover:underline" href="/login">
                                    <strong>Clique aqui.</strong>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}