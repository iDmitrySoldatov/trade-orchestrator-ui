import { request } from './request.ts';
import { IStartStrategy } from '../utils/types.ts';

const LOCAL_BASE_URL = '/strategy';

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

export const pauseStrategy = async (id: number) => {
  return await request(LOCAL_BASE_URL + '/' + id + '?interrupt=true', {
    method: 'DELETE',
  });
};

export const recoveryStrategy = async (id: number) => {
  return await request(LOCAL_BASE_URL + '/' + id, {
    method: 'POST',
  });
};

export const getOrders = async (id: number) => {
  return await request(LOCAL_BASE_URL + `/${id}/order`);
};

export const getEvents = async (id: number) => {
  return await request(LOCAL_BASE_URL + `/${id}/event`);
};
