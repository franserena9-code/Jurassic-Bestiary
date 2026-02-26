import type { Dino } from "../../../../types/Dino";
import { DinoCard } from "../dino-card/DinoCard";
import "./DinoList.styles.css";

export const DinoList = ({ dinos }: { dinos: Dino[] }) => (
  <div className="dino-list">
    {dinos.map((dino) => (
      <DinoCard key={dino.id} dino={dino} />
    ))}
  </div>
);
