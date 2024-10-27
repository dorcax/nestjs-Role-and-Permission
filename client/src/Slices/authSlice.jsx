import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInfo } from "os";
import { act } from "react";

// a slice is where we keep a pieces of state ,reducer in action

// auth slice deals with local stuff it take  the user data that will get back from the api and put it in localstorage
const initialState ={
    userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    isAuthenticated:false,
    error:null,
    loading:false

}


export const  registerUser =createAsyncThunk("user/register",async()=>{
    const response =await axios.post("http://localhost:3000/user/register")
    return response.user
})
const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.userInfo=null
            localStorage.removeItem("token",JSON.stringify(action.payload))
            state.isAuthenticated=false


        }
    },
    extraReducers:(builder) =>{
        builder
        // register endpoint
        .addCase(registerUser.pending,(state)=>{
            state.loading=true,
            state.error=null
            
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.userInfo =action.payload.user
            state.isAuthenticated =true
            state.token =action.payload.token
            localStorage.setItem("token",state.payload.token)
            state.loading=true
        })
        .addCase(registerUser.rejected,(state)=>{
            state.loading=false
            state.error =action.payload
        })

    }
    // setCredentials:(state,action)=>{
    //     state.userInfo =action.payload
    //     localStorage.setItem("token",Json.stringify(action.payload))
    // },

    // // logout:clear userInfo 
    // logout:(state,actiom)=>{
    //     state.userInfo =null
    //     state.token =null
    //     localStorage.removeItem("userInfo")
    // }
    

    
})
export default authSlice.reducer
export const{setCredentials,logout}=authSlice.actions
