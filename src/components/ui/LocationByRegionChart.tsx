"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface RegionData {
  location: string;
  quantidade: number;
}

interface ApiResponse {
  lugaresPorRegiao: RegionData[];
  totalDeLugares: number;
}

const LocationByRegionChart: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<RegionData[]>([]);
  const [totalLocais, setTotalLocais] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '%2F');
        
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${today}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setData(response.data.lugaresPorRegiao);
        setTotalLocais(response.data.totalDeLugares);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Erro ao carregar dados');
          if (err.response?.status === 401) {
            router.push('/login');
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;
  if (!data.length) return <div>Nenhum dado disponível</div>;

  // Função para formatar porcentagem com 2 casas decimais
  const calculatePercentage = (quantidade: number, total: number) => {
    const percentage = (quantidade / total) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  // Processa os dados com porcentagens calculadas
  const processedData = data.map(item => ({
    ...item,
    percentage: calculatePercentage(item.quantidade, totalLocais)
  }));

  // Ajusta para garantir que a soma seja exatamente 100%
  const sumPercentage = processedData.reduce((sum, item) => sum + item.percentage, 0);
  if (sumPercentage !== 100) {
    const diff = 100 - sumPercentage;
    const maxIndex = processedData.reduce((iMax, item, i, arr) => 
      item.percentage > arr[iMax].percentage ? i : iMax, 0);
    processedData[maxIndex].percentage = parseFloat((processedData[maxIndex].percentage + diff).toFixed(2));
  }

  const sortedData = [...processedData].sort((a, b) => b.quantidade - a.quantidade);
  const topRegion = sortedData[0];

  const chartOptions: ApexOptions = {
    labels: sortedData.map(item => item.location),
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => `${totalLocais} locais`,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { width: 300 },
        },
      },
    ],
  };

  const chartSeries = sortedData.map(item => item.quantidade);

  // Função para formatar a exibição da porcentagem
  const formatPercentageDisplay = (percentage: number) => {
    // Mostra sem decimais se for inteiro, caso contrário mostra com 2 casas
    return percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Locais cadastrados por região
      </h2>

      <div className="mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-medium text-blue-800">Região com mais locais cadastrados</h3>
          <p className="text-blue-600">
            {topRegion.location} – {topRegion.quantidade} locais cadastrados ({formatPercentageDisplay(topRegion.percentage)}%)
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-2/3">
          <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
        </div>

        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:pl-6">
          {sortedData.map((item, index) => (
            <div key={item.location} className="flex items-center mb-3">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: chartOptions.colors?.[index] as string }}
              ></div>
              <span className="text-sm text-gray-700">
                {item.location} – {item.quantidade} locais ({formatPercentageDisplay(item.percentage)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationByRegionChart;