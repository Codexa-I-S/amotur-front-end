"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Importa o Chart só no client (SSR desativado)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Tipo dos dados da região
interface RegionData {
  name: string;
  count: number;
  percentage: number;
}

const LocationByRegionChart: React.FC = () => {
  // dados da requisição
  const data: RegionData[] = [
    { name: 'Icaraí', count: 45, percentage: 36 },
    { name: 'Caetanos', count: 30, percentage: 24 },
    { name: 'Moitas', count: 28, percentage: 22 },
    { name: 'Frecheiras', count: 22, percentage: 18 },
  ];

  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const topRegion = sortedData[0];

  const chartOptions: ApexOptions = {
    labels: sortedData.map(item => item.name),
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
              formatter: () =>
                `${sortedData.reduce((sum, item) => sum + item.count, 0)} locais`,
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

  const chartSeries = sortedData.map(item => item.count);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Locais cadastrados por região
      </h2>

      <div className="mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-medium text-blue-800">Região com mais locais cadastrados</h3>
          <p className="text-blue-600">
            {topRegion.name} – {topRegion.count} locais cadastrados ({topRegion.percentage}%)
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-2/3">
          <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
        </div>

        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:pl-6">
          {sortedData.map((item, index) => (
            <div key={item.name} className="flex items-center mb-3">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: chartOptions.colors?.[index] }}
              ></div>
              <span className="text-sm text-gray-700">
                {item.name} – {item.count} locais ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationByRegionChart;
