import { request } from './request.ts';

const LOCAL_BASE_URL = '/strategy/archive';

export const getArchiveStrategies = async () => {
  return await request(LOCAL_BASE_URL);
};
