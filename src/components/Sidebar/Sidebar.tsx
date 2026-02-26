import "./Sidebar.styles.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="filter-group">
        <h3>Periodos</h3>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Dieta</h3>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Región</h3>
      </div>

      <div className="divider"></div>

      <div className="filter-group">
        <h3>Categoría</h3>
      </div>
    </aside>
  );
};
