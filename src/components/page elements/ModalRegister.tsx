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

            <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] max-w-md sm:max-w-lg p-4 sm:p-6" >

                <DialogHeader>

                    <DialogTitle>Cadastro de local</DialogTitle>
                    <DialogDescription>Preencha as informações abaixo:</DialogDescription>

                </DialogHeader>
                
                <FormLocalRegister />
                
            </DialogContent>
        </Dialog>
    )

}