"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";

type TideData = {
  hora: string;
  altura: number;
};

type ApiResponse = {
  data: string;
  dados: TideData[];
};

export default function TideCard() {
  const [dataMar, setDataMar] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null)

  const hoje = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    async function fetchTide() {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("authToken");
      setToken(token)

      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/mares/${hoje}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataMar(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || "Erro na requisição");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTide();
  }, [hoje]);
  
  if (!token)
     return (
        <div className="flex justify-center items-center">
          <p className="text-red-600">Faça login para usar essa funcionalidade.</p>
        </div>
     )
     
  if (loading) 
    return (
      <div className="flex justify-center items-center">
        <p>Carregando tabela da maré...</p>
      </div>
  )


  if (error) return <p className="text-red-600">Erro: {error}</p>

  if (!dataMar) return null;

  return (
    <div className="w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-6 bg-gray-100 rounded-2xl shadow">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Tábua das Marés - {dayjs(dataMar.data).format("DD/MM/YYYY")}
            <TooltipProvider>
              <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setTooltipOpen(!tooltipOpen)}
                    className="focus:outline-none"
                    aria-label="Informações sobre a tábua das marés"
                  >
                    <Info className="w-5 h-5 text-blue-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="bg-white text-black text-xs leading-relaxed p-3 rounded-md shadow-md max-w-xs text-justify z-50"
                  side="top"
                  align="end"
                  sideOffset={8}
                >
                  A tábua das marés é um registro que apresenta os horários e os níveis das marés a
                  longo do dia. Na tábua a seguir, as ondas em vermelho correspondem a maré alta,
                  enquanto as ondas em verde correspondem a maré baixa.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Porto do Pecém
        </p>
      </div>

      <div className="flex justify-between text-sm text-gray-500 font-semibold border-b border-gray-300 pb-2 mb-2">
        <span>Horário</span>
        <span>Altura das ondas (m)</span>
      </div>

      <div className="divide-y divide-gray-300">
        {dataMar.dados.map(({ hora, altura }, idx) => {
          const isAlta = altura >= 1.0;

          return (
            <div key={idx} className="flex justify-between items-center py-2">
              <span className="text-gray-700 font-medium">{hora}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-semibold">
                  {altura.toFixed(2)} m
                </span>

                <Image
                  src={isAlta ? "/onda_vermelha.png" : "/onda_verde.png"}
                  alt={isAlta ? "Onda Alta" : "Onda Baixa"} 
                  width={50}
                  height={50}
                  className="h-5 w-auto"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
