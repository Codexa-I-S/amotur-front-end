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

  const hoje = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    async function fetchTide() {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("authToken");

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
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchTide();
  }, [hoje]);

  if (loading) return <p>Carregando tabela da maré...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;
  if (!dataMar) return null;

  return (
    <div className="w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-6 bg-gray-100 rounded-2xl shadow">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Tábua das Marés - {dayjs(dataMar.data).format("DD/MM/YYYY")}
        </h2>

        <TooltipProvider>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTooltipOpen(!tooltipOpen)}
                className="ml-4 focus:outline-none"
                aria-label="Informações sobre a tábua das marés"
              >
                <Info className="w-5 h-5 text-blue-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              className="bg-white text-gray-700 text-xs leading-relaxed p-3 rounded-md shadow-md max-w-xs text-justify border border-gray-300 z-50"
              side="top"
              align="end"
              sideOffset={8}
            >
              A tábua das marés é um registro que apresenta os horários e os níveis das marés ao
              longo do dia. Sua consulta é essencial para garantir um planejamento seguro de
              atividades costeiras.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex justify-between text-sm text-gray-500 font-semibold border-b border-gray-300 pb-2 mb-2">
        <span>Horário</span>
        <span>Altura das ondas (m)</span>
      </div>

      <div className="divide-y divide-gray-300">
        {dataMar.dados.map(({ hora, altura }, idx) => {
          const isAlta = altura >= 1.0;

          return (
            <div
              key={idx}
              className="flex justify-between items-center py-2"
            >
              <span className="text-gray-700 font-medium">{hora}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-semibold">
                  {altura.toFixed(2)} m
                </span>
                {isAlta ? (
                  // Maré alta – ícone vermelho (onda)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                    className="text-red-600"
                  >
                    <path
                      fill="currentColor"
                      d="M502.6 278.6c-7.1-1.9-14.5-3.2-21.7-4.3c-8.8-1.2-17.7-1.7-26.6-1.6c-25.5 .1-50.3 6.1-72.4 16.8c-8.6 4.2-16.9 9.1-24.6 14.7c-3.5 2.5-6.8 5.1-10.1 7.8c-2.8 2.3-5.5 4.6-8.4 6.7c-5.7 4.3-12.7 6.6-19.8 6.5c-9.3-.1-18.1-4-24.4-10.7c-5.8-6.1-12.7-11.1-20.2-14.7c-13.4-6.4-28.5-9.2-43.2-8.1c-19.4 1.5-37.4 9.8-51.1 23.5c-9.2 9.1-21.7 14.2-34.7 14c-14.2-.3-27.8-6.8-36.6-17.8c-7.2-8.9-16.3-16.3-26.5-21.6c-13.3-6.9-28.3-10.4-43.3-10.1c-8.8 .2-17.6 1.4-26.1 3.8c-5.3 1.5-10.5-2.5-10.5-8c0-3.6 2.4-6.9 5.8-7.9C44 264.4 63.1 261.3 82 261.6c21.7 .3 43.1 5.8 62.3 16c8.3 4.4 16 9.8 22.9 16.1c3.3 3 6.4 6.1 9.3 9.4c5.7 6.6 14.1 10.4 22.9 10.6c7.6 .2 15.1-2.4 21-7.2c6.8-5.5 14.2-10.2 22.1-13.9c10.8-5 22.6-7.6 34.5-7.6c16.3 0 32.1 4.7 45.4 13.5c4.7 3.1 9 6.7 13 10.7c3.6 3.6 8.6 5.6 13.8 5.6c4.6 0 9.1-1.5 12.7-4.3c6.9-5.2 14.2-10 21.7-14.1c15.6-8.8 33.1-13.6 50.9-14.2c10.1-.3 20.2 .6 30.1 2.6c4.3 .9 7.2 4.7 7.2 9.1c0 6.3-5.9 11-12.2 9.3z"
                    />
                  </svg>
                ) : (
                  // Maré baixa – ícone verde (seta)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                    className="text-green-600"
                  >
                    <path
                      fill="currentColor"
                      d="M480 224H32c-17.67 0-26.74 21.49-14.14 34.1l224 224c7.81 7.81 20.47 7.81 28.28 0l224-224C506.7 245.5 497.7 224 480 224z"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
