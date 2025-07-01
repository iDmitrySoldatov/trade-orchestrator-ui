import {
  EXCHANGES,
  STRATEGY_EVENT_TYPES,
  STRATEGY_NAMES,
} from './constants.ts';

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

export type StrategyEventType = (typeof STRATEGY_EVENT_TYPES)[number];

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
  averageInterestPerMonth: number;
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

export interface IStrategy {
  id: number;
  strategyName: string;
  timeframe: string;
  state: string;
  isResponsible: boolean;
  instrument: IInstrument;
  lotQuantity: number;
  profit: number;
}

export interface IOrder {
  guid: string;
  openPrice: number;
  closePrice: number;
  openCommission: number;
  closeCommission: number;
  stopLoss: number;
  takeProfit: number;
  result: number;
  updatedAt: string;
}

export interface IEvent {
  eventType: StrategyEventType;
  strategyState: string;
  message: string;
  createdAt: string;
}

export interface IStartStrategy {
  strategyName: string;
  symbol: number;
  timeframe: string;
  lotQuantity: number;
  stopLossCoefficient: number;
  takeProfitCoefficient: number;
}
