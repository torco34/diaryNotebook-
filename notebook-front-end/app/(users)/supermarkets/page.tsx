// page.tsx
"use client";
import dynamic from "next/dynamic";

// Importar el componente LeafletMap sin SSR
const MapWithNoSSR = dynamic(
  () => import("../../components/superMarke/LeafletMap"),
  {
    ssr: false,
  }
);

export default function SupermarketsPage() {
  return (
    <div>
      <h1>Supermercados en la ciudad</h1>
      <div style={{ height: "90vh", width: "100%" }}>
        <MapWithNoSSR />
      </div>
    </div>
  );
}
