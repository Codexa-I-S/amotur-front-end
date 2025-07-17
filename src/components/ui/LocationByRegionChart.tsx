import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

//  região
interface RegionData {
  name: string;
  count: number;       
  percentage: number;
}

// Componente funcional 
const LocationByRegionChart: React.FC = () => {
  // dados da requisiçao
  const data: RegionData[] = [
    { name: 'Icaraí', count: 45, percentage: 36 },
    { name: 'Caetanos', count: 30, percentage: 24 },
    { name: 'Moitas', count: 28, percentage: 22 },
    { name: 'Frecheiras', count: 22, percentage: 18 },
  ];

  // Ordena os dados do maior para o menor com base na quantidade
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  // Pega a primeira região (com mais locais)
  const topRegion = sortedData[0];

  // Configurações do gráfico (usando ApexOptions)
  const chartOptions: ApexOptions = {
    labels: sortedData.map(item => item.name), // Nome das regiões
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    dataLabels: {
      enabled: false, // Desativa os rótulos nos pedaços do gráfico
    },
    legend: {
      show: false, // Desativa a legenda automática
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%', // Tamanho do buraco no meio
          labels: {
            show: true, // Mostra texto dentro do donut
            total: {
              show: true, // Mostra o total de locais
              label: 'Total', 
              formatter: () =>
                `${sortedData.reduce((sum, item) => sum + item.count, 0)} locais`, // Soma os locais
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768, // Em telas menores que 768px
        options: {
          chart: { width: 300 }, // Diminui a largura do gráfico
        },
      },
    ],
  };

  // Define os dados da série do gráfico (somente os números)
  const chartSeries = sortedData.map(item => item.count);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Locais cadastrados por região
      </h2>

      {/* Destaque para a região com mais locais */}
      <div className="mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-medium text-blue-800">Região com mais locais cadastrados</h3>
          <p className="text-blue-600">
            {topRegion.name} – {topRegion.count} locais cadastrados ({topRegion.percentage}%)
          </p>
        </div>
      </div>

      {/* Container com o gráfico e a legenda lateral */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Coluna do gráfico */}
        <div className="w-full md:w-2/3">
          <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
        </div>

        {/* Coluna da legenda personalizada */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:pl-6">
          {sortedData.map((item, index) => (
            <div key={item.name} className="flex items-center mb-3">
              {/* Bolinha colorida */}
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: chartOptions.colors?.[index] }}
              ></div>
              {/* Texto com o nome da região e valores */}
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
