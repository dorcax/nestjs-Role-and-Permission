import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios"

import { toast } from 'react-toastify'

// a slice is where we keep a pieces of state ,reducer in action

// auth slice deals with local stuff it take  the user data that will get back from the api and put it in localstorage
// const initialState = {
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
//   token: localStorage.getItem('token')
//     ? JSON.parse(localStorage.getItem('token'))
//     : null,
//   isAuthenticated: false,
//   error: null,
//   loading: false,
// };

const initialState={
  userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("token")) :null,
  token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
  isAuthenticated: false,
  error: null,
  loading: false,
};



export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData,thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/register',
        userData,
        {
          headers: {
            'content-Type': 'application/json',
          },
        },
      );
      console.log(response)
      toast.success(response.data.message)
      return response.data;
    } catch (error) {

      const errorMessage = error.response?.data?.message || error.message;
    
      toast.error(errorMessage);
      return thunkApi.rejectWithValue(errorMessage); // Use rejectWithValue to handle errors
    }
  },
); 


// login user api 
export const loginUser =createAsyncThunk("auth/login",
  async(formData,thunkApi)=>{
try {
  const res =await axios.post("http://localhost:3000/auth/login",formData,{
    headers:{
      "content-Type":"application/json"
    }
  })
  console.log(res.data)
  toast.success(res.data.message)
  localStorage.setItem("token",JSON.stringify(res.data.token))
   return res.data
} catch (error) {
  const errorMessage = error.response?.data?.message || error.message;
    
  toast.error(errorMessage);
  return thunkApi.rejectWithValue(errorMessage);
}
})



const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('token', JSON.stringify(action.payload));
      state.isAuthenticated = false;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
  },
  extraReducers: (builder) => {
    builder
      // register endpoint
      .addCase(registerUser.pending, (state) => {
        state.loading = true, 
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isAuthenticated = false;
        state.token = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        // localStorage.setItem('token', JSON.stringify(action.payload.token));
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // for login api
      .addCase(loginUser.pending,(state)=>{
        state.loading=true,
        state.error=null

      })
      .addCase(loginUser.fulfilled,(state,action)=>{

        state.userInfo=action.payload.user
        state.token =action.payload.token
        state.isAuthenticated=true
        state.loading=false
        localStorage.setItem("token",JSON.stringify(action.payload.token))
        localStorage.setItem("userInfo",JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  },
});
export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
