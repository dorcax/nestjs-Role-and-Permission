import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./Slices/apiSliced";
import  {createLogger} from "redux-logger"
import authReducer from "./Slices/authSlice"
import vendorReducer from "./Slices/vendorSlice"

const logger =createLogger()
 const store =configureStore({
    reducer:{
        auth:authReducer,
        vendor:vendorReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})
export default store