import { IError, IUser } from '../utils/types.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteChatId,
  getUser,
  login,
  logout,
  setChatId,
} from '../services/userService.ts';

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
    return await getUser().then((res) => res);
  }
);

export const fetchSetChatId = createAsyncThunk<null, string>(
  'user/fetchSetChatId',
  async (data, { rejectWithValue }) => {
    return await setChatId({ chatId: data })
      .then((res) => res)
      .catch((err) => rejectWithValue((err as IError).message));
  }
);

export const fetchDeleteChatId = createAsyncThunk(
  'user/fetchDeleteChatId',
  async () => {
    return await deleteChatId().then((res) => res);
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
    chatId: '',
    profit: 0,
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
      })
      .addCase(fetchSetChatId.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchSetChatId.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteChatId.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchDeleteChatId.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});
