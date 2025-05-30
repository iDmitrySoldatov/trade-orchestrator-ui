import { EXCHANGES, STRATEGY_NAMES } from './constants.ts';

export interface IUser {
  phone: string;
}

export interface IError {
  message: string;
  code: string;
  timestamp: number;
}

export type Exchange = (typeof EXCHANGES)[number];

export type StrategyNames = (typeof STRATEGY_NAMES)[number];

export interface IInstrument {
  id: number;
  symbol: string;
  shortname: string;
  exchange: Exchange;
  currency: string;
  pointPrice: number;
  minStep: number;
}

export interface IBackTestsFilter {
  strategyName: StrategyNames;
  symbols: number[];
  timeframes: string[];
  user: boolean;
  minPeriod: number;
  maxPeriod: number;
  last: boolean;
  orderBy: string;
  page: number;
}

export interface IStatsFields {
  totalBalance: number;
  totalTrades: number;
  profitFactor: number;
  averageTradeProfit: number;
  winRate: number;
  maxLossTrade: number;
  maxDrawdown: number;
  sharpeRatio: number;
}

export interface ISymbol {
  symbol: string;
  exchange: Exchange;
}

export interface IReport {
  strategyName: string;
  symbol: ISymbol;
  timeframe: string;
  periodInMonths: number;
  backTestStats: IStatsFields;
  params: string;
}

export interface IBackTestsResponse {
  pageNumber: number;
  totalPages: number;
  reports: IReport[];
}
