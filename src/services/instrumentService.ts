import {request} from "./request.ts";
import {Exchange} from "../utils/types.ts";

interface IAddRequest {
  symbol: string;
  exchange: Exchange;
}

const LOCAL_BASE_URL = '/instrument';

export const getAllInstruments = async () => {
  return await request(LOCAL_BASE_URL);
}

export const addSymbol = async (data:IAddRequest) => {
  return await request(LOCAL_BASE_URL, {
    method: "POST", headers: {
      "Content-Type": "application/json",
    }, body: JSON.stringify({symbol: data.symbol, exchange: data.exchange}),
  });
}