"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // Removido AxiosError não utilizado
import dayjs from "dayjs";

type TideData = {
  hora: string;    // ex: "01:59"
  altura: number;  // ex: 0.69
};

type ApiResponse = {
  data: string;     // ex: "2025-07-30"
  dados: TideData[];
};

export default function TideCard() {
  const [dataMar, setDataMar] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pega a data atual no formato YYYY-MM-DD
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
                Authorization: `Bearer ${token}`
            }
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

  if (loading) return <p>Carregando tabela da maré...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;
  if (!dataMar) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-blue-50 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Tábua das Marés - {dayjs(dataMar.data).format("DD/MM/YYYY")}
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-2 border border-blue-300">Hora</th>
            <th className="p-2 border border-blue-300">Altura (m)</th>
          </tr>
        </thead>
        <tbody>
          {dataMar.dados.map(({ hora, altura }, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}
            >
              <td className="p-2 border border-blue-300">{hora}</td>
              <td className="p-2 border border-blue-300">{altura.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}