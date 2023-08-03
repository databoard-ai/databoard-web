import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'

configureStore(
    {
        auth:authSlice.reducer,

    }
)
