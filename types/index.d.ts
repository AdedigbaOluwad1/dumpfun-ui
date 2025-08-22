export * from "./profile";
export * from "./coin";

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

export interface iFileUploadResponse {
  ufsUrl: string;
  url: string;
  appUrl: string;
  fileHash: string;
  serverData: null;
  key: string;
}

export interface iChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
