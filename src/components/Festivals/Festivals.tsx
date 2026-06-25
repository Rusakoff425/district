import { useEffect, useMemo, useState } from "react";
import "./Festivals.css";
import type { Festival } from "../../data/festivals";
import logo1 from "../../assets/festival-logos/1.png";
import logo2 from "../../assets/festival-logos/2.png";
import logo3 from "../../assets/festival-logos/3.png";
import logo4 from "../../assets/festival-logos/4.png";
import logo5 from "../../assets/festival-logos/5.png";
import logo6 from "../../assets/festival-logos/6.png";
import logo7 from "../../assets/festival-logos/7.png";
import logo8 from "../../assets/festival-logos/8.png";
import logo9 from "../../assets/festival-logos/9.png";
import logo10 from "../../assets/festival-logos/10.png";
import logo11 from "../../assets/festival-logos/11.png";
import logo12 from "../../assets/festival-logos/12.png";
import logo13 from "../../assets/festival-logos/13.png";
import logo14 from "../../assets/festival-logos/14.png";
import mapSvg from "/karta_3.svg?raw";

type FestivalsProps = {
  festivals: Festival[];
  onSelect?: (id: string | null) => void;
};

const positions: Record<string, { left: string; top: string }> = {
  "selsovet-01": { left: "55%", top: "30%" }, //Жилэк
  "selsovet-02": { left: "30%", top: "42%" }, //Кинйэ йыйыны
  "selsovet-03": { left: "90%", top: "39%" }, //Симек
  "selsovet-04": { left: "43%", top: "65%" }, //Какук сайе
  "selsovet-05": { left: "38%", top: "18%" }, //Бал корто
  "selsovet-06": { left: "53%", top: "50%" }, //Родники
  "selsovet-07": { left: "75%", top: "30%" }, //Рыбный край
  "selsovet-08": { left: "54%", top: "90%" }, //Самауыр
  "selsovet-09": { left: "78%", top: "58%" }, //Семья
  "selsovet-10": { left: "50%", top: "15%" }, //Тамьян йыйыны
  "selsovet-11": { left: "62%", top: "76%" }, //Печан омасы
  "selsovet-12": { left: "25%", top: "8%" }, //Тамле
  "selsovet-13": { left: "64%", top: "58%" }, //Три спаса
  "selsovet-14": { left: "65%", top: "38%" }, //Узоры
};

export function Festivals({ festivals, onSelect }: FestivalsProps) {
  const logos = useMemo<Record<string, string>>(
    () => ({
        "1": logo1,
        "1.png": logo1,
        "2": logo2,
        "2.png": logo2,
        "3": logo3,
        "3.png": logo3,
        "4": logo4,
        "4.png": logo4,
        "5": logo5,
        "5.png": logo5,
        "6": logo6,
        "6.png": logo6,
        "7": logo7,
        "7.png": logo7,
        "8": logo8,
        "8.png": logo8,
        "9": logo9,
        "9.png": logo9,
        "10": logo10,
        "10.png": logo10,
        "11": logo11,
        "11.png": logo11,
        "12": logo12,
        "12.png": logo12,
        "13": logo13,
        "13.png": logo13,
        "14": logo14,
        "14.png": logo14,
      }),
    [],
  );

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    onSelect?.(active);
  }, [active, onSelect]);

  return (
    <div className="festivals-root">
      <div className="festivals-map" dangerouslySetInnerHTML={{ __html: mapSvg }} />

      <div className="festivals-logos">
        {festivals.map((festival) => {
          const position = festival.position ?? positions[festival.id];
          if (!position) return null;

          const numericLogoKey = festival.id.replace(/^selsovet-0?/, "");
          const logoSrc =
            logos[festival.logo ?? ""] ??
            logos[numericLogoKey] ??
            logos[`${numericLogoKey}.png`] ??
            null;

          return (
            <div
              className="festival-point"
              key={festival.id}
              style={{ left: position.left, top: position.top }}
            >
              <button
                className={"festival-logo" + (active === festival.id ? " active" : "")}
                onClick={() =>
                  setActive((current) => (current === festival.id ? null : festival.id))
                }
                aria-label={festival.title}
                aria-pressed={active === festival.id}
                type="button"
              >
                {logoSrc ? (
                  <img src={logoSrc} alt="" aria-hidden="true" />
                ) : (
                  <span className="festival-logo__placeholder">{festival.title}</span>
                )}
              </button>

              <div className="festival-label">
                <span className="festival-label__dot" aria-hidden="true">
                  •
                </span>
                <span className="festival-label__text">{festival.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Festivals;
