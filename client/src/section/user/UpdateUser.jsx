import {React,useEffect,useState} from 'react'
import Modal from "../../component/Modal"
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { updateUser,fetchUsers } from '../../Slices/userSlice'
const UpdateUser = ({open,setIsOpen,selectedUser}) => {
    const[formData,setFormData] =useState({
        name:"",email:"",
        role:""
    })
    const [formErrors, setFormError] = useState({});
    const dispatch =useDispatch()

    useEffect(()=>{
        if(selectedUser){
            setFormData({
                name:selectedUser.name,
                email:selectedUser.email,
                role:selectedUser.role
            })
        }
    },[selectedUser])

const handleFormChange=(e)=>{
    const{name,value} =e.target
    setFormData((prev)=>({
...prev,
[name]:value
    }))
}

// handle update submission 
const handleSubmission =(e)=>{
    e.preventDefault()
    const validate =validateForm(formData)
    setFormError(validate)
    if(Object.keys(validate)){
     dispatch(updateUser({formData,id:selectedUser.id}))
     .then(() => {
      // Optionally refetch users here or handle state in another way
      dispatch(fetchUsers());
      setIsOpen(false);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
    }
}


const validateForm =()=>{
let error={};
if(!formData.name){
  error.name ="please enter a valid name "
}
if(!formData.email){
  error.email ="please enter a valid email"
}
if(!formData.role){
  error.role ="please entor vain"
}
return error;

}

  return (
    <div>
        <Modal open={open} setIsOpen={setIsOpen} title="edit profile">
        <form
        action=""
        method="post"
        className="   flex flex-col justify-center items-start"
        onSubmit={handleSubmission}
      >
        
        
        <div className="flex flex-col font-normal ">
        <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            id=""
            placeholder="name"
            className={clsx("border-2  border-gray-600 w-[250px] outline-none rounded-lg px-2 py-1 ",formErrors.name?"my-5":"my-3")}
          />
          {formErrors.name && (
            <div className="text-red-800 text-md">{formErrors.name}</div>
          )}
        </div>
        <div className='flex flex-col font-normal'>
            <label htmlFor="">email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            id=""
            placeholder="email"
            className={clsx("border-2 border-gray-600  w-[250px] outline-none rounded-lg px-2 py-1 focus:bg-white",formErrors.password?"my-5":"my-3")}
          />
          {formErrors.email && (
            <div className="text-red-800 text-md">{formErrors.email}</div>
          )}
        </div>
        <div className='flex flex-col font-normal'>
            <label htmlFor="">Role</label>
          <input
            type="text"
            name="text"
            value={formData.role}
            onChange={handleFormChange}
            id=""
            placeholder=""
            className="border-2 border-gray-600  rounded-lg px-2 py-1 my-2 w-[250px] outline-none"
          />
          {formErrors.password && (
            <div className="text-red-800 text-md pb-3">
              {formErrors.password}
            </div>
          )}
        </div>
        <button
          className=
            ' w-[200px] text-center py-1 uppercase text-sm rounded-md bg-blue-800 text-white' 
          
        //   disabled={loading}
        >
        save changes
        </button>

        
      </form>
        </Modal>
    </div>
  )
}

export default UpdateUser