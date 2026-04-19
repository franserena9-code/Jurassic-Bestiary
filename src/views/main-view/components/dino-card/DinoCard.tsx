import type { Dino } from "../../../../types/Dino";
import "./DinoCard.styles.css";
import { useNavigate } from "react-router-dom";

interface Props {
  dino: Dino;
}

export const DinoCard: React.FC<Props> = ({ dino }) => {
  const navigate = useNavigate();

  return (
    <div
      className="dino-card"
      onClick={() => navigate(`/dinosaurio/${dino.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2>{dino.name}</h2>
      <img
        src={dino.image.replace(/^public\//, "/")}
        alt={`Representación de un ${dino.name}`}
        loading="lazy"
      />
      <p>
        <strong>Periodo:</strong> {dino.period}
      </p>
      <p>
        <strong>Región:</strong> {dino.region}
      </p>
    </div>
  );
};
