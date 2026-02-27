import "./Sidebar.styles.css";
import {
  DIET_FILTERS,
  PERIOD_FILTERS,
  REGION_FILTERS,
  CATEGORY_FILTERS,
} from "../../consts";
import type {
  DietValue,
  PeriodValue,
  RegionValue,
  CategoryValue,
} from "../../consts";

interface Props {
  dietSelected: DietValue;
  onDietChange: (val: DietValue) => void;
  periodSelected: PeriodValue;
  onPeriodChange: (val: PeriodValue) => void;
  regionSelected: RegionValue;
  onRegionChange: (val: RegionValue) => void;
  categorySelected: CategoryValue;
  onCategoryChange: (val: CategoryValue) => void;
  onResetFilters: () => void;
}

export const Sidebar = ({
  dietSelected,
  onDietChange,
  periodSelected,
  onPeriodChange,
  regionSelected,
  onRegionChange,
  categorySelected,
  onCategoryChange,
  onResetFilters,
}: Props) => {
  return (
    <aside className="sidebar">
      <div className="filter-group">
        <h3>Periodos</h3>
        <ul className="filters-list">
          {Object.entries(PERIOD_FILTERS).map(([key, { literal, value }]) => (
            <li key={key}>
              <button
                className={periodSelected === value ? "active" : ""}
                onClick={() => onPeriodChange(value as PeriodValue)}
              >
                {literal}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Dieta</h3>
        <ul className="filters-list">
          {Object.entries(DIET_FILTERS).map(([key, { literal, value }]) => (
            <li key={key}>
              <button
                className={dietSelected === value ? "active" : ""}
                onClick={() => onDietChange(value as DietValue)}
              >
                {literal}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Región</h3>
        <ul className="filters-list">
          {Object.entries(REGION_FILTERS).map(([key, { literal, value }]) => (
            <li key={key}>
              <button
                className={regionSelected === value ? "active" : ""}
                onClick={() => onRegionChange(value as RegionValue)}
              >
                {literal}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Categoría</h3>
        <ul className="filters-list">
          {Object.entries(CATEGORY_FILTERS).map(([key, { literal, value }]) => (
            <li key={key}>
              <button
                className={categorySelected === value ? "active" : ""}
                onClick={() => onCategoryChange(value as CategoryValue)}
              >
                {literal}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="reset-btn" onClick={onResetFilters}>
        Limpiar Filtros
      </button>
    </aside>
  );
};
