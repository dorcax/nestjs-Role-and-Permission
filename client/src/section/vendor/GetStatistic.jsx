import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveVendor, fetchStatistics } from '../../Slices/vendorSlice';
// import { stat } from 'fs/promises'
const GetStatistic = () => {
  const dispatch = useDispatch();
  //   const {statistics}=useSelector((state)=>state.vendor)
  const { statistics, loading, error } = useSelector(
    (state) => state.vendor.statistics,
  );
  console.log('Statistics data:', statistics);
  //

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);
  return (
    <div>
      <div>
        {statistics ? (
          <div className="flex flex-wrap gap-6">
            <div className="border-2 w-full sm:w-[220px] bg-white shadow-lg h-[100px] rounded-md flex flex-col items-center justify-center text-gray-700 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out ">
              Total Vendors <span>{statistics.totalVendors}</span>{' '}
            </div>
            <div className="border-2 w-full sm:w-[220px] bg-white shadow-lg h-[100px] rounded-md flex flex-col items-center justify-center text-gray-700 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out">
              Total Jobs <span>{statistics.totalJobs}</span>
            </div>
            <div className="border-2 w-full  sm:w-[220px] bg-white shadow-lg h-[100px] rounded-md flex flex-col items-center justify-center text-gray-700 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out">
              Approved Vendors <span> {statistics.approvedVendors}</span>
            </div>
            <div className="border-2 w-full sm:w-[220px] bg-white shadow-lg h-[100px] rounded-md flex flex-col items-center justify-center text-gray-700 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out">
              Total Users <span>{statistics.totalUsers} </span>
            </div>
          
         
        </div> 
        
        ) : (
          <p>Loading statistics...</p>
        )}
      </div>
    </div>
  );
};

export default GetStatistic;
