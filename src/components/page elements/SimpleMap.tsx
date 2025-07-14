'use client';
import LocalButtons from './LocalButtons';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ZoomControls from './ZoomControls';
import ModalRegister from './ModalRegister';
import L from 'leaflet'
import PreCard from './PreCard';

//Um tipo que receber uma função
type Props = {
  //Recebe uma tupla com a posição 
  setLocationPosition: (position: [number, number]) => void
}

//Função para receber um evento de click no mapa
function ShowFormRegisterOnClick({setLocationPosition} : Props) {

  useMapEvent("click", (event) => {
    
    //Pega a lat e lng vindas do evento e alimenta a função que recebe a posição
    const position: [number, number] = [event.latlng.lat, event.latlng.lng]
      setLocationPosition(position)

  })

  return null

}

//Tipos de locais
type PointsType = "hotel" | "pousada" | "bar" | "restaurante"

//Icons de acordo com o tipo do local
const iconMap: Record<PointsType, L.Icon> = {

  hotel: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6917/6917642.png",
    iconSize: [35, 35],
  }),

  pousada: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/566/566486.png",
    iconSize: [35, 35],
  }),

  bar: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8031/8031633.png",
    iconSize: [35, 35],
  }),

  restaurante: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7845/7845646.png",
    iconSize: [35, 35],
  })

}

//Tipo do ponto com as informações vindas da requisição
type Point = {
  id: number;
  name: string;
  type: string;
  instagramUrl: string;
  email: string;
  telefone: string;
  description: string;
  logo: string;
  images: string[];
  coordinates: {lat: number, lon: number}
}

//Vai receber todas os locais cadastrados
const points: Point[] = [
  {
    id:1,
    name: 'Padaria do João',
    type: 'restaurante',
    instagramUrl: 'https://instagram.com/padariadojoao',
    description: 'A Padaria do João oferece pães artesanais, bolos caseiros e um ambiente acolhedor. Localizada no coração da cidade, é o lugar ideal para um café da manhã delicioso.',
    email: 'padariadojoao@gmail.com',
    telefone: '(88) 9 9634-7632',
    logo: "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
    images: [
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
    ],
    coordinates: {lat:-3.02807786, lon: -39.6529626846}
  },

  {
    id:2,
    name: 'Bar da lora',
    type: 'hotel',
    instagramUrl: 'https://instagram.com/padariadojoao',
    description: 'A Padaria do João oferece pães artesanais, bolos caseiros e um ambiente acolhedor. Localizada no coração da cidade, é o lugar ideal para um café da manhã delicioso.',
    email: 'padariadojoao@gmail.com',
    telefone: '(88) 9 9634-7632',
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvh7-q3ldMYqeJYaP-X_VfdWfPsQn2ForHA&s",
    images: [
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
      "https://www.cozinhaaz.com/wp-content/uploads/2023/10/bolo-caseiro.jpg",
    ],
    coordinates: {lat: -3.0316369452, lon: -39.649143219}
  }
]

export default function SimpleMap() {

  const [newLocationPosition, setNewLocationPosition] = useState<[number, number] | null> (null)


  const bounds: [[number, number], [number, number]] = [
    [-3.1600, -39.8000],
    [-2.9200, -39.5500],
  ];

  return (
    <div className="h-screen w-screen relative">
      <MapContainer
        style={{ zIndex: 0 }}
        center={[-3.0274694, -39.6503127]}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        maxZoom={18}
        minZoom={13.5}
       
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocalButtons />

        {/* Chamada da função que espera um evento de click e atualiza a posição para o newLocationPosition */}
        <ShowFormRegisterOnClick setLocationPosition={setNewLocationPosition} />

        {newLocationPosition && (

          <Popup position={newLocationPosition} maxWidth={400}>
            <ModalRegister 
              lat={parseFloat(newLocationPosition[0].toFixed(10))}
              lng={parseFloat(newLocationPosition[1].toFixed(10))} />
          </Popup>


        )}
        
        {points.map((point => (
          <Marker 
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lon]}
            icon={iconMap[point.type as PointsType]}
          >

            <Popup maxWidth={500} >
                <PreCard
                  name={point.name}
                  type={point.type}
                  instagramUrl={point.instagramUrl}
                  email={point.email}
                  telefone={point.telefone}
                  description={point.description}
                  logo={point.logo}
                  images={point.images}
                />
            </Popup>

          </Marker>
        )))}
        
        

      <ZoomControls/>
      </MapContainer>
    </div>
  );
}
