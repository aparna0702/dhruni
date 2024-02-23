"use client";
import React, { useContext } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MapContext from "@/hooks/useMapContext";

const MapBox = () => {
  const { lat, lng } = useContext(MapContext);
  const customIcon = new Icon({
    iconSize: [38, 38],
    iconUrl: "/assets/images/marker.png",
  });
  return (
    <MapContainer
      center={[lng, lat]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>Open Map</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon}></Marker>
    </MapContainer>
  );
};

export default MapBox;
