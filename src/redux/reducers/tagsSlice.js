import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: { tags: [], loading: false },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTags, setLoading } = tagsSlice.actions;
export default tagsSlice.reducer;