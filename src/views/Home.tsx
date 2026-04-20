import { Link } from "react-router-dom";
import { useDinos } from "./hooks/useDinos";
import "./Home.css";
import type {
  DietValue,
  PeriodValue,
  RegionValue,
  CategoryValue,
} from "../consts";
import { DinoCard } from "../components/DinoCard";

export const Home = () => {
  const {
    currentDinos,
    loading,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    dietFilter,
    setDietFilter,
    periodFilter,
    setPeriodFilter,
    regionFilter,
    setRegionFilter,
    categoryFilter,
    setCategoryFilter,
    onResetFilters,
    searchQuery,
    setSearchQuery,
  } = useDinos();

  if (loading) {
    return (
      <div
        className="loading-message"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        Desenterrando fósiles...
      </div>
    );
  }
  console.log(currentDinos);
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Dinopedia</h1>
        <p>Explora y descubre dinosaurios de diferentes eras y regiones.</p>
        <Link to="/mapa" className="map-link" title="Ver mapa mundial">
          <img src="/brujula.png" alt="Ir al mapa" className="compass-icon" />
        </Link>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar dinosaurio por nombre..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <aside className="filters-container">
        <select
          value={dietFilter}
          onChange={(e) => setDietFilter(e.target.value as DietValue)}
        >
          <option value="">Todas las dietas</option>
          <option value="Carnívoro">Carnívoro</option>
          <option value="Herbívoro">Herbívoro</option>
          <option value="Omnívoro">Omnívoro</option>
        </select>

        <select
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value as PeriodValue)}
        >
          <option value="">Todos los periodos</option>
          <option value="Triásico">Triásico</option>
          <option value="Jurásico">Jurásico</option>
          <option value="Cretácico">Cretácico</option>
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value as RegionValue)}
        >
          <option value="">Todas las regiones</option>
          <option value="Norteamérica">Norteamérica</option>
          <option value="Sudamérica">Sudamérica</option>
          <option value="Europa">Europa</option>
          <option value="Asia">Asia</option>
          <option value="África">África</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CategoryValue)}
        >
          <option value="">Todas las categorías</option>
          <option value="Terópodo">Terópodo</option>
          <option value="Saurópodo">Saurópodo</option>
          <option value="Ornitópodo">Ornitópodo</option>
          <option value="Ceratopsia">Ceratopsia</option>
          <option value="Ornitísquio">Ornitísquio</option>
        </select>

        <button onClick={onResetFilters} className="reset-button">
          Limpiar Filtros
        </button>
      </aside>

      <main className="dino-grid">
        {currentDinos.length > 0 ? (
          currentDinos.map((dino) => <DinoCard key={dino.id} dino={dino} />)
        ) : (
          <p className="no-results">
            No se encontraron dinosaurios con estos filtros.
          </p>
        )}
      </main>

      <footer className="pagination-controls">
        <button onClick={goToPrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          Siguiente
        </button>
      </footer>
    </div>
  );
};
