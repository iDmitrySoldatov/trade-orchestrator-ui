import { request } from './request.ts';

export const getEnumValues = async (enumName: string) => {
  return await request('/enum/' + enumName);
};
