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
import axios from "axios"

// Esquema de validação
const loginValidationSchema = z.object({
  email: z.string().email("E-mail inválido!"),
  password: z.string().min(1, "A senha é obrigatória!")
})

type LoginData = z.infer<typeof loginValidationSchema>

// Instância axios
const api = axios.create({
  baseURL: 'http://localhost:3123',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
  })

  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    setError("")

    try {
     
      // 1. Requisição
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password
      })


      // 2. Verifica se access_token existe
      if (!response.data.access_token) {
        throw new Error("Access token não recebido na resposta")
      }

      // 3. Armazena o token no localStorage
      localStorage.setItem("authToken", response.data.access_token)
      
      // 4. Configura o token para futuras requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
      
      // 5. página inicial
      router.push("/Inicio")

    } catch (err) {
      
      // Tratamento de erros
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Erro retornado pelo servidor
          setError(err.response.data?.message || "Credenciais inválidas")
        } else if (err.request) {
          // A requisição foi feita mas não houve resposta
          setError("Servidor não respondeu. Tente novamente mais tarde.")
        } else {
          // erros Axios
          setError("Erro ao configurar a requisição")
        }
      } else if (err instanceof Error) {
        // Erros gerais
        setError(err.message)
      } else {
        setError("Ocorreu um erro inesperado")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[url('/imagem_2.png')] bg-cover bg-center h-screen w-screen flex flex-col lg:flex-row">
      
      {/* Logo */}
      <div className="h-1/3 lg:h-screen w-screen lg:w-1/2 flex justify-center items-center">
        <Image
          className="lg:w-[350px]"
          src={'/amotur_azul.png'}
          width={250}
          height={50}
          alt="Logo-Amotur"
          priority
        />
      </div>

      {/* Formulário */}
      <div className="bg-[#009089] h-2/3 lg:h-screen w-screen lg:w-1/2 rounded-t-[100px] lg:rounded-none flex flex-col justify-center items-center">
        <div className="mt-20 lg:mt-50 w-[80%] lg:w-[60%] h-[80%] text-[20px] flex-row">
          
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-white block mb-1">E-mail</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Digite seu e-mail"
                className="bg-[#f5f5f5] h-[45px] rounded-2xl transition-transform duration-300 hover:scale-104"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Senha */}
            <div>
              <label className="text-white block mb-1">Senha:</label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Digite sua senha"
                className="bg-[#f5f5f5] h-[45px] rounded-2xl transition-transform duration-300 hover:scale-104"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                variant={"designButton"} 
                size={"buttonSize"}
                disabled={loading}
                className="w-full max-w-xs"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Carregando...
                  </span>
                ) : "Login"}
              </Button>
            </div>
            
            <div className="flex justify-center pt-8 text-white lg:text-[15px] text-center">
              <p>
                Esqueceu sua senha? <br />
                <Link href="/recuperar-senha" className="font-bold hover:underline">
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