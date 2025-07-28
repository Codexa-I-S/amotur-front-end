import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CardInfo from "../ui/CardInfo"
import { Info } from "lucide-react" 


type ModalProps = {
    
    name: string;
    type: string;
    instagramUrl: string;
    email: string;
    telefone: string;
    description: string;
    images: string[];
    logo: string;
    
}

export default function ModalCard({name, type, instagramUrl, email, telefone, description, images, logo} : ModalProps) {

    return (
        <Dialog>
            <DialogTrigger className="mt-2 cursor-pointer text-[12px]">
                
                <div className="flex gap-1">
                    <Info width={15} height={15}/>Informações
                </div>
        
            </DialogTrigger>
            <DialogContent className="p-5 z-[1010]">
                
                 <DialogHeader>

                    <DialogTitle>
                        
                    </DialogTitle>

                </DialogHeader>

                <CardInfo
                name={name}
                type={type}
                instagramUrl={instagramUrl}
                email={email}
                telefone={telefone}
                description={description}
                logo={logo}
                images={images}
                
                />
                

            </DialogContent>
        </Dialog>
    )
}