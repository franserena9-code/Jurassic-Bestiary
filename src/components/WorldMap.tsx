import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { RegionValue } from "../consts";
import "./WorldMap.css";

interface WorldMapProps {
  onRegionSelect: (region: RegionValue) => void;
  selectedRegion: RegionValue | "";
}

// URL del TopoJSON de alta definición con continentes
const geoUrl = "/world-continents.json";

// Diccionario para mapear los nombres en inglés del mapa HD a tus filtros en español
const continentTranslations: Record<
  string,
  RegionValue | "Oceanía" | "Antártida"
> = {
  "North America": "Norteamérica",
  "South America": "Sudamérica",
  Europe: "Europa",
  Africa: "África",
  Asia: "Asia",
  Oceania: "Oceanía",
  Antarctica: "Antártida",
};

export const WorldMap = ({ onRegionSelect, selectedRegion }: WorldMapProps) => {
  return (
    <>
      <style>{`
        .world-map-svg-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.2));
        }
        .geography-path {
          outline: none;
        }
      `}</style>
      <div className="world-map-svg-container">
        <ComposableMap width={1000} height={525}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const englishName = geo.properties.continent;
                const mappedRegion = continentTranslations[englishName];

                // Verificamos si es uno de los continentes que existen en tu dino.json
                const isSelectable =
                  mappedRegion &&
                  mappedRegion !== "Oceanía" &&
                  mappedRegion !== "Antártida";
                const isSelected = selectedRegion === mappedRegion;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="geography-path"
                    onClick={() => {
                      if (isSelectable) {
                        onRegionSelect(mappedRegion as RegionValue);
                      }
                    }}
                    style={{
                      default: {
                        fill: isSelected
                          ? "var(--accent-color, #f39c12)"
                          : isSelectable
                            ? "var(--map-fill, #4a5568)"
                            : "#3c4656",
                        stroke: "var(--bg-color, #1a1a1a)",
                        strokeWidth: 0.5,
                        transition: "all 0.3s ease",
                      },
                      hover: {
                        fill: isSelectable
                          ? "var(--accent-color, #f39c12)"
                          : "#3c4656",
                        opacity: isSelectable ? 0.85 : 1,
                        stroke: "var(--bg-color, #1a1a1a)",
                        strokeWidth: 0.5,
                        cursor: isSelectable ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isSelectable
                          ? "var(--accent-color, #f39c12)"
                          : "#3c4656",
                        stroke: "var(--bg-color, #1a1a1a)",
                        strokeWidth: 0.5,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
};
