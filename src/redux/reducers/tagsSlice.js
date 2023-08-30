import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTags = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue },getState) => {
  const { access_token } = getState().auth.credentials;
  try {
    const response = await axios.post('https://databoard-service.onrender.com/tags/fetch_all', credentials, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const tagsSlice = createSlice({
  name: "fetch_tags",
  initialState: {
    tags: [],
    loading: false,
    error: null,
    credentials: null, 
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
        state.error = null;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.tags = [];
        state.error = action.payload.detail && action.payload.detail.message;
      });
  },
});

export const { logoutUser } = tagsSlice.actions;
export default tagsSlice.reducer;