import { useMemo } from "react";
import type { Settlement } from "../../data/settlements";
import mapSvg from "/districts_map.svg?raw";
import "./SettlementsMap.css";

type SettlementsMapProps = {
  settlements: Settlement[];
  selectedId: string | null;
  onSelect?: (id: string | null) => void;
};

const visibleRadius = "18";
const haloRadius = "28";
const hitRadius = "34";

const centerCirclePattern =
  /<circle cx="(?<cx>[^"]+)" cy="(?<cy>[^"]+)" r="12" fill="#25702A"\/>/;

const getCirclePattern = (settlement: Settlement) => {
  if (!settlement.mapCircle) return centerCirclePattern;

  const { cx, cy, r } = settlement.mapCircle;
  return new RegExp(
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#25702A"\\/>`,
  );
};

const addLabelClass = (pathLine: string) =>
  pathLine.replace("<path ", '<path class="settlements-map__svg-center-label" ');

const buildInteractiveSvg = (
  svg: string,
  settlements: Settlement[],
  selectedId: string | null,
) => {
  const lines = svg.split(/\r?\n/);
  const result: string[] = [];
  let settlementIndex = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const settlement = settlements[settlementIndex];
    const match = settlement ? line.match(getCirclePattern(settlement)) : null;

    if (!settlement || !match) {
      result.push(line);
      continue;
    }

    settlementIndex += 1;
    const cx = settlement.mapCircle?.cx ?? match.groups?.cx ?? "0";
    const cy = settlement.mapCircle?.cy ?? match.groups?.cy ?? "0";
    const labelLines: string[] = [];
    let nextIndex = index + 1;

    while (nextIndex < lines.length && lines[nextIndex].startsWith("<path ")) {
      labelLines.push(addLabelClass(lines[nextIndex]));
      nextIndex += 1;
    }

    const activeClass =
      settlement.id === selectedId ? " settlements-map__svg-center--active" : "";
    const markerVisibleRadius = settlement.marker?.visibleRadius ?? visibleRadius;
    const markerHaloRadius = settlement.marker?.haloRadius ?? haloRadius;
    const markerHitRadius = settlement.marker?.hitRadius ?? hitRadius;

    result.push(
      `<g class="settlements-map__svg-center${activeClass}" data-id="${settlement.id}" role="button" tabindex="0" aria-label="${settlement.title}" aria-pressed="${settlement.id === selectedId}" style="transform-origin: ${cx}px ${cy}px">`,
      `<circle class="settlements-map__svg-center-hit" cx="${cx}" cy="${cy}" r="${markerHitRadius}" />`,
      `<circle class="settlements-map__svg-center-halo" cx="${cx}" cy="${cy}" r="${markerHaloRadius}" />`,
      `<circle class="settlements-map__svg-center-circle" cx="${cx}" cy="${cy}" r="${markerVisibleRadius}" />`,
      ...labelLines,
      "</g>",
    );

    index = nextIndex - 1;
  }

  return result.join("\n");
};

const getCenterId = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;

  return target.closest<SVGGElement>(".settlements-map__svg-center")?.dataset.id ?? null;
};

export function SettlementsMap({
  settlements,
  selectedId,
  onSelect,
}: SettlementsMapProps) {
  const interactiveSvg = useMemo(
    () => buildInteractiveSvg(mapSvg, settlements, selectedId),
    [settlements, selectedId],
  );

  const selectCenter = (target: EventTarget | null) => {
    const id = getCenterId(target);
    if (id) onSelect?.(id);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    selectCenter(event.target);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const id = getCenterId(event.target);
    if (!id) return;

    event.preventDefault();
    onSelect?.(id);
  };

  return (
    <div className="settlements-map-root">
      <div
        className="settlements-map"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: interactiveSvg }}
      />
    </div>
  );
}

export default SettlementsMap;
