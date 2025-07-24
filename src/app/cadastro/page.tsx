"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const validationSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres.")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter ao menos um caractere especial."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

type FormData = z.infer<typeof validationSchema>;

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default function CadastroPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);

    try {
      await api.post("/auth/register", formData);
      toast.success("Cadastro realizado com sucesso!", {
        description: "Você será redirecionado para a página inicial",
        duration: 3000,
      });
      setTimeout(() => router.push("/"), 3000);
    } catch (error: unknown) {
      console.error("Erro no cadastro:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("Este e-mail já está cadastrado", {
              description: "Por favor, utilize outro e-mail ou faça login",
              duration: 5000,
            });
          } else {
            const errorMessage = error.response.data?.message || error.response.data?.error || "Erro no servidor";
            toast.error("Erro no cadastro", {
              description: errorMessage,
              duration: 5000,
            });
          }
        } else if (error.request) {
          toast.error("Erro de conexão", {
            description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
            duration: 5000,
          });
        } else {
          toast.error("Erro na requisição", {
            description: error.message,
            duration: 5000,
          });
        }
      } else if (error instanceof Error) {
        toast.error("Erro desconhecido", {
          description: error.message,
          duration: 5000,
        });
      } else {
        toast.error("Erro desconhecido", {
          description: "Ocorreu um erro inesperado",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      {/* Lado esquerdo com imagem */}
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

      {/* Lado direito com formulário */}
      <div className="bg-[#F9FAFB] h-2/3 lg:h-full w-full lg:w-1/2 rounded-t-[65px] lg:rounded-none flex justify-center items-center">
        <div className="mt-10 lg:mt-40 w-[85%] lg:w-[60%] text-[16px] flex flex-col gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[#0E2C66]">E-mail:</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Digite seu e-mail"
                className="bg-[#F9FAFB] h-[50px] rounded-2xl"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#0E2C66]">Senha:</label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Digite sua senha"
                className="bg-[#F9FAFB] h-[50px] rounded-2xl"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>


            <div className="flex flex-col gap-1">
              <label className="text-[#0E2C66]">Confirme sua senha:</label>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirme sua senha"
                className="bg-[#F9FAFB] h-[50px] rounded-2xl"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex justify-center mt-2">
              <Button
                variant={"designButton"}
                size={"buttonSize"}
                disabled={isLoading}
                type="submit"
                className="min-w-[150px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Cadastrando...
                  </div>
                ) : (
                  "Cadastre-se"
                )}
              </Button>
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

            <div className="flex justify-center mt-2 text-sm text-[#0E2C66] text-center">
              <p>
                Já tem uma conta? <br />
                <a className="hover:underline" href="/login">
                  <strong>Clique aqui.</strong>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}