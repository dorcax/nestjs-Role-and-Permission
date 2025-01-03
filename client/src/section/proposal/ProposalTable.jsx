
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveProposal, fetchProposals } from '../../Slices/proposalSlice';
import ProposalView from './ProposalView';

const ProposalTable = () => {
  const dispatch = useDispatch();
  const { proposals, loading } = useSelector((state) => state.proposal);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const handleChange = (proposalItem) => {
    setSelectedProposal(proposalItem);
    setIsOpen(true);
  };

  const handleApproval = (status, vendorId, proposalId) => {
    const isApproved = status === "approve";
    dispatch(approveProposal({ vendorId: vendorId, proposalId: proposalId, isApproved }));
    // console.log("Updated Proposals:", proposals);
    console.log("Updated Proposals:",dispatch(approveProposal({ vendorId, proposalId, isApproved })) );
    setStatus("");
  };



  const handleApprovalChange = (e, vendorId, proposalId) => {
    const status = e.target.value;
    setStatus(status);
    handleApproval(status, vendorId, proposalId);
  };
  

  return (
    <div>
      <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className='whitespace-nowrap'>
          <tr className="text-gray-900 text-left">
            <th className="px-3 py-4 capitalize tracking-wider">Description</th>
            <th className="px-3 py-4 capitalize tracking-wider">Price</th>
            <th className="px-3 py-4 capitalize tracking-wider">Is Approved</th>
            <th className="px-3 py-4 capitalize tracking-wider">Job</th>
            <th className="px-3 py-4 capitalize tracking-wider">Vendor Details</th>
            <th className="px-3 py-4 capitalize tracking-wider">Assigned</th>
          </tr>
        </thead>
        <tbody className='whitespace-nowrap'>
          {proposals && proposals.length > 0 ? (
            proposals.map((proposalItem) => {
            
              return (
                <tr className="border-b-2 hover:bg-gray-100 transition-all text-sm" key={proposalItem.id}>
                  <td className="px-3 py-4 text-gray-700">
                    {proposalItem.description && proposalItem.description.length > 50
                      ? `${proposalItem.description.substring(0, 40)}....`
                      : proposalItem.description}
                  </td>
                  <td className="px-3 py-4 text-gray-700">{proposalItem.price}</td>
                  <td className="px-3 py-4 text-gray-700 capitalize">{proposalItem.isApproved ? 'approved' : 'not approved'}</td>
                   <td className="px-3 py-4 text-gray-700">{proposalItem.job.title}</td>
                  <td className="px-3 py-4 text-gray-700">{proposalItem.vendor.businessName}</td> 
                  <td className="px-3 py-4 text-gray-700">
                    <button
                      className="border-2 bg-blue-800 rounded-md w-[60px] py-2 text-white"
                      onClick={() => handleChange(proposalItem)}
                    >
                      View
                    </button>
                  </td>

                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      {isOpen && (
        <ProposalView
          open={isOpen}
          setIsOpen={setIsOpen}
          selectedProposal={selectedProposal}
        />
      )}
    </div>
  );
};

export default ProposalTable;
