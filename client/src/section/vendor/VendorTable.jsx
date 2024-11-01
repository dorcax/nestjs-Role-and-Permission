import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import{Link } from"react-router-dom"
import ViewVendor from './ViewVendor';
import { approveVendor } from '../../Slices/vendorSlice';
const VendorTable = () => {
    const { loading, error, vendor } = useSelector((state) => state.vendor);
    const [isOpen,setIsOpen] =useState(false)
    const [selectedVendor,setSelectedVendor] =useState(null)
    const [selectStatus,setSelectStatus] =useState("")

    const dispatch=useDispatch()


    const handleChange=(id)=>{
      setSelectedVendor(id)
      setIsOpen(true)

    }


    const handleApproval =(id,status)=>{
      let isApproved;
      if(status ==="approve" ){
        isApproved=true
        dispatch(approveVendor({vendorId:id,isApproved}))
      } 
      else if(status==="reject"){
        isApproved=false
        dispatch(approveVendor({vendorId:id,isApproved}))
      }
      
      setSelectStatus("")

    }

     const handleApprovalSubmission =(e,id)=>{
      console.log("Vendor ID:", id); 
      const status =e.target.value
      setSelectStatus(status)
      handleApproval(id,status)
     }
  return (
    <div>
    <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden ">
            <tr className=" text-gray-900 text-left ">
              {/* <th className='px-6 py-6 font-medium uppercase tracking-wider'>id</th> */}

              <th className="px-3 py-4  capitalize tracking-wider">
                businessName
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                description
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                businessAddress
              </th>
              <th className="px-3 py-4 capitalize tracking-wider">
                isApproved
              </th>
            </tr>

            <tbody>
             {vendor &&
                vendor.map((vendorItem) => (
                  <tr
                    className="border-b-2 hover:bg-gray-100 transition-all text-sm"
                    key={vendorItem.id}
                  >
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.businessName}
                    </td>
                    <td className="px-3 py-4 text-gray-700 ">
                      {/* {vendorItem.description >40 ?`{vendorItem.description.substring(0,40)}....`:vendorItem.description} */}
                      {vendorItem.description.length > 40
                        ? `${vendorItem.description.substring(0, 40)}...`
                        : vendorItem.description}
                    </td>
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.businessAddress}
                    </td>
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.isApproved ? 'Yes' : 'No'}
                    </td>
                    <td>
                    <button className=' px-4 py-2 rounded-md capitalize bg-blue-800 text-white hover:bg-blue-600 transition-all' onClick={()=>handleChange(vendorItem)}>view</button>
                    
                    
                    </td>
                   
                  

                 
                 {vendorItem.isApproved===false && ( <td>
                    <select name="" id="" className='border-2 px-3 py-2 outline-none rounded-lg' value={selectStatus} onChange={(e)=>handleApprovalSubmission(e,vendorItem.id)}>
                      <option>
                        status
                      </option>
                      <option value="approve">approve</option>
                      <option value="reject">reject</option>
                    </select>
                  </td>)}
                    <td className="px-1 py-4 text-blue-800">
                      <i class="fa-solid fa-pen"></i>
                    </td>
                    <td className="px-1 py-4 text-red-700">
                      <i class="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))}



            </tbody>
          </table>

          {isOpen && (<ViewVendor open ={isOpen} setIsOpen={setIsOpen} selectedVendor={selectedVendor}/>)}
          </div>
  )
}

export default VendorTable