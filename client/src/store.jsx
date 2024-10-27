import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./Slices/apiSliced";
import authReducer from "./Slices/authSlice"

export const store =configureStore({
    reducer:{
        auth:authReducer
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware)
})
