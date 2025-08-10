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

export interface iPaginatedResponse<T> {
  data: T[];
  offset: number;
  limit: number;
  count: number;
}

export interface iCoin {
  id: string;
  mint: string;
  creatorAddress: string;
  bondingCurve: string;
  associatedBondingCurve: string;
  name: string;
  description: string;
  image: string;
  symbol: string;
  uri: string;
  virtualSolReserves: string;
  virtualTokenReserves: string;
  realSolReserves: string;
  realTokenReserves: string;
  isBondingCurveComplete: boolean;
  blockchainCreatedAt: string;
  marketCap: number;
  currentPrice: number;
  creator: string;
  creatorAvatar: string;
  isNew?: boolean;
}

export interface iRunner {
  id: string;
  mint: string;
  totalVolumeSol: string;
  totalTrades: number;
  uniqueHolders: number;
  price24hAgo: string;
  priceChange24hPercent: string;
  volume24h: string;
  marketCap: number;
  currentPrice: number;
  avatar: string;
  name: string;
  symbol: string;
}

export interface iTrade {
  id: string;
  mint: string;
  traderAddress: string;
  type: string;
  solAmount: string;
  tokenAmount: string;
  feePaid: string;
  virtualSolReserves: string;
  virtualTokenReserves: string;
  realSolReserves: string;
  realTokenReserves: string;
  transactionSignature: string;
  createdAt: string;
  username: string;
  symbol: string;
  avatar: string;
}
