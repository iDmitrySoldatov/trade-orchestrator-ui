import {combineSlices, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../slices/userSlice.ts";
import {instrumentSlice} from "../slices/instrumentSlice.ts";


const rootReducer = combineSlices(
    userSlice,
    instrumentSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;