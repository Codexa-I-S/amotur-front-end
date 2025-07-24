import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CardInfo from "../ui/CardInfo"


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
            <DialogTrigger className="mt-2 cursor-pointer">
                
                Mais informações
        
            </DialogTrigger>
            <DialogContent className="p-5">
                
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