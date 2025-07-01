'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

//Esquema de validações por campo de input
const validationSchema = z.object({
    email: z.string().min(9, "Email inválido!"),
    senha: z.string().min(8, "A senha deve conter no mínimo 8 caracteres.").regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter ao menos um caractere especial."),
    confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não coincidem",
})

//Criação de um tipo que é inferido como o validationSchema 
type FormData = z.infer<typeof validationSchema>

export default function CadastroPage() {

    //Configurações do useForm
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitSuccessful}

    } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (data: FormData) => {
        alert("os dados foram enviados")
    }

    return (

        <div className="bg-[url('/imagem_2.png')]  bg-cover bg-center h-screen w-screen flex flex-col lg:flex-row">
            
            {/* logo */}
            <div className="h-1/3  lg:h-screen w-screen lg:w-1/2 flex justify-center items-center">

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

                <div className="mt-20 lg:mt-40 w-[80%] lg:w-[60%] h-[80%] text-[20px]  flex-row">
                    
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <label className="text-white">E-mail</label>
                        <Input
                        {...register("email")}
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-4 rounded-[100px] transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        {errors.email && <p className="text-red-500" >
                            {errors.email.message}
                            </p>}

                        {/* Senha */}
                        <label className="text-white">Senha:</label>
                        <Input
                        {...register("senha")}
                        type="password"
                        placeholder="Digite sua senha"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-[100px] transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        {errors.senha && <p className="text-red-500" >
                            {errors.senha.message}    
                        </p>}
                        
                        {/* Confirmar senha */}
                        <label className="text-white">Confirme sua senha:</label>
                        <Input
                        {...register("confirmarSenha")}
                        type="password"
                        placeholder="Confirme sua senha"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-[100px] transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        {errors.confirmarSenha && <p className="text-red-500" >
                            {errors.confirmarSenha.message}    
                        </p>}
                        
                        {/* Botão */}
                        <div className="flex justify-center mt-5">

                            <Button variant={"designButton"} size={"buttonSize"} > Cadastre-se  </Button>

                        </div>
                        
                        {/* Link */}
                        <div className="flex justify-center mt-3 text-white lg:text-[15px]">
                            <p>
                                Já tem uma conta? <br></br> <a className="flex justify-center" href="" ><strong>Clique aqui.</strong></a>
                            </p>
                            
                        </div>
                        

                    </form>
                    
                    
                </div>

            </div>

        </div>

    )
}