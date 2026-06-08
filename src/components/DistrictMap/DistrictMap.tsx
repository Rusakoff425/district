import { useEffect, useRef } from "react";
import mapSvg from "../../assets/karta.svg?raw";
import "./DistrictMap.css";

type DistrictMapProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const getRegion = (target: EventTarget | null): SVGElement | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<SVGElement>("[data-id]");
};

export function DistrictMap({ selectedId, onSelect }: DistrictMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const regions =
      mapRef.current?.querySelectorAll<SVGElement>("[data-id]") ?? [];

    regions.forEach((region) => {
      const isSelected = region.dataset.id === selectedId;
      region.classList.toggle("selected", isSelected);
      region.setAttribute(
        "aria-pressed",
        isSelected ? "true" : "false",
      );
    });
  }, [selectedId]);

  const selectRegion = (target: EventTarget | null) => {
    const region = getRegion(target);
    const id = region?.dataset.id;

    if (id) {
      onSelect(id);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    selectRegion(event.target);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const region = getRegion(event.target);

    if (!region) {
      return;
    }

    event.preventDefault();
    selectRegion(region);
  };

  return (
    <div
      ref={mapRef}
      className="district-map"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      dangerouslySetInnerHTML={{ __html: mapSvg }}
    />
  );
}
