import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignJob, findJob } from '../../Slices/jobSlice';
import { useParams } from 'react-router-dom';
import { approveProposal } from '../../Slices/proposalSlice';
import { fetchProposal } from '../../Slices/proposalSlice';

const ViewJobProposals = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { proposals } = useSelector((state) => state.proposal);
  const { jobs } = useSelector((state) => state.job);
  const job = jobs.find((job) => job.id === jobId);

  useEffect(() => {
    dispatch(findJob(jobId));
    dispatch(fetchProposal(jobId));
  }, [dispatch, jobId]);

  const handleApproval = (status, vendorId, proposalId) => {
    const isApproved = status === 'approve';
    dispatch(approveProposal({ vendorId, proposalId, isApproved }));
  };

  const handleAssignedJob = (status, vendorId, proposalId) => {
    console.log('job ID:', jobId);
    console.log('vendor ID:', vendorId);
    console.log('proposalID:', proposalId);

    const isAssigned = status === 'assign';
    if (status === 'assign') {
      dispatch(assignJob({ jobId, vendorId, proposalId, isAssigned }));
    } else if(status ==="unassign"){
      dispatch(assignJob({ jobId, vendorId, proposalId, isAssigned }));
    }
  };

  return (
    <div className="overflow-auto mt-6 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-blue-800 text-center">
        {job?.title || 'Job Title'}
      </h2>

      {proposals.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-200 text-gray-900 text-left">
              <th className="px-4 py-3 font-medium text-sm text-gray-700">
                Description
              </th>
              <th className="px-4 py-3 font-medium text-sm text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 font-medium text-sm text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 font-medium text-sm text-gray-700">
                Approve Proposal
              </th>
              <th className="px-4 py-3 font-medium text-sm text-gray-700">
                Assign Job
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(proposals) &&
              proposals.map((proposalItem) => (
                <tr
                  key={proposalItem.id}
                  className="border-b hover:bg-gray-50 text-sm"
                >
                  <td className="px-4 py-3">{proposalItem.description}</td>
                  <td className="px-4 py-3">${proposalItem.price}</td>
                  <td className="px-4 py-3">
                    {proposalItem.isApproved ? 'Approved' : 'Not Approved'}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="px-3 py-2 border rounded-lg outline-none"
                      onChange={(e) =>
                        handleApproval(e.target.value, jobId, proposalItem.id)
                      }
                    >
                      <option value="" disabled>
                        Status
                      </option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="px-3 py-2 border rounded-lg outline-none"
                      onChange={(e) =>
                        handleAssignedJob(
                          e.target.value,
                          proposalItem.vendor.id,
                          proposalItem.id,
                        )
                      }
                    >
                      <option value="" disabled>
                        Assign Job
                      </option>
                      <option value="assign">Assign Job</option>
                      <option value="unassign">Unassign</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No proposals found</div>
      )}
    </div>
  );
};

export default ViewJobProposals;
