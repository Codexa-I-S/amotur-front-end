'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import {  MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Importação dinâmica do ApexCharts (para SSR do Next.js não quebrar)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

//Tipo dos dados que vai vir na resposta da api
type DadoMare = {
  hora: string
  altura: number
}

export default function CardMare() {
  const [dataAtual, setDataAtual] = useState(dayjs())
  const [dados, setDados] = useState<DadoMare[]>([])

  const diasMaximos = 6

  useEffect(() => {

    const dataFormatada = dataAtual.format('YYYY-MM-DD')
    const token = localStorage.getItem("authToken")

    if (!token) return console.error('Token não encontrado.')

    axios.get(`https://squad-03-server-production.up.railway.app/mares/${dataFormatada}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    .then(res => setDados(res.data.dados))
    .catch(err => console.error('Erro ao buscar marés:', err))

  }, [dataAtual])

  const mudarDia = (direcao: 'anterior' | 'proximo') => {
  const novaData = (direcao === 'proximo'
    ? dataAtual.add(1, 'day')
    : dataAtual.subtract(1, 'day')
  ).startOf('day')

  const hoje = dayjs().startOf('day')
  const limite = hoje.add(diasMaximos, 'day')

  if (novaData.isAfter(limite) || novaData.isBefore(hoje)) return

  setDataAtual(novaData)
}

  const options = {
    chart: {
      type: 'bar' as const,
      height: 200,
      toolbar: { show: false }
    },
    
    plotOptions: {
      bar: {
        vertical: true,
        borderRadius: 4,
        // borderRadiusApplication: 'end',
        colors: {
            ranges: [
                { from: 0, to: 1.0, color: '#4090d6' },
                { from: 1.01, to: 2.0, color: '#3a6fba' },
                { from: 2.01, to: 10.0, color: '#f54242' }
            ]
        }
      }
    },

    dataLabels: { 
      enabled: true,
    },
    
    xaxis: {
      categories: dados.map(d => d.hora),
      title: { text: 'Horários' }
    },

    yaxis: {
      show: false,
    },

    colors: undefined,

    grid: {
      show: false,
    }
  }

  const series = [{
    name: 'Altura da onda (m)',
    data: dados.map(d => d.altura)
  }]

  return (
    <div className="flex flex-col w-[300px] h-[200px] border rounded-md overflow-hidden">

      {/* Barra superior */}
      <div className="flex items-center justify-between h-1/5 px-2 bg-[#009089] text-white">

        <button onClick={() => mudarDia('anterior')} className="p-1">

          <MdKeyboardArrowLeft size={25} color="#ffffff" />

        </button>

        <div className="flex-1 text-center font-semibold text-[15px]">

          {dataAtual.format('DD/MM/YYYY')}

        </div>

        <button onClick={() => mudarDia('proximo')} className="p-1">

          <MdKeyboardArrowRight size={25} color="#ffffff" />

        </button>

      </div>

      {/* Área do gráfico */}
      <div className="flex justify-center w-full items-center h-4/5 p-2 bg-[#f5f5f5]">
       
          {dados.length > 0 ? (
            <Chart options={options} series={series} type="bar" height={160} />
          ) : (
            <span className="text-sm text-gray-400">Carregando...</span>
          )}
    
      </div>

    </div>
  )
}
