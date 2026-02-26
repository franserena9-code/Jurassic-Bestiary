import { useState, useEffect } from "react";
import type { Dino, DinoResponse } from "../../types/Dino";

export const useDinos = () => {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const DINOS_PER_PAGE = 10;

  useEffect(() => {
    const fetchDinos = async () => {
      try {
        const response = await fetch("src/data/dino.json");
        if (!response.ok) throw new Error("No se pudo cargar el JSON");

        const result: DinoResponse = await response.json();
        setDinosaurs(result.data);
      } catch (error) {
        console.error("Error cargando fósiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDinos();
  }, []);

  const totalPages = Math.ceil(dinosaurs.length / DINOS_PER_PAGE);
  const lastIndex = currentPage * DINOS_PER_PAGE;
  const firstIndex = lastIndex - DINOS_PER_PAGE;
  const currentDinos = dinosaurs.slice(firstIndex, lastIndex);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return {
    currentDinos,
    loading,
    totalCount: dinosaurs.length,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    setCurrentPage,
  };
};
