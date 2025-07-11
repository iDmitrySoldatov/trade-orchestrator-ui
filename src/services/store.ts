import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice.ts';
import { instrumentSlice } from '../slices/instrumentSlice.ts';
import { enumSlice } from '../slices/enumSlice.ts';
import { backTestsSlice } from '../slices/backTestsSlice.ts';
import { strategySlice } from '../slices/strategySlice.ts';
import { archiveSlice } from '../slices/archiveSlice.ts';

const rootReducer = combineSlices(
  userSlice,
  instrumentSlice,
  enumSlice,
  backTestsSlice,
  strategySlice,
  archiveSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
