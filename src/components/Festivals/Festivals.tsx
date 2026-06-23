import { useEffect, useMemo, useState } from "react";
import "./Festivals.css";
import type { Festival } from "../../data/festivals";
// static imports for festival logos (fallback for import.meta.globEager)
// @ts-ignore
import logo1 from "../../assets/festival-logos/1.png";
// @ts-ignore
import logo2 from "../../assets/festival-logos/2.png";
// @ts-ignore
import logo3 from "../../assets/festival-logos/3.png";
// @ts-ignore
import logo4 from "../../assets/festival-logos/4.png";
// @ts-ignore
import logo5 from "../../assets/festival-logos/5.png";
// @ts-ignore
import logo6 from "../../assets/festival-logos/6.png";
// @ts-ignore
import logo7 from "../../assets/festival-logos/7.png";
// @ts-ignore
import logo8 from "../../assets/festival-logos/8.png";
// @ts-ignore
import logo9 from "../../assets/festival-logos/9.png";
// @ts-ignore
import logo10 from "../../assets/festival-logos/10.png";
// @ts-ignore
import logo11 from "../../assets/festival-logos/11.png";
// @ts-ignore
import logo12 from "../../assets/festival-logos/12.png";
// @ts-ignore
import logo13 from "../../assets/festival-logos/13.png";
// @ts-ignore
import logo14 from "../../assets/festival-logos/14.png";

// raw SVG map import (Vite handles `?raw`)
// prefer festival-specific map if present; `fest_map.svg` exists in repo
// @ts-ignore - raw import
// `fest_map.svg` is at the project root; use absolute path so Vite resolves it.
// @ts-ignore - raw import
// use karta_3.svg as requested
// @ts-ignore - raw import
import mapSvg from "/karta_3.svg?raw";
// (removed raw import of fest_map.svg) - positions are manual now

type FestivalsProps = {
  festivals: Festival[];
  onSelect?: (id: string | null) => void;
};

// approximate positions (percent) for festival logos on the map
const POS: Record<string, { left: string; top: string }> = {
  "selsovet-01": { left: "60%", top: "30%" }, //Жилэк
  "selsovet-02": { left: "33%", top: "42%" }, //Кинйэ йыйыны
  "selsovet-03": { left: "91%", top: "39%" }, //Симек
  "selsovet-04": { left: "45%", top: "65%" }, //Какук сайе
  "selsovet-05": { left: "42%", top: "18%" }, //Бал корто
  "selsovet-06": { left: "58%", top: "50%" }, //Родники
  "selsovet-07": { left: "83%", top: "30%" }, //Рыбный край
  "selsovet-08": { left: "58%", top: "90%" }, //Самауыр
  "selsovet-09": { left: "82%", top: "58%" }, //Семья
  "selsovet-10": { left: "55%", top: "15%" }, //Тамъян йыйыны
  "selsovet-11": { left: "68%", top: "76%" }, //Печан омасы
  "selsovet-12": { left: "30%", top: "8%" }, //Тамле фест
  "selsovet-13": { left: "68%", top: "58%" }, //Три спаса
  "selsovet-14": { left: "70%", top: "38%" }, //Узоры моего народа
};




export function Festivals({ festivals, onSelect }: FestivalsProps) {
  const logos = useMemo(() => {
    // static mapping from known imports
    const map: Record<string, string> = {};
    const pairs: Array<[string, string]> = [
      ["1", logo1],
      ["1.png", logo1],
      ["2", logo2],
      ["2.png", logo2],
      ["3", logo3],
      ["3.png", logo3],
      ["4", logo4],
      ["4.png", logo4],
      ["5", logo5],
      ["5.png", logo5],
      ["6", logo6],
      ["6.png", logo6],
      ["7", logo7],
      ["7.png", logo7],
      ["8", logo8],
      ["8.png", logo8],
      ["9", logo9],
      ["9.png", logo9],
      ["10", logo10],
      ["10.png", logo10],
      ["11", logo11],
      ["11.png", logo11],
      ["12", logo12],
      ["12.png", logo12],
      ["13", logo13],
      ["13.png", logo13],
      ["14", logo14],
      ["14.png", logo14],
    ];
    pairs.forEach(([k, v]) => (map[k] = v));
    return map;
  }, []);

    // positions are provided manually via `f.position` or fallback `POS`

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    onSelect?.(active);
  }, [active, onSelect]);

  return (
    <div className="festivals-root">
      <div className="festivals-map" dangerouslySetInnerHTML={{ __html: mapSvg }} />
      {/* debug removed */}

      <div className="festivals-logos">
        {festivals.map((f) => {
          const pos = (f as any).position ?? POS[f.id];
          if (!pos) return null;
          const logoKey = f.logo ?? f.id.replace(/^selsovet-0?/, "");
          let logoSrc: string | null = null;
          // direct lookup (by key without ext)
          if (logos[logoKey]) logoSrc = logos[logoKey];
          // try id-based key
          if (!logoSrc && logos[f.id]) logoSrc = logos[f.id];
          // try numeric id (strip prefix)
          if (!logoSrc) {
            const alt = f.id.replace(/^selsovet-0?/, "");
            if (logos[alt]) logoSrc = logos[alt];
          }
          // fallback: find any logo whose key contains the requested key
          if (!logoSrc) {
            const found = Object.keys(logos).find((k) => k === logoKey || k === `${logoKey}.png` || k === `${logoKey}.svg` || k.endsWith(logoKey));
            if (found) logoSrc = logos[found];
          }

          return (
            <div key={f.id} style={{ position: "absolute", left: pos.left, top: pos.top, transform: "translate(-50%, -50%)" }}>
              <button
                className={"festival-logo" + (active === f.id ? " active" : "")}
                onClick={() => setActive((v) => (v === f.id ? null : f.id))}
                aria-pressed={active === f.id}
                title={f.title}
              >
                {logoSrc ? (
                  <img src={logoSrc} alt={f.title} />
                ) : (
                  <span className="festival-logo__placeholder">{f.title}</span>
                )}
              </button>

              <div className="festival-label">
                <span className="festival-label__dot" aria-hidden="true">•</span>
                <span className="festival-label__text">город n</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Festivals;
