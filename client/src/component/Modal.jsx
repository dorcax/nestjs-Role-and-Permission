import React from 'react'

const Modal = ({open,title,children,setIsOpen}) => {
  if(!open) return null
  return (
    <section className='fixed inset-0 z-50  flex justify-center items-center  '>
      <div className=' w-[400px] bg-white shadow-xl text-black font-bold opacity none  rounded-md px-4 py-4'>
        <div className='flex justify-between items-center border-b-2'>
          <h2 className='text-lg capitalize font-semibold'>{title}</h2>
          <button className='text-xl text-red-600'onClick={()=>setIsOpen(false)} > &times;</button>
        </div>
        <div className='p-4'>
          {children}
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t p-3">
          <button
            onClick={()=>setIsOpen(false)}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </section>
  )
}

export default Modal