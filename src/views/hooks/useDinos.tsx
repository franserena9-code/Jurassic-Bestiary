import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Dino } from "../../types/Dino";
import type {
  DietValue,
  PeriodValue,
  RegionValue,
  CategoryValue,
} from "../../consts";

export const useDinos = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [dietFilter, setDietFilter] = useState<DietValue>("");
  const [periodFilter, setPeriodFilter] = useState<PeriodValue>("");
  const [regionFilter, setRegionFilter] = useState<RegionValue>("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryValue>("");
  const [searchQuery, setSearchQuery] = useState("");

  const DINOS_PER_PAGE = 12;

  const { data: dinosaurs = [], isLoading: loading } = useQuery({
    queryKey: ["dinosaurs"],
    queryFn: async () => {
      const response = await fetch(
        "https://dinosaurios.codefreeapi.com/api/v1/dinosaurs?limit=100",
        {
          headers: {
            "X-API-Key": "cfa_nWA8inHt9Ofn14Ezf251WzEdOJDn7dte",
          },
        },
      );
      if (!response.ok) throw new Error("No se pudo cargar el JSON de la API");

      const rawData = await response.json();
      console.log(rawData);

      return rawData.data as Dino[];
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const filteredDinos = useMemo(() => {
    return dinosaurs.filter((dino) => {
      const matchesDiet = dietFilter === "" || dino.diet === dietFilter;
      const matchesPeriod = periodFilter === "" || dino.period === periodFilter;
      const matchesRegion = regionFilter === "" || dino.region === regionFilter;
      const matchesCategory =
        categoryFilter === "" || dino.category === categoryFilter;
      const matchesSearch =
        searchQuery === "" ||
        dino.name.toLowerCase().startsWith(searchQuery.toLowerCase());

      return (
        matchesDiet &&
        matchesPeriod &&
        matchesRegion &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    dinosaurs,
    dietFilter,
    periodFilter,
    regionFilter,
    categoryFilter,
    searchQuery,
  ]);

  const totalPages = Math.ceil(filteredDinos.length / DINOS_PER_PAGE);
  const lastIndex = currentPage * DINOS_PER_PAGE;
  const firstIndex = lastIndex - DINOS_PER_PAGE;
  const currentDinos = filteredDinos.slice(firstIndex, lastIndex);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onResetFilters = () => {
    setDietFilter("");
    setPeriodFilter("");
    setRegionFilter("");
    setCategoryFilter("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    currentDinos,
    dinosaurs,
    loading,
    totalCount: filteredDinos.length,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    setCurrentPage,
    dietFilter,
    searchQuery,
    setSearchQuery: (val: string) => {
      setSearchQuery(val);
      setCurrentPage(1);
    },
    setDietFilter: (val: DietValue) => {
      setDietFilter(val);
      setCurrentPage(1);
    },
    periodFilter,
    setPeriodFilter: (val: PeriodValue) => {
      setPeriodFilter(val);
      setCurrentPage(1);
    },
    regionFilter,
    setRegionFilter: (val: RegionValue) => {
      setRegionFilter(val);
      setCurrentPage(1);
    },
    categoryFilter,
    setCategoryFilter: (val: CategoryValue) => {
      setCategoryFilter(val);
      setCurrentPage(1);
    },
    onResetFilters,
  };
};
