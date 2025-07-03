'use client';

import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ZoomControls() {
  const map = useMap();

  return (
    <div className="fixed top-180 right-4 z-[9999] flex rounded-full bg-zinc-100">
      <button onClick={() => map.zoomIn()} className="text-black w-12 h-12">
        +
      </button>
      <button onClick={() => map.zoomOut()} className="text-black w-12 h-12">
        −
      </button>
    </div>
  );
}

export default function SimpleMap() {
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
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControls />
      </MapContainer>
    </div>
  );
}
