import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState={
    users:[],
    loading:false,
    error:null
}

// api to get all users
export const fetchUsers =createAsyncThunk("fetch/users",async(searchTerm,thunkAPI)=>{
    const state =thunkAPI.getState()
    const token =state.auth.token
    // const queryParams = new URLSearchParams() 
    // if(searchTerm){
    //     queryParams.append("searchTerm",searchTerm)
    // }

    const url =searchTerm?`http://localhost:300/user/allusers?searchTerm=${searchTerm}`:"http://localhost:3000/user/allusers/"
    try {
        const res =await axios.get(url,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        return thunkAPI.rejectWithValue(errorMessage)
    }


})

// update user 
export const updateUser =createAsyncThunk("update/user",async({formData,id},thunkAPI)=>{
    const state =thunkAPI.getState()
    const token =state.auth.token
    try {
        const res =await axios.patch(`http://localhost:3000/user/${id}`,formData,{
            headers:{
                "content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }}
        )
        toast.success("user profile updated")
        return res.data
    } catch (error) {
        let errorMessage =error.res?.data?.message ||error.message
        return thunkAPI.rejectWithValue(errorMessage)


    }
})
// delete user 
export const deleteUser =createAsyncThunk("delete/user",async(id,thunkAPI)=>{
    const state =thunkAPI.getState()
    const token =state.auth.token
    try {
        const res =await axios.delete(`http://localhost:3000/user/${id}`,{
            headers:{
                "content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }}
        )
        toast.success("user deleted successfull")
        return res.data
    } catch (error) {
        let errorMessage =error.res?.data?.message ||error.message
        return thunkAPI.rejectWithValue(errorMessage)


    }
})
const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users =action.payload
            state.error =null
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        // update user 
        .addCase(updateUser.pending,(state)=>{
            state.error =null
            state.loading=true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false
            let updatedUser =action.payload
            state.users =state.users.map((userItem)=>{
                userItem.id ===updatedUser.id ?updatedUser :userItem
            })
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        // delete user
        .addCase(deleteUser.pending,(state)=>{
            state.error =null
            state.loading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false
            let deleteUser =action.payload
            state.users =state.users.filter((userItem)=>{
                userItem.id !==deleteUser
            })
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default userSlice.reducer