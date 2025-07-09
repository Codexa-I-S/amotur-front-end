import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormLocalRegister from "./FormLocalRegister"

export default function ModalRegister(){

    return(
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-[#009089] text-white px-3 py-2 rounded">
                    Cadastrar Local
                </button>
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>Cadastro de local</DialogTitle>
                    <DialogDescription>Preencha as informações abaixo:</DialogDescription>

                </DialogHeader>
                
                <FormLocalRegister />
                
            </DialogContent>
        </Dialog>
    )

}