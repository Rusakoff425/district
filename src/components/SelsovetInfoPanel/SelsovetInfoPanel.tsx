import type { Selsovet } from "../../types/selsovet";
import "./SelsovetInfoPanel.css";

type SelsovetInfoPanelProps = {
  selsovet: Selsovet | null;
};

export function SelsovetInfoPanel({ selsovet }: SelsovetInfoPanelProps) {
  if (!selsovet) {
    return (
      <aside className="selsovet-info-panel selsovet-info-panel--empty">
        <div className="selsovet-info-panel__heading">
          <span className="selsovet-info-panel__icon">⌖</span>
          <h2>Карта района</h2>
        </div>
        <p>Выберите сельсовет на карте, чтобы увидеть достопримечательности.</p>
      </aside>
    );
  }

  return (
    <aside className="selsovet-info-panel">
      <div className="selsovet-info-panel__heading">
        <span className="selsovet-info-panel__icon">⌂</span>
        <h2>{selsovet.name}</h2>
      </div>
      <p className="selsovet-info-panel__description">{selsovet.description}</p>

      <div className="selsovet-info-panel__divider" aria-hidden="true">
        <span />
        <b>✥</b>
        <span />
      </div>

      <h3>
        <span>✣</span>
        Места
      </h3>
      <ul className="selsovet-info-panel__sights">
        {selsovet.sights.map((sight, index) => (
          <li key={sight.id} className="selsovet-info-panel__sight">
            <span className="selsovet-info-panel__sight-icon">
              {index % 2 === 0 ? "▵" : "♧"}
            </span>
            <div>
              <h4>{sight.title}</h4>
              {sight.type ? (
                <span className="selsovet-info-panel__sight-type">
                  {sight.type}
                </span>
              ) : null}
              <p>{sight.description}</p>
              <div className="selsovet-info-panel__sight-links">
                {sight.mapUrl ? (
                  <a
                    href={sight.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть на Яндекс.Картах
                  </a>
                ) : null}
                {sight.sourceUrl ? (
                  <a
                    href={sight.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Источник
                  </a>
                ) : null}
              </div>
              {sight.notes ? (
                <small className="selsovet-info-panel__sight-note">
                  {sight.notes}
                </small>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
