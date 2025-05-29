import {BASE_URL} from "../utils/constants.ts";

export const request = (endpoint: string, options?: RequestInit) => {
  const updatedOptions = {...options, credentials: "include" as RequestCredentials};

  return fetch(BASE_URL + "/orchestra/api" + endpoint, updatedOptions).then(checkResponse);
};

const checkResponse = async (res: Response) => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    if (errorBody) {
      throw errorBody;
    } else {
      throw new Error(`HTTP error status: ${res.status}`);
    }
  }

  try {
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};