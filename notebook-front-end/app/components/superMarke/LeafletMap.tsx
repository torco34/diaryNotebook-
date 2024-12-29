// components/LeafletMap.tsx
import { useEffect, useRef } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const supermarkets = [
  {
    name: "Supermercado 1",
    position: [19.432608, -99.133209] as [number, number],
  },
  {
    name: "Supermercado 2",
    position: [19.433608, -99.134209] as [number, number],
  },
];

const LeafletMap = () => {
  const mapRef = useRef<L.Map | null>(null); // Ref para almacenar la instancia del mapa

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verificar que Leaflet está disponible
      if (mapRef.current) return; // Si el mapa ya está inicializado, no hacer nada

      // Inicializar el mapa solo si no se ha hecho previamente
      const map = L.map("map").setView([19.432608, -99.133209], 13);
      mapRef.current = map; // Guardar la instancia del mapa en la ref

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      supermarkets.forEach((supermarket) => {
        L.marker(supermarket.position).addTo(map).bindPopup(supermarket.name);
      });

      map.invalidateSize(); // Ajustar el tamaño del mapa si es necesario
    }

    // Cleanup: destruir el mapa si el componente se desmonta
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Eliminar el mapa
        mapRef.current = null; // Limpiar la ref
      }
    };
  }, []); // El efecto se ejecuta solo una vez

  return (
    <div id="map" style={{ width: "100%", height: "500px" }}>
      {/* Aquí se renderiza el mapa */}
    </div>
  );
};

export default LeafletMap;
