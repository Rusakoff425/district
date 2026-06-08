import { useState } from "react";
import { DistrictMap } from "./components/DistrictMap/DistrictMap";
import { SelsovetInfoPanel } from "./components/SelsovetInfoPanel/SelsovetInfoPanel";
import { selsovets } from "./data/selsovets";

export function App() {
  const [selectedSelsovetId, setSelectedSelsovetId] = useState<string | null>(
    null,
  );

  const selectedSelsovet =
    selsovets.find((selsovet) => selsovet.id === selectedSelsovetId) ?? null;

  return (
    <main className="app">
      <header className="app__header">
        <h1>Куюргазинский район</h1>
        <p>
        </p>
      </header>

      <section className="app__content" aria-label="Карта и описание">
        <div className="app__map-shell">
          <DistrictMap
            selectedId={selectedSelsovetId}
            onSelect={setSelectedSelsovetId}
          />
        </div>
        <SelsovetInfoPanel selsovet={selectedSelsovet} />
      </section>
    </main>
  );
}
