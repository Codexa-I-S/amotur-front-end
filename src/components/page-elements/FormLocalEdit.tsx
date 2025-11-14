"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus, Images, AlertCircle } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

interface FormLocalEditProps {
  locationId: string;
  onSuccess?: () => void;
  onClose: () => void;
}

const validationLocalSchema = z.object({
  name: z.string().min(5, "O nome é muito curto."),
  type: z.enum(
    ["bar", "hotel", "petiscaria", "ponto_turistico", "pousada", "restaurante"],
    {
      errorMap: () => ({ message: "Selecione uma categoria válida." }),
    }
  ),
  region: z.enum(["caetanos", "flecheiras", "icarai", "moitas"], {
    errorMap: () => ({ message: "Selecione uma região válida." }),
  }),
  description: z
    .string()
    .nonempty("Adicione uma descrição.")
    .min(10, "Descrição muito curta."),
  lat: z.number().min(-90).max(90, "Latitude inválida"),
  lng: z.number().min(-180).max(180, "Longitude inválida"),
  email: z.string().email("E-mail inválido."),
  phone: z
    .string()
    .regex(
      /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
      "Formato de telefone inválido. Ex: (99) 99999-9999"
    ),
  instagram: z.string().url("Insira uma url válida."),
});

type LocalFormData = z.infer<typeof validationLocalSchema>;

const typeMapping = {
  hotel: "Hotel",
  pousada: "Pousada",
  bar: "Bar",
  petiscaria: "Petiscaria",
  ponto_turistico: "Ponto Turístico",
  restaurante: "Restaurante",
} as const;

type BackendLocationType = "Hotel" | "Pousada" | "Bar" | "Petiscaria" | "Ponto Turístico" | "Restaurante";
type FormLocationType = keyof typeof typeMapping;

const reverseTypeMapping: Record<string, FormLocationType> = {
  HOTEL: "hotel",
  POUSADA: "pousada",
  BAR: "bar",
  PETISCARIA: "petiscaria",
  TURISTICO: "ponto_turistico",
  RESTAURANTE: "restaurante",
};

const typeLocalization = {
  caetanos: "Caetanos",
  flecheiras: "Flecheiras",
  icarai: "Icaraí",
  moitas: "Moitas",
} as const;

