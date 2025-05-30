import {IBackTestsFilter} from "../utils/types.ts";
import {request} from "./request.ts";

const LOCAL_BASE_URL = '/back-test';



interface IBackTest {
  strategyName: string;
  symbols: number[];
  timeframes: string[];
  periodInMonth: number;
  params: Record<string, string>;
}

export const getReports = async (filters: IBackTestsFilter) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach(item => params.append(key, String(item)));
    }
    else {
      params.append(key, String(value));
    }
  });

  return await request(`${LOCAL_BASE_URL}?${params.toString()}`);
};

export const startBackTest = async (data: IBackTest) => {
  return await request(LOCAL_BASE_URL, {method: 'POST', body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}});
}