import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosBaseUrl } from '../../config/axios-configuration';

const axios = axiosBaseUrl();

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export interface AuthState {
  error: string;
  loading: boolean;
  message: string;
  success: boolean;
  token: string;
  user: any;
}

interface ErrorResponse {
  message: string;
}

export const SignUp:any = createAsyncThunk(
  'auth/signUp',
  async (data: SignUpData, { rejectWithValue }) => {
  try {
    const { name, email, password } = data;
    const response = await axios.post('/auth/sign-up', { name, email, password });
    return response.data;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err as AxiosError));
  }
});

export const SignIn: any = createAsyncThunk(
  'auth/signIn',
  async (data: SignInData, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const response = await axios.post('/auth/sign-in', { email, password });
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err as AxiosError));
    }
  }
);

const getErrorMessage = (err: AxiosError) => {
  if (err.response && err.response.data) {
    const responseData = err.response.data as ErrorResponse;
    return { err: { message: responseData.message, status: err.response.status } };
  } else {
    return { err: { message: 'Network Error', status: 502 } };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: '',
    loading: false,
    message: '',
    success: false,
    token: '',
    user: {}
  } as AuthState,
  reducers: {
    SetAuthState(state, { payload }: PayloadAction<{ field: keyof AuthState; value: any }>) {
      const { field, value } = payload;
      state[field] = value as never;
    },
    logOut: () => ({
      error: '',
      loading: false,
      message: '',
      success: false,
      token: '',
      user: {}
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload?.message;
      state.token = action.payload?.accessToken;
      state.user = action.payload?.user;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = action?.payload?.err?.message || '';
    });
    builder.addCase(SignIn.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload?.message;
      state.token = action.payload?.accessToken || '';
      state.user = action.payload?.user || {};
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      state.error = action?.payload?.err?.message || '';
      state.loading = false;
      state.success = true;
    });
  },
});

const { reducer, actions } = authSlice;

export const { SetAuthState, logOut } = actions;

export default reducer;
