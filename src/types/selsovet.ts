export type Sight = {
  id: string;
  title: string;
  description: string;
  type?: string;
  image?: string;
  address?: string;
  sourceUrl?: string;
  mapUrl?: string;
  verificationStatus?: "exact" | "fallback_settlement_center" | "not_found";
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type Selsovet = {
  id: string;
  name: string;
  description: string;
  sights: Sight[];
};
