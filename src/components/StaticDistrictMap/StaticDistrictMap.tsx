import mapSvg from "../../assets/karta.svg?raw";
import "./StaticDistrictMap.css";

export function StaticDistrictMap() {
  return (
    <div
      className="static-district-map"
      aria-label="Карта Куюргазинского района"
      dangerouslySetInnerHTML={{ __html: mapSvg }}
    />
  );
}
