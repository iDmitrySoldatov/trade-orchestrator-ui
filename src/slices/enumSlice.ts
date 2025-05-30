import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../utils/types.ts';
import { getEnumValues } from '../services/enumService.ts';

export const fetchGetTimeframes = createAsyncThunk<string[]>(
  '/enum/fetchGetTimeframes',
  async (_, { rejectWithValue }) => {
    return await getEnumValues('timeframe')
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

export const fetchGetBackTestParams = createAsyncThunk<string[]>(
  '/enum/fetchGetBackTestParams',
  async (_, { rejectWithValue }) => {
    return await getEnumValues('backtestparams')
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

interface IEnumSlice {
  timeframes: string[];
  backTestParams: string[];
}

const initialState: IEnumSlice = {
  timeframes: [],
  backTestParams: [],
};

export const enumSlice = createSlice({
  name: 'enum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTimeframes.pending, (state) => {
        state.timeframes = [];
      })
      .addCase(
        fetchGetTimeframes.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.timeframes = action.payload;
        }
      )
      .addCase(fetchGetBackTestParams.pending, (state) => {
        state.backTestParams = [];
      })
      .addCase(
        fetchGetBackTestParams.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.backTestParams = action.payload;
        }
      );
  },
});
