import { useNavigate } from "react-router-dom";
import type { Dino } from "../types/Dino";
import "./DinoCard.css";

interface DinoCardProps {
  dino: Dino;
}

export const DinoCard = ({ dino }: DinoCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="dino-card"
      onClick={() => navigate(`/dinosaurio/${dino.id}`)}
    >
      <img
        src={
          dino.image
            ? dino.image.replace(/^public\//, "/")
            : "/Dinos Image/noImage.png"
        }
        alt={dino.name}
        onError={(e) => {
          if (!e.currentTarget.src.includes("noImage.png")) {
            e.currentTarget.src = "/Dinos Image/noImage.png";
          }
        }}
      />

      <h3>{dino.name}</h3>
      <p>
        {dino.diet} • {dino.period}
      </p>
    </div>
  );
};
