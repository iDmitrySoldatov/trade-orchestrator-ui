import { request } from './request.ts';

interface ILoginRequest {
  phone: string;
  token: string;
}

interface IChatRequest {
  chatId: string;
}

const LOCAL_BASE_URL = '/user';

export const login = async (data: ILoginRequest) => {
  return await request(LOCAL_BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const logout = async () => {
  return await request(LOCAL_BASE_URL + '/logout');
};

export const getUser = async () => {
  return await request(LOCAL_BASE_URL);
};

export const setChatId = async (data: IChatRequest) => {
  return await request(LOCAL_BASE_URL + '/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteChatId = async () => {
  return await request(LOCAL_BASE_URL + '/chat', {
    method: 'DELETE',
  });
};
