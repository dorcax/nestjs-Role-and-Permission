import React from 'react'
import Modal from '../../component/Modal'

const ViewJob = ({isOpen,setIsOpen,selectedJob}) => {
  return (
    <Modal open={isOpen} setIsOpen={setIsOpen} title="job details">
<div className="py-5 px-2 space-y-4">
        <div className="flex ">
          <span className="text-md font-semibold  text-gray-700 px-2">Title:</span>
          <span className="text-gray-800 font-normal">{selectedJob?.title}</span>
        </div>

        <div className="flex ">
          <span className="text-md font-semibold text-gray-700 px-2">Description:</span>
          <span className="text-gray-800 font-normal">{selectedJob?.description }</span>
        </div>

        <div className="flex">
          <span className="text-md font-semibold  text-gray-700 px-2">Price:</span>
          <span className="text-blue-600 font-normal">${selectedJob?.price}</span>
        </div>

        <div className="flex">
          <span className="text-md font-semibold  text-gray-700 px-2 ">Status:</span>
          <span className={` font-normal ${selectedJob?.isApproved ? 'text-blue-600' : 'text-red-500'}`}>
            {selectedJob?.isApproved ? 'Approved' : 'Not Approved'}
          </span>
        </div>

        <div className="flex ">
          <span className="text-md font-semibold  text-gray-700 px-2">created By:</span>
          <span className="text-gray-800 font-normal">{selectedJob?.createdBy?.name }</span>
        </div>

        {/* <div className="flex ">
          <span className="text-md font-semibold text-gray-700 px-2">Assigned Job To:</span>
          <span className="text-gray-800 font-normal">{selectedJob?.assigned.vendor?.businessName }</span>
        </div> */}
      </div>
    </Modal>

  )
}

export default ViewJob