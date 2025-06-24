import { IError, IEvent, IOrder, IStrategy } from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getEvents,
  getOrders,
  getStrategies,
} from '../services/strategyService.ts';

export const fetchStrategies = createAsyncThunk(
  'strategy/fetchStrategies',
  async (_, { rejectWithValue }) => {
    return await getStrategies()
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

export const fetchOrders = createAsyncThunk<IOrder[], number>(
  'strategy/fetchOrders',
  async (data, { rejectWithValue }) => {
    return await getOrders(data)
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

export const fetchEvents = createAsyncThunk<IEvent[], number>(
  'strategy/fetchEvents',
  async (data, { rejectWithValue }) => {
    return await getEvents(data)
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

interface IStrategySlice {
  strategies: IStrategy[];
  currentStrategy: IStrategy | null;
  orders: IOrder[];
  events: IEvent[];
  showStart: boolean;
  showDetails: boolean;
}

const initialState: IStrategySlice = {
  strategies: [],
  currentStrategy: null,
  orders: [],
  events: [],
  showStart: false,
  showDetails: false,
};

export const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    setCurrentStrategy: (state, action: PayloadAction<IStrategy>) => {
      state.currentStrategy = action.payload;
    },
    setShowDetails(state, action: PayloadAction<boolean>) {
      state.showDetails = action.payload;
    },
    setShowStart(state, action: PayloadAction<boolean>) {
      state.showStart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStrategies.fulfilled,
        (state, action: PayloadAction<IStrategy[]>) => {
          state.strategies = action.payload;
        }
      )
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<IEvent[]>) => {
          state.events = action.payload;
        }
      );
  },
});
