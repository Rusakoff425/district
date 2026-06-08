export type Sight = {
  id: string;
  title: string;
  description: string;
  image?: string;
  address?: string;
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
