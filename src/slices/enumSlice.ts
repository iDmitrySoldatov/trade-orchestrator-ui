import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IError} from "../utils/types.ts";
import {getEnumValues} from "../services/enumService.ts";

export const fetchGetTimeframes = createAsyncThunk<string[]>(
    "/enum/fetchGetTimeframes",
    async (_, {rejectWithValue}) => {
      return await getEnumValues('timeframe')
          .then(res => res)
          .catch(err => rejectWithValue((err as IError).message))
    }
);

export const fetchGetBacktestparams = createAsyncThunk<string[]>(
    "/enum/fetchGetBacktestparams",
    async (_, {rejectWithValue}) => {
      return await getEnumValues('backtestparams')
          .then(res => res)
          .catch(err => rejectWithValue((err as IError).message))
    }
);

interface IEnumSlice {
  timeframes: string[],
  backtestparams: string[],
}

const initialState: IEnumSlice = {
  timeframes: [],
  backtestparams: [],
}

export const enumSlice = createSlice({
  name:'enum',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
        .addCase(fetchGetTimeframes.pending, (state) => {
          state.timeframes = [];
        })
        .addCase(fetchGetTimeframes.fulfilled, (state, action:PayloadAction<string[]>) => {
          state.timeframes = action.payload;
        })
        .addCase(fetchGetBacktestparams.pending, (state) => {
          state.backtestparams = [];
        })
        .addCase(fetchGetBacktestparams.fulfilled, (state, action:PayloadAction<string[]>) => {
          state.backtestparams = action.payload;
        })
  }
})