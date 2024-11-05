
import React from 'react';
import Modal from '../../component/Modal';

const ProposalView = ({ open, setIsOpen, selectedProposal }) => {
  return (
    <Modal open={open} setIsOpen={setIsOpen} title="Proposal Details">
      <div className="py-5 px-2 space-y-4">
        <div className="flex ">
          <span className="text-md font-semibold  text-gray-700 px-2">Title:</span>
          <span className="text-gray-800 font-normal">{selectedProposal?.job?.title}</span>
        </div>

        <div className="flex ">
          <span className="text-md font-semibold text-gray-700 px-2">Description:</span>
          <span className="text-gray-800 font-normal">{selectedProposal?.description }</span>
        </div>

        <div className="flex">
          <span className="text-md font-semibold  text-gray-700 px-2">Price:</span>
          <span className="text-blue-600 font-normal">${selectedProposal?.price}</span>
        </div>

        <div className="flex">
          <span className="text-md font-semibold  text-gray-700 px-2 ">Status:</span>
          <span className={` font-normal ${selectedProposal?.isApproved ? 'text-blue-600' : 'text-red-500'}`}>
            {selectedProposal?.isApproved ? 'Approved' : 'Not Approved'}
          </span>
        </div>

        <div className="flex ">
          <span className="text-md font-semibold  text-gray-700 px-2">Business Name:</span>
          <span className="text-gray-800 font-normal">{selectedProposal?.vendor?.businessName }</span>
        </div>

        <div className="flex ">
          <span className="text-md font-semibold text-gray-700 px-2">Business Address:</span>
          <span className="text-gray-800 font-normal">{selectedProposal?.vendor?.businessAddress }</span>
        </div>
      </div>
    </Modal>
  );
};

export default ProposalView;
