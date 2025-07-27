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
import { Loader2, ImagePlus, Images, AlertCircle} from "lucide-react";
import axios from "axios";
import { useState } from "react";


interface FormLocalRegisterDashboardProps {
  onSuccess?: () => void;
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

const typeLocalization = {
  caetanos: "Caetanos",
  flecheiras: "Flecheiras",
  icarai: "Icaraí",
  moitas: "Moitas",
};

export default function FormLocalRegisterDashboard({ onSuccess }: FormLocalRegisterDashboardProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
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
    formState: { errors },
  } = useForm<LocalFormData>({
    resolver: zodResolver(validationLocalSchema),
    defaultValues: {
      lat: 0,
      lng: 0,
    },
  });


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
    if (!logoFile) {
      setLogoError("Você precisa adicionar uma logo.");
      return;
    } else {
      setLogoError(null);
    }

    if (photoFiles.length === 0) {
      setPhotoError("Você precisa adicionar pelo menos uma foto.");
      return;
    } else if (photoFiles.length > 3) {
      setPhotoError("Você pode adicionar no máximo 3 fotos.");
      return;
    } else {
      setPhotoError(null);
    }

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

      await api.post("/place", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Local cadastrado com sucesso!", {
        description: "O local foi registrado com sucesso!",
        duration: 5000,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => window.location.reload(), 3000);
      }
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
          toast.error("Erro ao cadastrar.", {
            description:
              error.response?.data?.message ||
              "Ocorreu um erro ao cadastrar o local.",
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
        Cadastrar Local
      </h2>

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
          <div className="flex gap-2">
            <Input
              type="number"
              step="any"
              {...register("lat", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            />
          </div>
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
          <div className="flex gap-2">
            <Input
              type="number"
              step="any"
              {...register("lng", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            />
          </div>
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
          {logoFile && (
            <span className="text-gray-500 text-xs italic truncate max-w-[200px] sm:max-w-xs">
              {logoFile.name}
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
          {photoFiles.length > 0 && (
            <span className="text-gray-500 text-xs italic">
              {photoFiles.length} foto{photoFiles.length > 1 ? "s" : ""}
            </span>
          )}
          {photoError && (
            <span className="text-red-500 text-xs">{photoError}</span>
          )}
        </div>
      </div>

      {/* Botão de cadastro */}
      <div className="flex justify-center">
        <Button
          variant="designButton"
          size="sm"
          className="w-full max-w-xs px-6 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando...
            </div>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </div>
    </form>
  );
}