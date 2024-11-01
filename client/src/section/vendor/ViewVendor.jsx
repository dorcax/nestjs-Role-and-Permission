import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
// import { fetchVendor } from '../../Slices/vendorSlice'
import { useParams } from 'react-router-dom'
import Modal from '../../component/Modal'
const ViewVendor = ({open,setIsOpen,selectedVendor}) => {
    // const dispatch =useDispatch()
    // const {vendor} =useSelector((state)=>state.vendor)
    // const{vendorId} =useParams()
    // useEffect(()=>{
    //   dispatch(fetchVendor(selectedVendor))
    // },[dispatch]) 

    // const[isOpen,setIsOpen] =useState(false)
  return (
    <div>   
      <Modal title="vendor details loading" open={open}  setIsOpen={setIsOpen}>
      <h2>vendor details</h2>
    <div>
                <p>BusinessName:{selectedVendor.businessName}</p>
                <p>Description:{selectedVendor.description}</p>
                <p>BusinessAddress:{selectedVendor.businessAddress}</p>
                <p>isApproved:{selectedVendor.isApproved?"yes":"No"}</p>

            </div>
            
    
       
       {/* <h2>hello</h2> */}

    
      </Modal>
    </div>
  )
}

export default ViewVendor