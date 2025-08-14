export interface OnInitializeEvent {
  mint: string;
}

export interface OnTradeEvent {
  mint: string;
  marketCap: number;
  currentPrice: number;
  realTokenReserves: number;
}

type EventMap = {
  onInitializeEvent: OnInitializeEvent;
  onTradeEvent: OnTradeEvent;
};
