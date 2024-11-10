import React, { useState } from 'react'
import Modal from "../../component/Modal"
const CreateJob = ({isOpen,setIsOpen}) => {
    const[formData,setFormData] =useState({
        title:" ",description:" ",price:" "
    })
  return (
          <Modal open={isOpen} setIsOpen={setIsOpen}  title="create new job">
          <form action="" method="post">
            <div className='my-5'>
                <input type="text" name="" id="" placeholder='enter job title' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3 '/>
            </div>
            <div className='my-5'>
                <input type="text" name="" id="" placeholder='enter job description' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3' />
            </div>
            <div className='my-4'>
                <input type="number" name="" id="" placeholder='enter the job price ' className='border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3' />
            </div>
            <button type="submit" className='bg-blue-800 py-1 px-3 rounded-lg text-white capitalize'>create job</button>
          </form>
          </Modal>
  )
}

export default CreateJob