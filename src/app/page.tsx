
import Image from "next/image"
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

                <div className="mt-20 lg:mt-50 w-[80%] lg:w-[60%] h-[80%] text-[20px] mx-auto flex flex-col items-center">
                    
                        
                    <div className="flex justify-center mt-20 flex-col gap-6">

                        <a href="/login">
                            <Button variant={"designButton"} size={"buttonSize"} > Login  </Button>
                        </a>

                        <a href="/cadastro">
                            <Button variant={"designButton"} size={"buttonSize"} > Cadastre-se  </Button>
                        </a>
                        
                        <div className="flex justify-center mt-40 text-white lg:text-[15px] lg:mt-10">
                            <p>
                                <a className="flex justify-center" href="" ><strong>amo.tur.br</strong></a>
                            </p>
                        </div>

                    </div>
                    
                </div>

            </div>

        </div>

    )
}