import { useParams, useNavigate } from "react-router-dom";
import { useDino } from "../views/hooks/useDino";
import "./DetailView.css";

export const DetailView = () => {
  // Extraemos el "id" de la URL (ej: /dinosaurio/720968c2-...)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Usamos el nuevo hook para obtener los datos
  const { dino, loading } = useDino(id);

  if (loading) return <div className="detail-message">Cargando fósil...</div>;
  if (!dino)
    return <div className="detail-message">Dinosaurio no encontrado.</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Volver al inicio
      </button>
      <div className="detail-card">
        <h1>{dino.name}</h1>
        <img
          src={dino.image.replace(/^public\//, "/")}
          alt={`Imagen de ${dino.name}`}
          className="detail-image"
        />
        <div className="detail-info">
          <p>
            <strong>Dieta:</strong> {dino.diet}
          </p>
          <p>
            <strong>Tamaño:</strong> {dino.size}
          </p>
          <p>
            <strong>Periodo:</strong> {dino.period}
          </p>
          <p>
            <strong>Región:</strong> {dino.region}
          </p>
          <p>
            <strong>Categoría:</strong> {dino.category}
          </p>
          <p>
            <strong>Descripción:</strong> {dino.description}
          </p>
        </div>
      </div>
    </div>
  );
};
