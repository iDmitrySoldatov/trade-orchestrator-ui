import {
  IBackTestsFilter,
  IBackTestsResponse,
  IError,
  IReport,
} from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getReports } from '../services/backTestsService.ts';
import { STATS_FIELDS } from '../utils/constants.ts';

export const fetchReports = createAsyncThunk<
  IBackTestsResponse,
  IBackTestsFilter
>('/backTests/fetchReports', async (data, { rejectWithValue }) => {
  return await getReports(data)
    .then((res) => res)
    .catch((err) => rejectWithValue((err as IError).message));
});

interface IBackTestsSlice {
  filter: IBackTestsFilter;
  reports: IBackTestsResponse;
  currentReport: IReport | null;
  showDetails: boolean;
  showStart: boolean;
}

const initialState: IBackTestsSlice = {
  filter: {
    strategyName: 'LAST_CANDLE',
    symbols: [],
    timeframes: [],
    user: true,
    minPeriod: 1,
    maxPeriod: 240,
    last: false,
    orderBy: STATS_FIELDS[0],
    page: 0,
  },
  reports: {
    pageNumber: 1,
    totalPages: 1,
    reports: [],
  },
  currentReport: null,
  showDetails: false,
  showStart: false,
};

export const backTestsSlice = createSlice({
  name: 'backTests',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<IBackTestsFilter>) {
      state.filter = action.payload;
    },
    setCurrentReport(state, action: PayloadAction<IReport>) {
      state.currentReport = action.payload;
    },
    setShowDetails(state, action: PayloadAction<boolean>) {
      state.showDetails = action.payload;
    },
    setShowStart(state, action: PayloadAction<boolean>) {
      state.showStart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchReports.fulfilled,
      (state, action: PayloadAction<IBackTestsResponse>) => {
        state.reports = action.payload;
      }
    );
  },
});
