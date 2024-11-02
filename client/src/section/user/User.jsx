
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchVendors } from '../../Slices/vendorSlice';
// import VendorTable from '.././VendorTable';
import GetStatistic from '../vendor/GetStatistic';

const User = () => {
    const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, vendor } = useSelector((state) => state.vendor);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy,setSortBy] =useState("")
    return (
        <section className="relative bg-gray-100 min-h-screen">
          <div className="container mx-auto px-8 py-10">
            <div className="flex flex-wrap gap-10 justify-start py-2 w-full">
              
              <GetStatistic/>
            </div>
            {/* table */}
            <div>
              <h1 className="text-md font-semibold text-gray-800 py-4 capitalize">
                All Vendors
              </h1>
              <div className="flex gap-6 justify-start">
                <div className="relative">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-2 w-[300px] py-1 rounded-md outline-none px-3 "
                    placeholder="search for vendor name "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="absolute right-3 top-2  " >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
    
                <select
                  name=""
                  id="filter"
                  className="w-[200px] rounded-md outline-none "
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">select status</option>
                  <option value="approved">approved</option>
                  <option value="pending">pending</option>
                  <option value="all">all</option>
                </select>
    
                
                  <select name="" id="" className='w-[200px] rounded-md outline-none' value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
    
                  <option>sort by</option>
                  <option value="ascending">ascending</option>
                  <option value="descending">descending </option>
                  </select>
                
              </div>
            </div>
            <div className="overflow-auto mt-6">
              {/* <VendorTable/> */}
            </div>
          </div>
        </section>
      );
}

export default User