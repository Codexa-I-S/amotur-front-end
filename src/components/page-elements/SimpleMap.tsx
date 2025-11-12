'use client';

import LocalButtons from './LocalButtons';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ZoomControls from './ZoomControls';
import ModalRegister from './ModalRegister';
import L from 'leaflet';
import PreCard from './PreCard';
import axios from 'axios';
import FlyToLocation from './FlyToLocation';
import TideCard from './TideTable';
import { getUserRole } from './GetUserRole';


// Correção type-safe para o problema dos ícones
interface IconDefaultProto {
  _getIconUrl?: string;
}
delete (L.Icon.Default.prototype as IconDefaultProto)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

type SimpleMapProps = {
  focusCoords: [number, number] | null;
  // Mantido mas marcado como intencionalmente não usado
  setFocusCoords?: (coords: [number, number] | null) => void;
}

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

type PointsType = "HOTEL" | "POUSADA" | "BAR" | "RESTAURANTE" | "TURISTICO" | "PETISCARIA" | string

const iconMap: Record<string, L.Icon> = {
  HOTEL: new L.Icon({
    iconUrl: "/location.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  POUSADA: new L.Icon({
    iconUrl: "/pin-map.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  BAR: new L.Icon({
    iconUrl: "/pub.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  RESTAURANTE: new L.Icon({
    iconUrl: "/restaurant.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  TURISTICO: new L.Icon({
    iconUrl: "/destination.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  }),
  PETISCARIA: new L.Icon({
    iconUrl: "/food.svg",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  })
}

const defaultIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

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
  logo: { url: string };
  images: { url: string }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function SimpleMap({ focusCoords, setFocusCoords }: SimpleMapProps) {
  // Marca como intencionalmente não usado se não for utilizado
  const _setFocusCoords = setFocusCoords; // eslint-disable-line @typescript-eslint/no-unused-vars
  
  const [newLocationPosition, setNewLocationPosition] = useState<[number, number] | null>(null);
  const [places, setPlaces] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = getUserRole()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/place/all`);

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
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocalButtons />
        <ShowFormRegisterOnClick setLocationPosition={setNewLocationPosition} />

        {focusCoords && <FlyToLocation coords={focusCoords} />}

        {role === "ADMIN" && newLocationPosition && (
          <Popup position={newLocationPosition} maxWidth={400}>
            <ModalRegister 
              lat={parseFloat(newLocationPosition[0].toFixed(10))}
              lng={parseFloat(newLocationPosition[1].toFixed(10))}
            />
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
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={getIconForType(place.type)}
          >
            <Popup maxWidth={500} closeButton={false}>
              <PreCard
                name={place.name}
                type={place.type}
                instagramUrl={place.contacts.site}
                email={place.contacts.email}
                telefone={place.contacts.telefone}
                description={place.description}
                logo={place.logo?.url}
                images={place.images?.map((img) => img.url)}
              />
            </Popup>
          </Marker>
        ))}
        
        <ZoomControls/>
        
        
        <Marker 
          position={[-3.0206125094, -39.6507740021]} 
          icon={L.icon({
            iconUrl: "/waves.svg",
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
          })}
          >
          <Popup maxWidth={400}>
            <div className="w-[350px] max-h-[400px] overflow-auto mx-[-12]">
              <TideCard />
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );  
}