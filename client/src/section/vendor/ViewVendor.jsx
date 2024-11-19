import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchVendor } from '../../Slices/vendorSlice'
import { useParams } from 'react-router-dom';
import Modal from '../../component/Modal';
const ViewVendor = ({ open, setIsOpen, selectedVendor }) => {
  return (
    <div>
      <Modal title="vendor details " open={open} setIsOpen={setIsOpen}>
        <div className="py-5 px-2 space-y-4">
          <div className="flex ">
            <span className="text-md font-semibold  text-gray-700 px-2">
              BusinessName:
            </span>
            <span className="text-gray-800 font-normal">
              {selectedVendor?.businessName}
            </span>
          </div>
          <div className="flex">
            <span className="text-md font-semibold  text-gray-700 px-2">
              Description:
            </span>
            <span className=" font-normal">{selectedVendor?.description}</span>
          </div>
          <div className="flex ">
            <span className="text-md font-semibold text-gray-700 px-2">
              BusinessAddress:
            </span>
            <span className="text-gray-800 font-normal">
              {selectedVendor?.businessAddress}
            </span>
          </div>

          <div className="flex">
            <span className="text-md font-semibold  text-gray-700 px-2 ">
              Status:
            </span>
            <span
              className={` font-normal ${selectedVendor?.isApproved ? 'text-blue-600' : 'text-red-500'}`}
            >
              {selectedVendor?.isApproved ? 'Approved' : 'Not Approved'}
            </span>
          </div>
        </div>
       
      </Modal>
    </div>
  );
};

export default ViewVendor;
