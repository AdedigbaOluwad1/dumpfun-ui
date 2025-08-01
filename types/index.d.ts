export * from "./profile";

export interface Token {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  created: string;
  creator: string;
  description: string;
  image: string;
  isNew?: boolean;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
}

export interface Activity {
  user: string;
  action: string;
  amount?: string;
  token: string;
  value?: string;
  avatar: string;
  id: string;
}

export interface iApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
