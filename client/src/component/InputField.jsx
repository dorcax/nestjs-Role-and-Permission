import React from 'react'

const InputField = ({type,name,value,placeholder,handleChange,errorname}) => {
  return (
    <div className='my-5'>
        <input type={type} name={name} value={value} placeholder={placeholder} className="border-2 w-[300px] rounded-lg outline-none px-3 text-sm py-3" onChange={handleChange} id="" />
        {errorname&& <div className="text-red-600 text-sm">{errorname}</div>}
    </div>
  )
}

export default InputField