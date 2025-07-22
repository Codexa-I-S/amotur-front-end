import {
  Dialog,
  DialogContent,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormLocalRegister from "./FormLocalRegister"

type Props = {
  lat: number
  lng: number
}

export default function ModalRegister({ lat, lng }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#009089] text-white px-3 py-2 rounded">
          Cadastrar Local
        </button>
      </DialogTrigger>

      <DialogContent
        className={`
          max-h-[90vh] overflow-y-auto
          w-[95vw] max-w-md sm:max-w-lg
          // p-0 sm:p-6
          z-[1002]
          border-none        /* Remove bordas */
          shadow-md          /* Sombra leve para profundidade */
          rounded-lg         /* Cantos arredondados */
          `}
      >
        {/* <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-[#009089] text-xl text-center">
            Cadastrar Local
          </DialogTitle>
          {/* Se tiver botão fechar personalizado, coloque aqui */}
        {/* </DialogHeader> */}

        {/* Aqui o FormLocalRegister deve ter seu próprio padding para espaçamento interno */}
        <FormLocalRegister lat={lat} lng={lng} />
      </DialogContent>
    </Dialog>
  )
}
