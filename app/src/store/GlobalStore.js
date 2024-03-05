import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../pages/Auth/AuthSlice'
import authWrapperSlice from "../pages/AuthWrapper/AuthWrapperSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        authWrapper: authWrapperSlice,
    }
})

export default store;