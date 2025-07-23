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
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export default function CadastroPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (data: FormData) => {
        const formData = {
            email: data.email,
            password: data.password
        }
        setIsLoading(true)
        
        try {
            await api.post('/auth/register', formData)
            toast.success('Cadastro realizado com sucesso!', {
                description: 'Você será redirecionado para a página inicial',
                duration: 3000,
            })
            
            setTimeout(() => router.push('/'), 3000)

        } catch (error: unknown) {
            console.error('Erro no cadastro:', error)
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 409) {
                        toast.error('Este e-mail já está cadastrado', {
                            description: 'Por favor, utilize outro e-mail ou faça login',
                            duration: 5000,
                        })
                    } else {
                        const errorMessage = error.response.data?.message || 
                                          error.response.data?.error || 
                                          'Erro no servidor'
                        toast.error('Erro no cadastro', {
                            description: errorMessage,
                            duration: 5000,
                        })
                    }
                } else if (error.request) {
                    toast.error('Erro de conexão', {
                        description: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
                        duration: 5000,
                    })
                } else {
                    toast.error('Erro na requisição', {
                        description: error.message,
                        duration: 5000,
                    })
                }
            } else if (error instanceof Error) {
                toast.error('Erro desconhecido', {
                    description: error.message,
                    duration: 5000,
                })
            } else {
                toast.error('Erro desconhecido', {
                    description: 'Ocorreu um erro inesperado',
                    duration: 5000,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[url('/imagem_2.png')] bg-cover bg-center h-screen w-screen flex flex-col lg:flex-row">
            
            <div className="h-1/3 lg:h-screen w-screen lg:w-1/2 flex justify-center items-center lg:mt-[-20]">
                <Image
                    className="lg:w-[350px]"
                    src={'/amotur_azul.png'}
                    width={250}
                    height={50}
                    alt="Logo-Amotur"
                />
            </div>

            <div className="bg-[#009089] h-2/3 lg:h-screen w-screen lg:w-1/2 rounded-t-[100px] lg:rounded-none flex flex-col justify-center items-center">
                <div className="mt-10 lg:mt-40 w-[80%] lg:w-[60%] h-[80%] text-[20px] flex-row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-white">E-mail</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-4 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.email && <p className="text-red-500 ">{errors.email.message}</p>}

                        <label className="text-white">Senha:</label>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="Digite sua senha"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        
                        <label className="text-white">Confirme sua senha:</label>
                        <Input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="Confirme sua senha"
                            className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-2xl transition-transform duration-300 hover:scale-104"
                            width={400}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                        
                        <div className="flex justify-center mt-5 lg:mt-7">
                            <Button 
                                variant={"designButton"} 
                                size={"buttonSize"}
                                disabled={isLoading}
                                type="submit"
                                className="min-w-[120px]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        Cadastrando...
                                    </div>
                                ) : (
                                    'Cadastre-se'
                                )}
                            </Button>
                        </div>
                        
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