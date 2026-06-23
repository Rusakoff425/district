import type { Festival } from "../../data/festivals";
import "./FestivalInfoPanel.css";

type Props = {
  festival: Festival | null;
};

export function FestivalInfoPanel({ festival }: Props) {
  if (!festival) {
    return (
      <aside className="festival-info-panel festival-info-panel--empty">
        <div className="festival-info-panel__heading">
          <h2>Карта фестивалей</h2>
        </div>
        <p>Выберите логотип на карте, чтобы увидеть информацию о фестивале.</p>
      </aside>
    );
  }

  return (
    <aside className="festival-info-panel">
      <div className="festival-info-panel__heading">
        <h2>{festival.title}</h2>
        <small>{festival.location}</small>
      </div>

      <p className="festival-info-panel__description">{festival.description}</p>

      <div className="festival-info-panel__meta">
        {festival.date ? <div>Дата: {festival.date}</div> : null}
      </div>

      <div className="festival-info-panel__actions">
        <button type="button">Подробнее</button>
      </div>
    </aside>
  );
}

export default FestivalInfoPanel;
