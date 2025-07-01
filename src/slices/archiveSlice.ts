import { IError, IStrategy } from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArchiveStrategies } from '../services/archiveService.ts';

export const fetchArchiveStrategies = createAsyncThunk(
  'archive/fetchArchiveStrategies',
  async (_, { rejectWithValue }) => {
    return await getArchiveStrategies()
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

interface IArchiveSlice {
  strategies: IStrategy[];
}

const initialState: IArchiveSlice = {
  strategies: [],
};

export const archiveSlice = createSlice({
  name: 'archive',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchArchiveStrategies.fulfilled,
      (state, action: PayloadAction<IStrategy[]>) => {
        state.strategies = action.payload;
      }
    );
  },
});
