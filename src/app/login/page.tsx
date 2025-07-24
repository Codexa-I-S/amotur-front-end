"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const loginValidationSchema = z.object({
  email: z.string().email("E-mail inválido!"),
  password: z.string().min(1, "A senha é obrigatória!"),
});

type LoginData = z.infer<typeof loginValidationSchema>;

interface GoogleCredentialResponse {
  credential?: string;
  select_by?: string;
  clientId?: string;
}

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
  });

  const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Credencial do Google não encontrada");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { idToken: credentialResponse.credential }
      );

      const token = response.data.authToken;
      localStorage.setItem("authToken", token);
      router.push("/");
    } catch (err) {
      console.error("Erro no login com o Google: ", err);
      toast.error("Falha no login com Google", { duration: 3000 });
    }
  };


    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
      idToken: credentialResponse.credential
    });
   
    const token = response.data;
    localStorage.setItem("authToken", token);
    router.push("/");

  } catch(err) {
    console.error("Erro no login com o Google: ", err);
    toast.error("Falha no login com Google", {
      duration: 3000
    });
  }
}


  const handleError = () => {
    toast.error("Erro ao autenticar com o Google", { duration: 3000 });
  };

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (!response.data.access_token) {
        throw new Error("Access token não recebido");
      }

      localStorage.setItem("authToken", response.data.access_token);

      toast.success("Login realizado com sucesso!", {
        description: "Você será redirecionado",
        duration: 3000,
      });

      setTimeout(() => router.push("/"), 3000);
    } catch (err: unknown) {
      console.error("Erro no login:", err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          const errorMessage = err.response.data?.message || "Credenciais inválidas";
          toast.error("Erro no login", {
            description: errorMessage,
            duration: 5000,
          });
        } else if (err.request) {
          toast.error("Erro de conexão", {
            description: "Servidor não respondeu. Verifique sua conexão.",
            duration: 5000,
          });
        } else {
          toast.error("Erro na requisição", {
            description: err.message,
            duration: 5000,
          });
        }
      } else if (err instanceof Error) {
        toast.error("Erro desconhecido", {
          description: err.message,
          duration: 5000,
        });
      } else {
        toast.error("Erro desconhecido", {
          description: "Ocorreu um erro inesperado",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      {/* LADO DA IMAGEM */}
      <div className="h-[40%] lg:h-full w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="absolute inset-0 bg-[url('/palm-tree.jpg')] bg-cover bg-center" />
        <Image
          className="w-[200px] lg:w-[350px] z-10"
          src="/amotur_branca.png"
          width={250}
          height={50}
          alt="Logo-Amotur"
          priority
        />
      </div>

      {/* LADO DO FORMULÁRIO */}
      <div className="bg-[#F9FAFB] h-2/3 lg:h-full w-full lg:w-1/2 rounded-t-[65px] lg:rounded-none flex justify-center items-center">
        <div className="w-[85%] lg:w-[60%] flex flex-col gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 text-[16px]">
            {/* E-mail */}
            <div className="flex flex-col gap-1">
              <label className="text-[#0E2C66]">E-mail:</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Digite seu e-mail"
                className="bg-[#F9FAFB] h-[50px] rounded-2xl"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-[#0E2C66]">Senha:</label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="bg-[#F9FAFB] h-[50px] rounded-2xl pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-[40px] text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Botão de login */}
            <div className="flex justify-center">
              <Button
                variant="designButton"
                size="buttonSize"
                disabled={loading}
                type="submit"
                className="min-w-[150px]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            {/* Login com Google */}
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>

            {/* Link para cadastro */}
            <div className="flex justify-center text-[#0E2C66] text-center text-sm">
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
  );
}