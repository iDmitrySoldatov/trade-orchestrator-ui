import {EXCHANGES} from "./constants.ts";

export interface IUser {
  phone: string;
}

export interface IError {
    message: string;
    code: string;
    timestamp: number;
}



export type Exchange = typeof EXCHANGES[number];

// export enum Exchange {
//   SPBX = 'SPBX',
//   MOEX = 'MOEX',
// }

export interface IInstrument {
  symbol: string;
  shortname: string;
  exchange: Exchange;
  currency: string;
  pointPrice: number;
  minStep: number;
}