export const BASE_URL = 'https://samurai-trading.online';

export const EXCHANGES = ['SPBX', 'MOEX'] as const;

export const STRATEGY_NAMES = ['LAST_CANDLE'] as const;

export const STATS_FIELDS = ['TOTAL_BALANCE', 'TOTAL_TRADES', 'PROFIT_FACTOR',
  'AVERAGE_PROFIT', 'WIN_RATE', 'MAX_LOSS_TRADE', 'MAX_DRAWDOWN', 'SHARPE_RATIO'] as const ;