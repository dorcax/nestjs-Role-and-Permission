
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findJob } from '../../Slices/jobSlice';
import { useParams } from 'react-router-dom';
import { approveProposal } from '../../Slices/proposalSlice';
import { fetchProposal } from '../../Slices/proposalSlice';

const ViewJobProposals = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { proposals } = useSelector((state) => state.proposal);
  const {jobs} =useSelector((state)=>state.job)
  const job = jobs.find((job) => job.id === jobId);
     
  useEffect(() => {
    dispatch(findJob(jobId)); 
    dispatch(fetchProposal(jobId)); 
  }, [dispatch]);

  const handleApproval = (status, vendorId, proposalId) => {
    const isApproved = status === "approve";
    dispatch(approveProposal({ vendorId, proposalId, isApproved }));
  };
  console.log('Job details:', jobs)

  return (
    <div className="overflow-auto mt-6">
         <h2 className="text-2xl font-semibold mb-4 capitalize text-blue-800 text-center"> {job.title}</h2>
         {proposals.length > 0 ?   <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-900 text-left">
            <th className="px-3 py-4 capitalize tracking-wider">Proposal Title</th>
            <th className="px-3 py-4 capitalize tracking-wider">Description</th>
            <th className="px-3 py-4 capitalize tracking-wider">Price</th>
            <th className="px-3 py-4 capitalize tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(proposals) &&proposals.length > 0 && proposals.map((proposalItem) => (
            <tr key={proposalItem.id} className="border-b-2 hover:bg-gray-100 transition-all text-sm">
              <td className="px-3 py-4">{proposalItem.description}</td>
              <td className="px-3 py-4">{proposalItem.price}</td>
              <td className="px-3 py-4">
                {proposalItem.isApproved ? 'Approved' : 'Not Approved'}
              </td>
              <td>
                <select
                  className="border2 px-3 py-2 outline-none rounded-lg"
                  onChange={(e) => handleApproval(e.target.value, proposalItem.vendor.id, proposalItem.id)}
                >
                  <option value="" disabled>Status</option>
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:<div className='text-center'>no proposals found</div>}
    
    </div>
  );
};

export default ViewJobProposals;

