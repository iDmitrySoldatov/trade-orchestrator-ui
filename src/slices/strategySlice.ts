import {
  IError,
  IEvent,
  IOrder,
  IStartStrategy,
  IStrategy,
} from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getEvents,
  getOrders,
  getStrategies,
  startStrategy,
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

export const fetchStartStrategy = createAsyncThunk<string, IStartStrategy>(
  'strategy/fetchStartStrategy',
  async (data, { rejectWithValue }) => {
    return await startStrategy(data)
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
  isStarting: boolean;
  error: string | unknown;
}

const initialState: IStrategySlice = {
  strategies: [],
  currentStrategy: null,
  orders: [],
  events: [],
  showStart: false,
  showDetails: false,
  isStarting: false,
  error: '',
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
    resetError(state) {
      state.error = '';
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
      )
      .addCase(fetchStartStrategy.pending, (state) => {
        state.error = '';
        state.isStarting = true;
      })
      .addCase(
        fetchStartStrategy.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.isStarting = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchStartStrategy.fulfilled, (state) => {
        state.isStarting = false;
        state.showStart = false;
      });
  },
});
