'use client';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { bounds, type LatLngTuple } from 'leaflet'; //  Importa o tipo correto
import 'leaflet/dist/leaflet.css';

export default function SimpleMap() {
  const bounds: [[number, number],[number, number]] = [
    [-3.1600, -39.8000],
    [-2.9200, -39.5500],
] // Define o tipo corretamente

  return (
    <MapContainer
      center={[-3.0274694, -39.6503127]}
      zoom={14}
      scrollWheelZoom={true}
      className="h-screen w-screen"
      maxZoom={18}
      minZoom={13.5}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

