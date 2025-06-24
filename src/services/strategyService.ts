import { request } from './request.ts';

const LOCAL_BASE_URL = '/strategy';

interface IStartStrategy {
  strategyName: string;
  symbol: number;
  timeframe: string;
  lotQuantity: number;
  stopLossCoefficient: number;
  takeProfitCoefficient: number;
}

export const getStrategies = async () => {
  return await request(LOCAL_BASE_URL);
};

export const startStrategy = async (data: IStartStrategy) => {
  return await request(LOCAL_BASE_URL + '/start', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const stopStrategy = async (id: number) => {
  return await request(LOCAL_BASE_URL + '/' + id, {
    method: 'DELETE',
  });
};

export const getOrders = async (id: number) => {
  return await request(LOCAL_BASE_URL + `/${id}/order`);
};

export const getEvents = async (id: number) => {
  return await request(LOCAL_BASE_URL + `/${id}/event`);
};
