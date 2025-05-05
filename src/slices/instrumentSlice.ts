import {Exchange, IError, IInstrument} from "../utils/types.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {request} from "../services/request.ts";

interface IAddRequest {
  symbol: string;
  exchange: Exchange;
}

export const fetchGetAll = createAsyncThunk<IInstrument[]>(
    "instrument/fetchGetAll",
    async (_, {rejectWithValue}) => {
      console.log('пошло')
      try {
        return await request("instrument");
      } catch (error) {
        return rejectWithValue((error as IError).message);
      }
    }
)

export const fetchAddSymbol = createAsyncThunk<null, IAddRequest>(
    'instrument/fetchAddSymbol',
    async (data, {rejectWithValue}) => {
      try {
        return await request("instrument", {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify({symbol: data.symbol, exchange: data.exchange}),
        });
      } catch (error) {
        return rejectWithValue((error as IError).message);
      }
    }
)

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