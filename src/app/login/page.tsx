
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
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
                    
                    <form>

                        <label className="text-white">E-mail</label>
                        <Input
                        type="Email"
                        placeholder="Digite seu e-mail"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-4 rounded-[100px] transition-transform duration-300 hover:scale-104"
                        width={400}
                        />

                        <label className="text-white">Senha:</label>
                        <Input
                        type="password"
                        placeholder="Digite sua senha"
                        className="bg-[#f5f5f5] h-[45px] mt-3 mb-2 rounded-[100px] transition-transform duration-300 hover:scale-104"
                        width={400}
                        />
                        
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