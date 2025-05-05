import {BASE_URL} from "../utils/constants.ts";
import {IError} from "../utils/types.ts";

export const request = (endpoint: string, options?: RequestInit) => {
  const updatedOptions = {...options, credentials: "include" as RequestCredentials};

  return fetch(BASE_URL + "orchestra/api/" + endpoint, updatedOptions).then(checkResponse);
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err:IError) => Promise.reject(err));
};