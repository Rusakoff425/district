import type { Settlement } from "../../data/settlements";
import "./SettlementInfoPanel.css";

type SettlementInfoPanelProps = {
  settlement: Settlement | null;
};

export function SettlementInfoPanel({ settlement }: SettlementInfoPanelProps) {
  if (!settlement) {
    return (
      <aside className="settlement-info-panel settlement-info-panel--empty">
        <div className="settlement-info-panel__heading">
          <h2>Населенные пункты</h2>
        </div>
        <p>
          Выберите крупный зеленый маркер на карте, чтобы открыть информацию
          о населенном пункте.
        </p>
      </aside>
    );
  }

  return (
    <aside className="settlement-info-panel">
      <div className="settlement-info-panel__heading">
        <h2>{settlement.title}</h2>
        <small>{settlement.location}</small>
      </div>

      <p className="settlement-info-panel__description">
        {settlement.description}
      </p>

      <div className="settlement-info-panel__meta">
        {settlement.population ? (
          <div>
            <span>Население</span>
            <strong>{settlement.population}</strong>
          </div>
        ) : null}
        {settlement.features ? (
          <div>
            <span>Особенности</span>
            <strong>{settlement.features}</strong>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export default SettlementInfoPanel;
