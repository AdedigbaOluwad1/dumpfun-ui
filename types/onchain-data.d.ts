export interface iTokenTraderInfo {
  token: iToken;
  trader: iTrader;
}

export interface iToken {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  currentPrice: number;
}

export interface iTrader {
  address: string;
  username: string;
  avatar: string;
  label: string;
  totalTrades: string;
  totalVolume: string;
}
