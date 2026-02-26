import { useDinos } from "../hooks/useDinos";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { DinoList } from "./components/dino-list/DinoList";
import { Pagination } from "./components/pagination/Pagination";

export const MainView = () => {
  const {
    currentDinos,
    loading,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    setCurrentPage,
  } = useDinos();

  if (loading) return <div>Escabando fósiles</div>;

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content">
        <header className="content-header">
          <h2>TODOS LOS DINOSAURIOS</h2>
        </header>

        <DinoList dinos={currentDinos} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNext}
          onPrev={goToPrev}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};
