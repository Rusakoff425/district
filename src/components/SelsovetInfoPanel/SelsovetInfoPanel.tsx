import type { Selsovet } from "../../types/selsovet";
import "./SelsovetInfoPanel.css";

type SelsovetInfoPanelProps = {
  selsovet: Selsovet | null;
};

export function SelsovetInfoPanel({ selsovet }: SelsovetInfoPanelProps) {
  if (!selsovet) {
    return (
      <aside className="selsovet-info-panel selsovet-info-panel--empty">
        <p>Выберите сельсовет на карте, чтобы увидеть достопримечательности.</p>
      </aside>
    );
  }

  return (
    <aside className="selsovet-info-panel">
      <h2>{selsovet.name}</h2>
      <p>{selsovet.description}</p>

      <h3>Достопримечательности</h3>
      <ul className="selsovet-info-panel__sights">
        {selsovet.sights.map((sight) => (
          <li key={sight.id} className="selsovet-info-panel__sight">
            <h4>{sight.title}</h4>
            <p>{sight.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
