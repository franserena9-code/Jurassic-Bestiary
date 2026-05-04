import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDinos } from "./hooks/useDinos";
import { WorldMap } from "../components/WorldMap";
import { DinoCard } from "../components/DinoCard";
import type { RegionValue } from "../consts";
import "./MapView.css";

export const MapView = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionValue | "">("");
  const { dinosaurs, loading } = useDinos();

  const handleRegionSelect = (region: RegionValue) => {
    setSelectedRegion(region);
  };

  const dinosForRegion = useMemo(() => {
    if (!selectedRegion) return [];
    return dinosaurs.filter((dino) => dino.region === selectedRegion);
  }, [dinosaurs, selectedRegion]);

  if (loading) {
    return (
      <div
        className="loading-message"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          fontSize: "1.5rem",
          color: "#ffffff",
        }}
      >
        Excavando fósil...
      </div>
    );
  }

  return (
    <div className="map-view-container">
      <header className="map-view-header">
        <Link to="/" className="back-button">
          ← Volver al catálogo
        </Link>
        <h1>Mapa de Descubrimientos</h1>
        <p>
          Selecciona una región en el mapa para ver los dinosaurios encontrados
          allí.
        </p>
      </header>

      <div className="map-content-layout">
        <div className="map-container">
          <WorldMap
            onRegionSelect={handleRegionSelect}
            selectedRegion={selectedRegion}
          />
        </div>
        <section className="results-container">
          {selectedRegion ? (
            <>
              <h2>Dinosaurios en {selectedRegion}</h2>
              <div className="dino-grid-map">
                {dinosForRegion.length > 0 ? (
                  dinosForRegion.map((dino) => (
                    <DinoCard key={dino.id} dino={dino} />
                  ))
                ) : (
                  <p>No se encontraron dinosaurios para esta región.</p>
                )}
              </div>
            </>
          ) : (
            <div className="initial-message">
              <h3>Haz clic en un continente para empezar a explorar.</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
