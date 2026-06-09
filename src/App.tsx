import { useState } from "react";
import gerbUrl from "./assets/gerb.svg";
import { DistrictMap } from "./components/DistrictMap/DistrictMap";
import { SelsovetInfoPanel } from "./components/SelsovetInfoPanel/SelsovetInfoPanel";
import { StaticDistrictMap } from "./components/StaticDistrictMap/StaticDistrictMap";
import { selsovets } from "./data/selsovets";

type Page = "about" | "territories";

export function App() {
  const [activePage, setActivePage] = useState<Page>("about");
  const [selectedSelsovetId, setSelectedSelsovetId] = useState<string | null>(
    "selsovet-12",
  );

  const selectedSelsovet =
    selsovets.find((selsovet) => selsovet.id === selectedSelsovetId) ?? null;

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
          <span>
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
            Территория
          </button>
          <button type="button">Достопримечательности</button>
          <button type="button">Новости</button>
          <button type="button">Контакты</button>
        </nav>

        <div className="topbar__actions" aria-label="Действия">
          <button className="icon-button" type="button" aria-label="Поиск">
            ⌕
          </button>
          <button
            className="atlas-button"
            type="button"
            onClick={() => setActivePage("territories")}
          >
            <span>◇</span>
            Атлас района
          </button>
          <button className="login-button" type="button">
            <span>♙</span>
            Войти
          </button>
        </div>
      </header>

      {activePage === "about" ? (
        <section className="about-page" aria-label="О районе">
          <div className="about-hero">
            <div className="about-hero__crest">
              <img src={gerbUrl} alt="Герб Куюргазинского района" />
            </div>

            <div className="about-hero__content">
              <div className="about-hero__title-row">
                <h1>Куюргазинский район</h1>
              </div>
              <p className="about-hero__lead">
                Куюргазинский район — это живописные ландшафты, богатое
                культурное наследие и трудолюбивые люди. Здесь бережно хранят
                традиции и уверенно строят будущее, развивая свой район и
                заботясь о благополучии каждого жителя.
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
          <a className="sidebar__item sidebar__item--active" href="/">
            <span>◇</span>
            Карта района
          </a>
          <a className="sidebar__item" href="/">
            <span>⌖</span>
            Сельсоветы
          </a>
          <a className="sidebar__item" href="/">
            <span>♧</span>
            Природа
          </a>
          <a className="sidebar__item" href="/">
            <span>▥</span>
            История
          </a>
          <a className="sidebar__item" href="/">
            <span>▣</span>
            Туризм
          </a>
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
              <div className="zoom-control" aria-hidden="true">
                <span>+</span>
                <span>−</span>
                <span>⌾</span>
              </div>
              <div className="app__map-shell">
                <DistrictMap
                  selectedId={selectedSelsovetId}
                  onSelect={setSelectedSelsovetId}
                />
              </div>
            </div>

            <div className="map-summary">
              <span>✥</span>
              <strong>15 сельсоветов</strong>
              <small>в составе района</small>
              <i />
              <span>♧</span>
              <small>Природа и традиции нашей земли</small>
            </div>
          </section>

          <section className="details-column" aria-label="Описание сельсовета">
            <SelsovetInfoPanel selsovet={selectedSelsovet} />
            <div className="details-hint">
              <span>i</span>
              <p>
                Выберите другой сельсовет на карте, чтобы узнать больше о
                территории
              </p>
            </div>
          </section>
        </div>
      </section>
      )}
    </main>
  );
}
