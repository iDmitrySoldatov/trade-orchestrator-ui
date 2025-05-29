import {Exchange, IError, IInstrument} from "../utils/types.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addSymbol, getAllInstruments} from "../services/instrumentService.ts";

interface IAddRequest {
  symbol: string;
  exchange: Exchange;
}

export const fetchGetAll = createAsyncThunk<IInstrument[]>(
    "/instrument/fetchGetAll",
    async (_, {rejectWithValue}) => {
      return await getAllInstruments()
          .then(res => res)
          .catch(err => rejectWithValue((err as IError).message))
    }
);

export const fetchAddSymbol = createAsyncThunk<null, IAddRequest>(
    '/instrument/fetchAddSymbol',
    async (data, {rejectWithValue}) => {
      return await addSymbol(data)
          .then(res => res)
          .catch(err => rejectWithValue((err as IError).message))
    }
);

interface IInstrumentSlice {
  items: IInstrument[];
  isAddModalOpen: boolean;
  error: string;
}

const initialState: IInstrumentSlice = {
  items: [],
  isAddModalOpen: false,
  error: ''
}

export const instrumentSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setAddModal: (state, action:PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload;
    },
    resetError: (state) => {
      state.error = '';
    },
    setError: (state, action:PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
        .addCase(fetchGetAll.pending, (state) => {
          state.items = initialState.items;
        })
        .addCase(fetchGetAll.fulfilled, (state,action:PayloadAction<IInstrument[]>) => {
          state.items = action.payload;
        })
        .addCase(fetchAddSymbol.pending, (state) => {
          state.error = '';
        })
        .addCase(fetchAddSymbol.rejected, (state, action) => {
          state.error = action.payload as string;
        })
        .addCase(fetchAddSymbol.fulfilled, (state) => {
          state.isAddModalOpen = false;
          console.log(state.isAddModalOpen)
        })
  }
});