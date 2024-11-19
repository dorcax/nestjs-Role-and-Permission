import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { deleteJob, fetchJobs } from '../../Slices/jobSlice';
import ViewJob from './ViewJob';
import EditJob from './EditJob';

const JobTable = () => {
  const { jobs, loading } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const[isOpen,setIsOpen]=useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedJob,setSelectedJob] =useState(null)
  const navigate =useNavigate()
 
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);


  // handle job 
  const handleChange=(job)=>{
    setSelectedJob(job)
      setIsOpen(true)
  }
  const handleEditChange=(jobId)=>{
  setSelectedJob(jobId)
    setIsEditOpen(true)
  }
  // handleDelete job 
  const handleDelete=(jobId)=>{
    const confirmed =window.confirm("Are you sure you want to delete this job")
    if(confirmed){
      dispatch(deleteJob(jobId))
    }
     
  }
  const handleProposals =(jobId)=>{
   setSelectedJob(jobId)
   navigate(`/dashboard/viewJob/${jobId}`)
  }
  return (
    <div className="overflow-auto mt-6 max-w-sm sm:max-w-full">
      <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-900 text-left ">
            <th className="px-3 py-4 capitalize tracking-wider">Title</th>
            <th className="px-3 py-4 capitalize tracking-wider">Description</th>
            <th className="px-3 py-4 capitalize tracking-wider">Price</th>
            <th className="px-3 py-4 capitalize tracking-wider">isAssigned</th>
          </tr>
        </thead>
        <tbody className='whitespace-nowrap'>
          {jobs &&
            jobs.map((job) => (
              <tr key={job.id} className=" border-b-2 hover:bg-gray-100 transition-all text-sm">
                <td className="px-3 py-2">{job.title}</td>
                <td className="px-3 py-2">{job.description.length >40?`${job.description.substring(0,40)}...`:job.description}</td>
                <td className="px-3 py-2">{job.price}</td>
                <td className="px-3 py-2">{job.isAssigned ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="   mx-4 px-4 py-2 rounded-md capitalize bg-blue-800 text-white hover:bg-blue-600 transition-all"
                    onClick={() => handleChange(job)}
                  >
                    view
                  </button>
                </td>
                <td>
                  <button
                    className="mx-4 px-4 py-2 rounded-md capitalize bg-gray-600 text-white hover:bg-gray-800 transition-all"
                    onClick={() => handleProposals(job.id)}
                  >
                   view proposals
                  </button>
                </td>
                <td className=" px-4 sm:px-1 py-4 text-blue-800" onClick={()=>handleEditChange(job.id)}>
                  <i class="fa-solid fa-pen"></i>
                </td>
                
                <td className=" px-4 sm:px-1 py-4 text-red-700" onClick={()=>handleDelete(job.id)}>
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
            ))}
            {isOpen && <ViewJob isOpen={isOpen} setIsOpen={setIsOpen} selectedJob={selectedJob}/>}
            {isEditOpen && <EditJob isOpen={isEditOpen} setIsOpen={setIsEditOpen} selectedJobId={selectedJob}/>}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
