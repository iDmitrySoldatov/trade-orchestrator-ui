import { request } from './request.ts';

interface ILoginRequest {
  phone: string;
  token: string;
}

const LOCAL_BASE_URL = '/user';

export const login = async (data: ILoginRequest) => {
  return await request(LOCAL_BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: data.phone, token: data.token }),
  });
};

export const logout = async () => {
  return await request(LOCAL_BASE_URL + '/logout');
};

export const check = async () => {
  return await request(LOCAL_BASE_URL + '/check');
};
