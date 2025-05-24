import {IError, IUser} from "../utils/types.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {request} from "../services/request.ts";

interface ILoginRequest {
  phone: string;
  token: string;
}

export const fetchLogin = createAsyncThunk<IUser, ILoginRequest>(
    "user/fetchLogin",
    async (data, {rejectWithValue}) => {
      try {
        return await request("/user/login", {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify({phone: data.phone, token: data.token})
        });
      } catch (error) {
        return rejectWithValue((error as IError).message);
      }
    }
);

export const fetchLogout = createAsyncThunk<IUser>(
    "user/fetchLogout",
    async (_, {rejectWithValue}) => {
        try {
            return await request("/user/logout");
        } catch (error) {
            return rejectWithValue((error as IError).message);
        }
    }
);

export const fetchCheck = createAsyncThunk<IUser>(
    'user/fetchCheck',
    async (_, {rejectWithValue}) => {
      try {
        return await request("/user/check", {credentials: "include"});
      } catch (error) {
        return rejectWithValue((error as IError).message);
      }
    }
)

interface IUserSlice {
  user: IUser;
  isLoggedIn: boolean;
  error: string;
}

const initialState: IUserSlice = {
  user: {
    phone: ''
  },
  isLoggedIn: false,
  error: ''
}

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
        .addCase(fetchLogin.fulfilled, (state, action:PayloadAction<IUser>) => {
            state.isLoggedIn = true;
            state.error = '';
            state.user = action.payload;
        })
        .addCase(fetchLogin.rejected, (state,
                                       action) => {
            state.isLoggedIn = false;
            state.error = action.payload as string;
            state.user = initialState.user;
        })
        .addCase(fetchLogout.pending, (state) => {
          state.isLoggedIn = false;
          state.error = '';
          state.user = initialState.user;
        })
        .addCase(fetchCheck.fulfilled, (state, action:PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isLoggedIn = true;
        })
        .addCase(fetchCheck.rejected, (state) => {
          state.isLoggedIn = false;
        })
  },
})