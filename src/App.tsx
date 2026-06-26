import { useState } from "react";
import gerbUrl from "./assets/gerb.svg";
import { DistrictMap } from "./components/DistrictMap/DistrictMap";
import { SelsovetInfoPanel } from "./components/SelsovetInfoPanel/SelsovetInfoPanel";
import { Festivals } from "./components/Festivals/Festivals";
import { FestivalInfoPanel } from "./components/FestivalInfoPanel/FestivalInfoPanel";
import { SettlementInfoPanel } from "./components/SettlementInfoPanel/SettlementInfoPanel";
import { SettlementsMap } from "./components/SettlementsMap/SettlementsMap";
import { StaticDistrictMap } from "./components/StaticDistrictMap/StaticDistrictMap";
import { selsovets } from "./data/selsovets";
import { festivals } from "./data/festivals";
import { settlements } from "./data/settlements";

type Page = "about" | "territories";

export function App() {
  const [activePage, setActivePage] = useState<Page>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSelsovetId, setSelectedSelsovetId] = useState<string | null>(
    "selsovet-12",
  );
  const [territoriesView, setTerritoriesView] = useState<"map" | "settlements" | "festivals">("map");
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);
  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>(null);

  const selectedSelsovet =
    selsovets.find((selsovet) => selsovet.id === selectedSelsovetId) ?? null;
  const selectedSettlement =
    settlements.find((settlement) => settlement.id === selectedSettlementId) ?? null;
  const selectedFestival =
    festivals.find((festival) => festival.id === selectedFestivalId) ?? null;

  return (
    <main className="app">
      <header className="topbar">
        <button
          className="brand"
          type="button"
          aria-label="Куюргазинский район"
          onClick={() => setActivePage("about")}
        >
          <span className="brand__mark">
            <img src={gerbUrl} alt="" aria-hidden="true" />
          </span>
          <span className="brand__text">
            <strong>Куюргазинский</strong>
            <small>район</small>
          </span>
        </button>

        <nav className="topnav" aria-label="Основная навигация">
          <button
            className={activePage === "about" ? "topnav__link--active" : ""}
            type="button"
            onClick={() => setActivePage("about")}
          >
            О районе
          </button>
          <button
            className={
              activePage === "territories" ? "topnav__link--active" : ""
            }
            type="button"
            onClick={() => setActivePage("territories")}
          >
            Атлас района
          </button>
        </nav>

        <div className="mobile-topbar__actions">
          <button
            className="mobile-map-button"
            type="button"
            onClick={() => {
              setActivePage("territories");
              setIsMobileMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18.5 3.75 21V6L9 3.5l6 2 5.25-2.5v15L15 21l-6-2.5Z" />
              <path d="M9 3.5v15M15 5.5V21" />
            </svg>
            Карта
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          className={
            isMobileMenuOpen
              ? "mobile-menu mobile-menu--open"
              : "mobile-menu"
          }
          aria-label="Мобильная навигация"
        >
          <button
            className={activePage === "about" ? "mobile-menu__link--active" : ""}
            type="button"
            onClick={() => {
              setActivePage("about");
              setIsMobileMenuOpen(false);
            }}
          >
            О районе
          </button>
          <button
            className={
              activePage === "territories" ? "mobile-menu__link--active" : ""
            }
            type="button"
            onClick={() => {
              setActivePage("territories");
              setIsMobileMenuOpen(false);
            }}
          >
            Атлас района
          </button>
        </nav>
      </header>

      {activePage === "about" ? (
        <section className="about-page" aria-label="О районе">
          <div className="about-hero">
            <div className="about-hero__crest">
              <img src={gerbUrl} alt="Герб Куюргазинского района" />
            </div>

            <div className="about-hero__content">
              <div className="about-hero__title-row">
                <h1>
                  <span>Куюргазинский</span>
                  <span>район</span>
                </h1>
                <p className="about-hero__tagline">душа юга Башкортостана</p>
              </div>
              <p className="about-hero__lead">
                Куюргазинский район — Куюргазинский район — земля деревень, полей, рек и живой истории.
                Исследуйте интерактивную карту, открывайте сельсоветы и узнавайте о достопримечательностях, природе и памятных местах нашего края.

              </p>
              <div className="about-hero__ornament" aria-hidden="true">
                <span>✥</span>
                <i />
              </div>
            </div>

            <div className="about-hero__map" aria-hidden="true">
              <StaticDistrictMap />
            </div>
          </div>

          <div className="about-stats" aria-label="Ключевые показатели">
            <div>
              <span>♙</span>
              <strong>46 327</strong>
              <small>жителей</small>
            </div>
            <div>
              <span>◇</span>
              <strong>2 256 км²</strong>
              <small>площадь района</small>
            </div>
            <div>
              <span>⌂</span>
              <strong>15</strong>
              <small>сельсоветов</small>
            </div>
            <div>
              <span>✪</span>
              <strong>Основан в 1930 году</strong>
              <small>год образования</small>
            </div>
            <button type="button" onClick={() => setActivePage("territories")}>
              Перейти к карте района
              <span>→</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="app__layout" aria-label="Карта и описание">
        <aside className="sidebar" aria-label="Разделы карты">
          <button
            type="button"
            className={territoriesView === "settlements" ? "sidebar__item sidebar__item--active" : "sidebar__item"}
            onClick={() => {
              setTerritoriesView("settlements");
              setSelectedSelsovetId(null);
              setSelectedFestivalId(null);
            }}
          >
            <span>⌖</span>
            Населенные пункты
          </button>
          <button
            type="button"
            className={
              territoriesView === "map" ? "sidebar__item sidebar__item--active" : "sidebar__item"
            }
            onClick={() => {
              setTerritoriesView("map");
              setSelectedFestivalId(null);
              setSelectedSettlementId(null);
            }}
          >
            <span>◇</span>
            Сельсоветы
          </button>
          <button
            type="button"
            className={territoriesView === "festivals" ? "sidebar__item sidebar__item--active" : "sidebar__item"}
            onClick={() => {
              setTerritoriesView("festivals");
              setSelectedSelsovetId(null);
              setSelectedSettlementId(null);
            }}
          >
            <span>♧</span>
            Фестивали
          </button>
          <div className="sidebar__compass" aria-hidden="true">
            <span>N</span>
            <strong>✦</strong>
            <span>S</span>
          </div>
        </aside>

        <div className="app__content">
          <section className="map-hero" aria-label="Интерактивная карта">
            <div className="app__header">
              <div className="app__intro">
                <span aria-hidden="true" />
                <p>
                  Откройте богатую историю, природу и культуру нашего района
                </p>
              </div>
            </div>

            <div className="app__map-area">
              <div className="app__map-shell">
                {territoriesView === "map" ? (
                  <DistrictMap
                    selectedId={selectedSelsovetId}
                    onSelect={setSelectedSelsovetId}
                  />
                ) : territoriesView === "settlements" ? (
                  <SettlementsMap
                    settlements={settlements}
                    selectedId={selectedSettlementId}
                    onSelect={(id) => setSelectedSettlementId(id)}
                  />
                ) : (
                  <Festivals
                    festivals={festivals}
                    onSelect={(id) => setSelectedFestivalId(id)}
                  />
                )}
              </div>
            </div>

            <div className="map-summary">
              <span>✥</span>
              <strong>12 сельсоветов</strong>
              <small>в составе района</small>
              <i />
              <span>♧</span>
              <small>Природа и традиции нашей земли</small>
            </div>
          </section>

          <section
            className="details-column"
            aria-label={
              territoriesView === "map"
                ? "Описание сельсовета"
                : territoriesView === "settlements"
                  ? "Описание населенного пункта"
                  : "Описание фестиваля"
            }
          >
            {territoriesView === "map" ? (
              <SelsovetInfoPanel selsovet={selectedSelsovet} />
            ) : territoriesView === "settlements" ? (
              <SettlementInfoPanel settlement={selectedSettlement} />
            ) : (
              <FestivalInfoPanel festival={selectedFestival} />
            )}
            <div className="details-hint">
              <span>i</span>
              <p>
                {territoriesView === "map"
                  ? "Выберите другой сельсовет на карте, чтобы узнать больше о территории"
                  : territoriesView === "settlements"
                    ? "Выберите крупный маркер населенного пункта на карте, чтобы открыть описание справа"
                    : "Выберите логотип фестиваля на карте, чтобы открыть отдельное описание справа"}
              </p>
            </div>
          </section>
        </div>
      </section>
      )}
    </main>
  );
}
