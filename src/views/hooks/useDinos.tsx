import { useState, useEffect, useMemo } from "react";
import type { Dino, DinoResponse } from "../../types/Dino";
import type {
  DietValue,
  PeriodValue,
  RegionValue,
  CategoryValue,
} from "../../consts";

export const useDinos = () => {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [dietFilter, setDietFilter] = useState<DietValue>("");
  const [periodFilter, setPeriodFilter] = useState<PeriodValue>("");
  const [regionFilter, setRegionFilter] = useState<RegionValue>("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryValue>("");

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

  const filteredDinos = useMemo(() => {
    return dinosaurs.filter((dino) => {
      const matchesDiet = dietFilter === "" || dino.diet === dietFilter;
      const matchesPeriod = periodFilter === "" || dino.period === periodFilter;
      const matchesRegion = regionFilter === "" || dino.region === regionFilter;
      const matchesCategory =
        categoryFilter === "" || dino.category === categoryFilter;

      return matchesDiet && matchesPeriod && matchesRegion && matchesCategory;
    });
  }, [dinosaurs, dietFilter, periodFilter, regionFilter, categoryFilter]);

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
    setCurrentPage(1);
  };

  return {
    currentDinos,
    loading,
    totalCount: filteredDinos.length,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    setCurrentPage,
    dietFilter,
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
