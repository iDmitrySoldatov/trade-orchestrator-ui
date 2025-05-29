import {IBackTestsFilter, IBackTestsResponse} from "../utils/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBacktestsSlice {
  filter: IBackTestsFilter,
  reports: IBackTestsResponse,
}

const initialState: IBacktestsSlice = {
  filter: {
    strategyName: 'LAST_CANDLE',
    symbols:[],
    timeframes: [],
    user: true,
    minPeriod: 1,
    maxPeriod: 240,
    last: false,
    orderBy: '',
    page: 1,
  },
  reports: {
    pageNumber: 1,
    totalPages: 1,
    reports: [],
  }
}

export const backtestsSlice = createSlice({
  name: 'backtests',
  initialState,
  reducers: {
    setFilter (state, action:PayloadAction<IBackTestsFilter>) {
      state.filter = action.payload;
    }
  }
})