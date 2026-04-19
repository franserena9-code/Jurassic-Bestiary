import { useQuery } from "@tanstack/react-query";
import type { Dino } from "../../types/Dino";
import { DinoSchema } from "../../schemas/dino";

export const useDino = (id: string | undefined) => {
  const { data: dino = null, isLoading: loading } = useQuery({
    queryKey: ["dino", id],
    queryFn: async () => {
      if (!id) return null;

      const response = await fetch(`https://dinosaurios.codefreeapi.com/api/v1/dinosaurs/${id}`, {
        headers: {
          "X-API-Key": "cfa_nWA8inHt9Ofn14Ezf251WzEdOJDn7dte"
        }
      });
      
      if (response.status === 404) return null; // Si no existe, devolvemos null tranquilamente
      if (!response.ok) throw new Error("No se pudo cargar el dinosaurio desde la API");

      const rawData = await response.json();
      
      // La API suele devolver la info dentro de una propiedad "data" o el objeto directamente
      const dinoData = rawData.data ? rawData.data : rawData;
      return DinoSchema.parse(dinoData) as Dino;
    },
    enabled: !!id, // Evita ejecutar la query si el id no existe (ej. al inicio del render)
    staleTime: 1000 * 60 * 60 * 24, // Los datos se consideran "frescos" por 24 horas
    gcTime: 1000 * 60 * 60 * 24, // La caché se guarda durante 24 horas (antiguo cacheTime)
  });

  return { dino, loading };
};