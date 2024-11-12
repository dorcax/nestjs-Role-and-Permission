import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findJob } from '../../Slices/jobSlice';
import { useParams } from 'react-router-dom';
import { approveProposal, fetchProposal } from '../../Slices/proposalSlice';

const ViewJobProposals = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { jobs } = useSelector((state) => state.job);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (jobId) {
      dispatch(findJob(jobId));
    }
  }, [dispatch, jobId]);


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
    <div className="overflow-auto mt-6">
        {/* {selectedJob && (
        <h2 className="text-2xl font-bold mb-4">Proposals for:</h2>
      )} */}
      {/* <h2 className="text-2xl font-bold mb-4">Proposals for:{selectedJob?.title} </h2> */}
      <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-900 text-left">
            <th className="px-3 py-4 capitalize tracking-wider">
              proposal Title
            </th>
            <th className="px-3 py-4 capitalize tracking-wider">Description</th>
            <th className="px-3 py-4 capitalize tracking-wider">Price</th>
           
            <th className="px-3 py-4 capitalize tracking-wider">isAssigned</th>
          </tr>
        </thead>
        <tbody>
          {jobs.proposal &&
            jobs.proposal.map((proposalItem) => (
              <tr key={proposalItem.id} className='border-b-2 hover:bg-gray-100 transition-all text-sm"'>
                {/* <td className="px-3 py-4">{proposalItem.title}</td> */}
                <td className="px-3 py-4">{proposalItem.description}</td>
                <td className="px-3 py-4">{proposalItem.price}</td>
                <td className="px-3 py-4">
                  {proposalItem.isApproved ? 'Approved' : 'Not Approved'}
                </td>
                <td>
                    <select className='border2 px-3 py-2 outline-none rounded-lg' value={status} onChange={(e) => handleApprovalChange(e, proposalItem.vendor.id, proposalItem.id)}>
                      <option>Status</option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewJobProposals;
