import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import FormLocalRegister from "./FormLocalRegister"

type Props = {
  lat: number
  lng: number
}

export default function ModalRegister({ lat, lng }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#0077b6] text-white px-3 py-2 rounded">
          Cadastrar Local
        </button>
      </DialogTrigger>

      <DialogContent
        className={`
          scrollbar-hidden
          max-h-[90vh] overflow-y-auto
          w-[95vw] max-w-md sm:max-w-lg
          p-0 sm:p-0
          z-[1002]
          border-none      
              
          rounded-lg         
          `}
      >

        <VisuallyHidden>
          <DialogTitle>Cadastrar Local</DialogTitle>
        </VisuallyHidden>
        

        {/* Aqui o FormLocalRegister deve ter seu próprio padding para espaçamento interno */}
        <FormLocalRegister lat={lat} lng={lng} />
      </DialogContent>
    </Dialog>
  )
}
