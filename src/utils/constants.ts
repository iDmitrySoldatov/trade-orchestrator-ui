export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const EXCHANGES = ['SPBX', 'MOEX'] as const;

export const STRATEGY_NAMES = ['LAST_CANDLE'] as const;

export const STATS_FIELDS = [
  'PROFIT_FACTOR',
  'TOTAL_BALANCE',
  'TOTAL_TRADES',
  'AVERAGE_PROFIT',
  'WIN_RATE',
  'MAX_LOSS_TRADE',
  'MAX_DRAWDOWN',
  'SHARPE_RATIO',
] as const;
