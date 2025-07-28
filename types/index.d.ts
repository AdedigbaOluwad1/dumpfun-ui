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
}
