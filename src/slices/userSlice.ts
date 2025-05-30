import { IError, IUser } from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { check, login, logout } from '../services/userService.ts';

interface ILoginRequest {
  phone: string;
  token: string;
}

export const fetchLogin = createAsyncThunk<IUser, ILoginRequest>(
  'user/fetchLogin',
  async (data, { rejectWithValue }) => {
    return await login(data)
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

export const fetchLogout = createAsyncThunk<IUser>(
  'user/fetchLogout',
  async (_, { rejectWithValue }) => {
    return await logout()
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const fetchCheck = createAsyncThunk<IUser>(
  'user/fetchCheck',
  async () => {
    return await check().then((res) => res);
  }
);

interface IUserSlice {
  user: IUser;
  isLoggedIn: boolean;
  error: string;
}

const initialState: IUserSlice = {
  user: {
    phone: '',
  },
  isLoggedIn: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoggedIn = false;
        state.error = '';
        state.user = initialState.user;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoggedIn = true;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload as string;
        state.user = initialState.user;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoggedIn = false;
        state.error = '';
        state.user = initialState.user;
      })
      .addCase(fetchCheck.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCheck.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});
