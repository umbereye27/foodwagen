
export type Restaurant = {
  name: string;
  logo: string;
  status: 'Open' | 'Closed';
};

export type Food = {
  id?: string;
  name: string;
  rating: number;
  image: string;
  price?: number;
  restaurant?: Restaurant | null;
};
