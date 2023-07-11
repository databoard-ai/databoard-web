import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user:null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
          },
          logoutUser: (state) => {
            state.user = null;
          },
    }
});

export const { setUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;