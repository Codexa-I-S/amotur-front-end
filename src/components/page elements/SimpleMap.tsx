'use client';
import LocalButtons from './LocalButtons';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ZoomControls from './ZoomControls';
import ModalRegister from './ModalRegister';
import L from 'leaflet';
import PreCard from './PreCard';
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SidebarLocais from './SideBarLocais';

// servio para ajeitar problema dos ícones padrão do Leaflet 
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

type Props = {
  setLocationPosition: (position: [number, number]) => void
}

function ShowFormRegisterOnClick({setLocationPosition}: Props) {
  useMapEvent("click", (event) => {
    const position: [number, number] = [event.latlng.lat, event.latlng.lng]
    setLocationPosition(position)
  })
  return null
}

// string add um novo se nao existir
type PointsType = "HOTEL" | "POUSADA" | "BAR" | "RESTAURANTE" | string

const iconMap: Record<string, L.Icon> = {
  HOTEL: new L.Icon({
    iconUrl: "https://img.icons8.com/?size=100&id=3EoZXr2wBtFd&format=png&color=C850F2",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  POUSADA: new L.Icon({
    iconUrl: "https://img.icons8.com/?size=100&id=bc9PfkZ8cbJC&format=png&color=FAB005",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  BAR: new L.Icon({
    iconUrl: "https://img.icons8.com/?size=100&id=C7fB8O7JIvix&format=png&color=228BE6",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  RESTAURANTE: new L.Icon({
    iconUrl: "https://img.icons8.com/?size=100&id=lq7Ugy76e18x&format=png&color=12B886",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  })
}

// Ícone padrao para tipos não mapeados
const defaultIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

// Função para obter o ícone correto
const getIconForType = (type: string): L.Icon => {
  const normalizedType = type?.toUpperCase();
  return iconMap[normalizedType] || defaultIcon;
};

type Point = {
  id: string;
  name: string;
  type: PointsType;
  contacts: {
    email: string;
    telefone: string;
    site: string;
  };
  description: string;
  logo: string;
  images: string[];
  coordinates: {
    lat: number;
    lon: number;
  };
}

export default function SimpleMap() {
  const [newLocationPosition, setNewLocationPosition] = useState<[number, number] | null>(null);
  const [places, setPlaces] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          throw new Error("Token de autenticação não encontrado");
        }

        const response = await axios.get("https://squad-03-server-production.up.railway.app/place/all", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setPlaces(response.data);
        console.log("Places recebidos:", response.data);
      } catch (err) {
        console.error("Erro ao carregar os locais:", err);
        setError(err instanceof Error ? err.message : "Erro ao carregar locais");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const bounds: [[number, number], [number, number]] = [
    [-3.1600, -39.8000],
    [-2.9200, -39.5500],
  ];

  return (
    <div className="h-screen w-screen relative">
      <MapContainer
        style={{ zIndex: 0 }}
        center={[-3.0274694, -39.6503127]}
        zoom={15}
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
        <ShowFormRegisterOnClick setLocationPosition={setNewLocationPosition} />

        {newLocationPosition && (
          <Popup position={newLocationPosition} maxWidth={400}>
            <ModalRegister 
              lat={parseFloat(newLocationPosition[0].toFixed(10))}
              lng={parseFloat(newLocationPosition[1].toFixed(10))} />
          </Popup>
        )}
        
        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-white text-xl">Carregando locais...</div>
          </div>
        )}

        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded z-50">
            {error}
          </div>
        )}

        
          {places.map((place) => (
            <Marker 
              key={place.id}
              position={[place.coordinates.lat, place.coordinates.lon]}
              icon={getIconForType(place.type)} // Usando a função de seleção de ícone
            >
              <Popup maxWidth={500}  closeButton={false}>
                  <PreCard
                    name={place.name}
                    type={place.type}
                    instagramUrl={place.contacts.site}
                    email={place.contacts.email}
                    telefone={place.contacts.telefone}
                    description={place.description}
                    logo={place.logo}
                    images={place.images}
                  />
              </Popup>
                
            </Marker>
          ))}
        
        <ZoomControls/>
        
      </MapContainer>
    </div>
  );
}