import React, { useState } from 'react'
import Modal from "../../component/Modal"
import { useDispatch } from 'react-redux'
import { addJob } from '../../Slices/jobSlice'
const CreateJob = ({isOpen,setIsOpen}) => {
    const dispatch =useDispatch()
    const[formData,setFormData] =useState({
        title:"",description:"",price:""
    })
    const[formErrors,setFormError]=useState({})
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || "" : value
        }));
    };
    


    const handleSubmission =(e)=>{
        e.preventDefault()
        setFormError(validateForm)
        if(Object.keys(validateForm)){
            dispatch(addJob(formData))
            setFormData({
                title:"",
                description:"",
                price:""
            })
            // setIsOpen(false)
        }
        

    }
const validateForm =(data)=>{
    let error={}
  if(!data.title){
    error.title="title must be provided"
  }
  if(!data.description){
    error.description="description must be provided "
  }
  if(!data.price){
    error.price="price must be provided "
  }
  return error
}
  return (
          <Modal open={isOpen} setIsOpen={setIsOpen}  title="create new job">
          <form action="" method="post"  onSubmit={handleSubmission}>
            <div className='my-5'>
                <input type="text" name="title" id="" placeholder='enter job title' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3 ' value={formData.title} onChange={handleChange}/>
                {formErrors.title && (
            <div className="text-red-600 text-sm">{formErrors.title}</div>
          )}
            </div>
            <div className='my-5'>
                <input type="text" name="description" id="" placeholder='enter job description' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3'  value={formData.description} onChange={handleChange}/>
                {formErrors.description && (
            <div className="text-red-600 text-sm">{formErrors.description}</div>
          )}
            </div>
            <div className='my-4'>
                <input type="number" name="price" id="" placeholder='enter the job price ' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3'  value={formData.price} onChange={handleChange}/>
                {formErrors.price && (
            <div className="text-red-600 text-sm">{formErrors.price}</div>
          )}
            </div>
            <button type="submit" className='bg-blue-800 py-1 px-3 rounded-lg text-white capitalize'>create job</button>
          </form>
          </Modal>
  )
}

export default CreateJob