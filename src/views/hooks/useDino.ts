import { useQuery } from "@tanstack/react-query";
import type { Dino } from "../../types/Dino";
import { DinoResponseSchema } from "../../schemas/dino";

export const useDino = (id: string | undefined) => {
  const { data: dino = null, isLoading: loading } = useQuery({
    queryKey: ["dino", id],
    queryFn: async () => {
      if (!id) return null;

      // Nota: Si la API lo permite, en el futuro podríamos optimizar esto para que haga fetch solo de /dinosaurs/${id}
      const response = await fetch("https://dinosaurios.codefreeapi.com/api/v1/dinosaurs?limit=100", {
        headers: {
          "X-API-Key": "cfa_nWA8inHt9Ofn14Ezf251WzEdOJDn7dte"
        }
      });
      if (!response.ok) throw new Error("No se pudo cargar el JSON");

      const rawData = await response.json();
      const result = DinoResponseSchema.parse(rawData);

      const foundDino = result.data.find((d) => d.id === id);
      return (foundDino as Dino) || null;
    },
    enabled: !!id, // Evita ejecutar la query si el id no existe (ej. al inicio del render)
    staleTime: 1000 * 60 * 60 * 24, // Los datos se consideran "frescos" por 24 horas
    gcTime: 1000 * 60 * 60 * 24, // La caché se guarda durante 24 horas (antiguo cacheTime)
  });

  return { dino, loading };
};