import "./Pagination.styles.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}: Props) => {
  return (
    <footer className="pagination-container">
      <div className="pagination-controls">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="nav-btn"
        >
          &larr;
        </button>

        <span className="page-numbers">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="nav-btn"
        >
          &rarr;
        </button>
      </div>
    </footer>
  );
};
