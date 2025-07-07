'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//Esquema de validação de dados dos campos de login
const loginValidationSchema = z.object({
    email: z.string().email("E-mail inválido!"),
    password: z.string().min(1, "A senha é obrigatória!")
})

//Criação de um tipo inferido como loginValidationSchema
type loginData = z.infer<typeof loginValidationSchema>


export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitSuccessful}
    } = useForm<loginData>({
        resolver: zodResolver(loginValidationSchema),
    })

    const onSubmit = (data: loginData) => {

        //lugar onde vai ficar a requisição para o backend

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

                <div className="mt-20 lg:mt-50 w-[80%] lg:w-[60%] h-[80%] text-[20px]  flex-row">
                    
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <label className="text-white">E-mail</label>
                        <Input
                        {...register("email")}
                        type="Email"
                        placeholder="Digite seu e-mail"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-4 rounded-2xl transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        {errors.email && <p className="text-red-500" >
                            {errors.email.message}    
                        </p>}

                        {/* Password */}
                        <label className="text-white">Senha:</label>
                        <Input
                        {...register("password")}
                        type="password"
                        placeholder="Digite sua senha"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-2xl transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        {errors.password && <p className="text-red-500">
                            {errors.password.message}
                        </p>}
                        
                        <div className="flex justify-center mt-10">

                            <Button variant={"designButton"} size={"buttonSize"} > Login  </Button>

                        </div>
                        
                        <div className="flex justify-center mt-10 text-white lg:text-[15px]">
                            <p>
                                Esqueceu sua senha? <br></br> <a className="flex justify-center" href="" ><strong>Clique aqui.</strong></a>
                            </p>
                        </div>

                    </form>
                    
                    
                </div>

            </div>

        </div>

    )
}