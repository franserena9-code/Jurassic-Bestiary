import type { Dino } from "../../../../types/Dino";
import "./DinoCard.styles.css";

interface Props {
  dino: Dino;
}

export const DinoCard: React.FC<Props> = ({ dino }) => {
  return (
    <div className="dino-card">
      <h2>{dino.name}</h2>
      <img src={dino.image} />
      <p>
        <strong>Periodo:</strong> {dino.period}
      </p>
      <p>
        <strong>Región:</strong> {dino.region}
      </p>
    </div>
  );
};
