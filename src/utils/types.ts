import {
  EXCHANGES,
  STRATEGY_EVENT_TYPES,
  STRATEGY_NAMES,
  STRATEGY_ORDER_STATES,
  STRATEGY_STATES,
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

export type StrategyState = (typeof STRATEGY_STATES)[number];

export type StrategyOrderState = (typeof STRATEGY_ORDER_STATES)[number];

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
  state: StrategyState;
  isResponsible: boolean;
  instrument: IInstrument;
  lotQuantity: number;
  profit: number;
}

export interface IOrder {
  state: StrategyOrderState;
  price: number;
  stopLoss: number;
  takeProfit: number;
  result: number;
  updatedAt: string;
}

export interface IEvent {
  eventType: StrategyEventType;
  strategyState: StrategyState;
  message: string;
  createdAt: string;
}
