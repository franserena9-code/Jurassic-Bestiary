import { useState, useEffect } from "react";
import type { Dino } from "../../types/Dino";
import { DinoResponseSchema } from "../../schemas/dino";

export const useDino = (id: string | undefined) => {
  const [dino, setDino] = useState<Dino | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDino = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch("/src/data/dino.json");
        if (!response.ok) throw new Error("No se pudo cargar el JSON");

        const rawData = await response.json();
        const result = DinoResponseSchema.parse(rawData);

        const foundDino = result.data.find((d) => d.id === id);
        setDino((foundDino as Dino) || null);
      } catch (error) {
        console.error("Error cargando el dinosaurio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDino();
  }, [id]);

  return { dino, loading };
};