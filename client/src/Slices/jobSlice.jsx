import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { error } from "console";
import axios from "axios"
import { toast } from "react-toastify";

const initialState={
    jobs:[],
    loading:false,
    error:null
}
 export const addJob =createAsyncThunk("create/jobs",async(formData,thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = await axios.post("http://localhost:3000/job/create",formData,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("job created")
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
        return  thunkAPI.rejectWithValue(errorMessage)
    }
 })

export const fetchJobs =createAsyncThunk("fetch/jobs",async(_,thunkAPI)=>{
    try {
       const state =thunkAPI.getState()
       const token =state.auth.token
       const res =await axios.get("http://localhost:3000/job/jobs",{
        headers:{
            Authorization:`Bearer ${token}`
        }
       }) 
       return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
        return  thunkAPI.rejectWithValue(errorMessage)
    }
})

// find job with proposals 
export const findJob =createAsyncThunk("job/proposal",async(jobId,thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = await axios.get(`http://localhost:3000/job/proposal/${jobId}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
        return  thunkAPI.rejectWithValue(errorMessage)
    }
 })
//edit job
export const editJob =createAsyncThunk("edit/jobs",async({formData,jobId},thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = await axios.patch(`http://localhost:3000/job/edit/${jobId}`,formData,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("job have been modified")
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
        return  thunkAPI.rejectWithValue(errorMessage)
    }
 })


// assign job to vendor 
export const assignJob =createAsyncThunk("assign/job",async({isAssigned,jobId,vendorId,proposalId},thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = await axios.patch(`http://localhost:3000/job/assignJob/${jobId}/${vendorId}/${proposalId}`,{isAssigned},{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        toast.success(res.data.message)
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
        return  thunkAPI.rejectWithValue(errorMessage)
    }
 })

//  delete job
export const deleteJob =createAsyncThunk("delete/job",async(jobId,thunkAPI)=>{
    try {
        const state =thunkAPI.getState()
        const token =state.auth.token
        const res = await axios.delete(`http://localhost:3000/job/delete/${jobId}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("job deleted")
        return res.data
    } catch (error) {
        let errorMessage =error.response?.data?.message ||error.message
        console.log(errorMessage)
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
            state.jobs=[...state.jobs,action.payload]
            state.error =null
        })
        .addCase(addJob.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })
        // fetch jobs
        .addCase(fetchJobs.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.loading=false
            state.jobs=action.payload
            state.error =null
        })
        .addCase(fetchJobs.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })
        // find job with proposals
        .addCase(findJob.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(findJob.fulfilled,(state,action)=>{
            state.loading=false
            state.jobs=action.payload
            state.error =null
        })
        .addCase(findJob.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })


    .addCase(editJob.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    .addCase(editJob.fulfilled,(state,action)=>{
        state.loading=false
       const  updatedJob= action.payload
        state.jobs=state.jobs.map((jobItem)=>{
            if(jobItem && jobItem.id ===updatedJob.id){
                return updatedJob
            }
            else{
                return jobItem
            }
        })
        state.error =null
    })
    .addCase(editJob.rejected,(state,action)=>{
        state.loading=false
        state.error =action.payload
    })
    //    assign job to vendor
        .addCase(assignJob.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(assignJob.fulfilled,(state,action)=>{
        

            state.loading = false;
  const assignedJob = action.payload;

//   state.jobs = state.jobs.map((job) => {
//     if (job.id === assignedJob.id) {
//       // Assign the job to the specified vendor and update proposals
//       job.assignedVendor = assignedJob.vendorId; // assuming `vendorId` is part of the payload
//       job.isAssigned = true; // Flag to show job is assigned

//       job.proposals = job.proposals.map((proposalItem) =>
//         proposalItem && proposalItem.id === assignedJob.proposal.id
//           ? { ...proposalItem, status: 'Assigned' } // Mark proposal as assigned
//           : proposalItem
//       );
//     }
//     return job;
       
//         })
state.jobs = state.jobs.map((job) =>
    job.id === action.payload.id ? action.payload : job
    )
})
        .addCase(assignJob.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })
        // delete job 
        .addCase(deleteJob.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteJob.fulfilled,(state,action)=>{
            state.loading=false
           const  deleteJob= action.payload
            state.jobs=state.jobs.filter((jobItem)=>jobItem.id !== deleteJob.id)
            state.error =null
        })
        .addCase(deleteJob.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload
        })

    }
})

    

export default jobSlice.reducer