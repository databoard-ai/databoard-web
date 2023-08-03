import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://databoard-service.onrender.com/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    credentials: null, 
  },
  reducers: {
    logOutUser: (state) => {
      state.user = null;
    },
    saveCredentials: (state, action) => {
      state.credentials = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.detail && action.payload.detail.message;
      });
  },
});
export const saveUserCredentials = (credentials) => {
  return (dispatch) => {
    dispatch(saveCredentials(credentials));
  };
};
export const { logOutUser } = loginSlice.actions;
export default loginSlice.reducer;