export default function FormLocalEdit({ locationId, onSuccess, onClose }: FormLocalEditProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError] = useState<string | null>(null);
  const [photoError] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const router = useRouter();

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 30000,
    withCredentials: true,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LocalFormData>({
    resolver: zodResolver(validationLocalSchema),
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/place/id=${locationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        
        // Verifica se o tipo recebido é válido
        const backendType = data.type as BackendLocationType;
        if (!(backendType in reverseTypeMapping)) {
          throw new Error(`Tipo inválido recebido do backend: ${data.type}`);
        }

        // Preenche os valores do formulário
        reset({
          name: data.name,
          type: reverseTypeMapping[backendType],
          region: Object.keys(typeLocalization).find(
            key => typeLocalization[key as keyof typeof typeLocalization] === data.localization
          ) as keyof typeof typeLocalization,
          description: data.description,
          lat: data.coordinates.lat,
          lng: data.coordinates.lng,
          email: data.contacts.email,
          phone: data.contacts.telefone,
          instagram: data.contacts.site
        });

        // Armazena as imagens atuais
        setCurrentLogo(data.logo || null);
        setCurrentPhotos(data.photos || []);

      } catch (error) {
        console.error("Erro ao carregar dados do local:", error);
        toast.error("Erro ao carregar dados do local");
      }
    };

    if (locationId) {
      fetchLocationData();
    }
  }, [locationId, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setPhotoFiles(files);
  };

  async function onSubmit(data: LocalFormData) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", typeMapping[data.type]);
      formData.append("localization", typeLocalization[data.region]);
      formData.append("description", data.description);
      formData.append(
        "coordinates",
        JSON.stringify({ lat: data.lat, lng: data.lng })
      );
      formData.append(
        "contacts",
        JSON.stringify({
          telefone: data.phone,
          email: data.email,
          site: data.instagram,
        })
      );
      if (logoFile) formData.append("logo", logoFile);
      photoFiles.forEach((file) => formData.append("photos", file));

      const token = localStorage.getItem("authToken");

      await api.put(`/place/id=${locationId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Local atualizado com sucesso!", {
        description: "O local foi atualizado com sucesso!",
        duration: 5000,
      });

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          toast.error("Acesso negado", {
            description:
              "Faça login novamente. O token pode estar expirado ou inválido.",
          });
          router.push("/login");
        } else {
          toast.error("Erro ao atualizar.", {
            description:
              error.response?.data?.message ||
              "Ocorreu um erro ao atualizar o local.",
          });
        }
      } else if (error instanceof Error) {
        toast.error("Erro desconhecido", {
          description: error.message,
        });
      } else {
        toast.error("Erro desconhecido", {
          description: "Ocorreu um erro inesperado",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full sm:max-w-2xl mx-auto bg-white rounded-2xl sm:px-6 sm:py-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-teal-600 text-center">
        Editar Local
      </h2>

      {/* Campos do formulário (iguais ao FormLocalRegisterDashboard) */}
      {/* Nome */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-1 text-gray-700 font-semibold text-sm"
        >
          Nome:
        </label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Digite o nome da empresa."
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.name.message}
          </p>
        )}
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-semibold text-sm">
          Categoria:
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="z-[1003]">
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="petiscaria">Petiscaria</SelectItem>
                <SelectItem value="ponto_turistico">Ponto Turístico</SelectItem>
                <SelectItem value="pousada">Pousada</SelectItem>
                <SelectItem value="restaurante">Restaurante</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.type.message}
          </p>
        )}
      </div>

      {/* Região */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-semibold text-sm">
          Região:
        </label>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition">
                <SelectValue placeholder="Selecione a região" />
              </SelectTrigger>
              <SelectContent className="z-[1003]">
                <SelectItem value="caetanos">Caetanos</SelectItem>
                <SelectItem value="flecheiras">Flecheiras</SelectItem>
                <SelectItem value="icarai">Icaraí</SelectItem>
                <SelectItem value="moitas">Moitas</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.region && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.region.message}
          </p>
        )}
      </div>

      {/* Descrição */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-1 text-gray-700 font-semibold text-sm"
        >
          Descrição:
        </label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Breve descrição do local."
          className="border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.description.message}
          </p>
        )}
      </div>

      {/* Coordenadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-700 font-semibold text-sm">
            Latitude:
          </label>
          <Input
            type="number"
            step="any"
            {...register("lat", { valueAsNumber: true })}
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          />
          {errors.lat && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.lat.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-semibold text-sm">
            Longitude:
          </label>
          <Input
            type="number"
            step="any"
            {...register("lng", { valueAsNumber: true })}
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          />
          {errors.lng && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.lng.message}
            </p>
          )}
        </div>
      </div>

      {/* Contatos */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-1 text-gray-700 font-semibold text-sm"
        >
          E-mail:
        </label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="email@exemplo.com"
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block mb-1 text-gray-700 font-semibold text-sm"
        >
          Telefone:
        </label>
        <Input
          id="phone"
          {...register("phone")}
          type="tel"
          placeholder="(99) 99999-9999"
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.phone.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="instagram"
          className="block mb-1 text-gray-700 font-semibold text-sm"
        >
          Instagram:
        </label>
        <Input
          id="instagram"
          {...register("instagram")}
          placeholder="https://instagram.com/sualoja"
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
        />
        {errors.instagram && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.instagram.message}
          </p>
        )}
      </div>

      {/* Logo e Fotos */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 mb-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <input
            id="file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />
          <label
            htmlFor="file"
            className="cursor-pointer p-2 rounded-md bg-teal-50 hover:bg-teal-100 transition flex items-center gap-1 text-teal-700 text-sm font-medium"
          >
            <ImagePlus size={18} />
            <span>Logo</span>
          </label>
          {logoFile ? (
            <span className="text-gray-500 text-xs italic truncate max-w-[200px] sm:max-w-xs">
              {logoFile.name}
            </span>
          ) : currentLogo && (
            <span className="text-gray-500 text-xs italic">
              Logo atual mantida
            </span>
          )}
          {logoError && (
            <span className="text-red-500 text-xs">{logoError}</span>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <input
            id="fileM"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handlePhotosChange}
          />
          <label
            htmlFor="fileM"
            className="cursor-pointer p-2 rounded-md bg-teal-50 hover:bg-teal-100 transition flex items-center gap-1 text-teal-700 text-sm font-medium"
          >
            <Images size={18} />
            <span>Fotos</span>
          </label>
          {photoFiles.length > 0 ? (
            <span className="text-gray-500 text-xs italic">
              {photoFiles.length} nova(s) foto(s)
            </span>
          ) : currentPhotos.length > 0 && (
            <span className="text-gray-500 text-xs italic">
              {currentPhotos.length} foto(s) atual mantida(s)
            </span>
          )}
          {photoError && (
            <span className="text-red-500 text-xs">{photoError}</span>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="px-6 py-2 rounded-md"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="designButton"
          size="sm"
          className="px-6 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Atualizando...
            </div>
          ) : (
            "Atualizar"
          )}
        </Button>
      </div>
    </form>
  );
}