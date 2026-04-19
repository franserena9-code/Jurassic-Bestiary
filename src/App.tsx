import { Home } from "./views/Home";
import { DetailView } from "./schemas/DetailView"; // Nota: Sería ideal mover esto a src/views/DetailView.tsx
import { MapView } from "./views/MapView";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/dinosaurio/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
