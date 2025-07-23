'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import axios from "axios" // Removido AxiosError não utilizado
import { toast } from "sonner"
import { Loader2, Eye, EyeOff } from "lucide-react"

const loginValidationSchema = z.object({
  email: z.string().email("E-mail inválido!"),
  password: z.string().min(1, "A senha é obrigatória!")
})

type LoginData = z.infer<typeof loginValidationSchema>

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
  })

  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password
      })

      if (!response.data.access_token) {
        throw new Error("Access token não recebido")
      }

      localStorage.setItem("authToken", response.data.access_token)
      
      toast.success('Login realizado com sucesso!', {
        description: 'Você será redirecionado',
        duration: 3000,
      })
      
      setTimeout(() => router.push("/"), 3000)

    } catch (err: unknown) {
      console.error('Erro no login:', err)
      
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const errorMessage = err.response.data?.message || "Credenciais inválidas"
          toast.error('Erro no login', {
            description: errorMessage,
            duration: 5000,
          })
        } else if (err.request) {
          toast.error('Erro de conexão', {
            description: 'Servidor não respondeu. Verifique sua conexão.',
            duration: 5000,
          })
        } else {
          toast.error('Erro na requisição', {
            description: err.message,
            duration: 5000,
          })
        }
      } else if (err instanceof Error) {
        toast.error('Erro desconhecido', {
          description: err.message,
          duration: 5000,
        })
      } else {
        toast.error('Erro desconhecido', {
          description: 'Ocorreu um erro inesperado',
          duration: 5000,
        })
      }
    } finally {
      setLoading(false)
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
          priority
        />
      </div>

      <div className="bg-[#009089] h-2/3 lg:h-screen w-screen lg:w-1/2 rounded-t-[100px] lg:rounded-none flex flex-col justify-center items-center">
        <div className="mt-20 lg:mt-60 w-[80%] lg:w-[60%] h-[80%] text-[20px] flex-row">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white block mb-1">E-mail</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Digite seu e-mail"
                className="bg-[#f5f5f5] h-[45px] rounded-2xl hover:scale-104 transition-transform"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label className="text-white block mb-1">Senha:</label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="bg-[#f5f5f5] h-[45px] rounded-2xl hover:scale-104 transition-transform pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 mt-9" />
                ) : (
                  <Eye className="h-5 w-5 mt-9" />
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                variant={"designButton"} 
                size={"buttonSize"}
                disabled={loading}
                type="submit"
                className="min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Entrando...
                  </div>
                ) : "Login"}
              </Button>
            </div>
            
            <div className="flex justify-center pt-8 text-white lg:text-[15px] text-center">
              <p>
                Ainda não tem uma conta? <br />
                <Link href="/cadastro" className="font-bold hover:underline">
                  Clique aqui.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}