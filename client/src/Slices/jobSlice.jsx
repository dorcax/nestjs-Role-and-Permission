import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { error } from "console";
import axios from "axios"

const initialState={
    jobs:[],
    loading:false,
    error:null
}
 export const addJob =createAsyncThunk("create/jobs",async(formData,thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = axios.post("http://localhost:3000/create",formData,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        return  thunkAPI.rejectWithValue(errorMessage)
    }
 })
const jobSlice =createSlice({
    name:"job",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addJob.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addJob.fulfilled,(state,action)=>{
            state.loading=false
            state.jobs=action.payload
            state.error =null
        })
        .addCase(addJob.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })
    }
})

export default jobSlice.reducer