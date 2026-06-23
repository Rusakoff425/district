import { selsovets } from "./selsovets";

export type Festival = {
  id: string; // match selsovet id
  title: string;
  location: string;
  description: string;
  date?: string;
  logo?: string; // optional key matching file name (without extension) in src/assets/festival-logos/
};

export const festivals: Festival[] = selsovets.map((s, i) => ({
  id: s.id,
  title: `${s.name} — Карта фестивалей`,
  location: s.name,
  description: s.sights?.[0]?.description ?? s.description,
  date: undefined,
  // default logo mapping: 1..N -> src/assets/festival-logos/1.png, etc.
  logo: `${i + 1}.png`,
}));

export default festivals;
