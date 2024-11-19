import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../Slices/vendorSlice';
import VendorTable from './VendorTable';
import GetStatistic from './GetStatistic';

const Vendor = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, vendor } = useSelector((state) => state.vendor);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  // const token =JSON.parse(localStorage.getItem('token'));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    if (token) {
      let isApproved;
      if (filter === 'approved') {
        isApproved = true;
      } else if (filter === 'pending') {
        isApproved = false;
      } else {
        isApproved = undefined;
      }

      dispatch(fetchVendors({ isApproved, searchTerm }));
    } else {
      console.log('No token found');
    }
  }, [dispatch, token, filter, searchTerm]);

  return (
    <section className="relative bg-gray-100 min-h-screen overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-wrap gap-10 justify-start py-2 w-full">
          <GetStatistic />
        </div>
        {/* table */}
        <div>
          <h1 className="text-md font-semibold text-gray-800 py-4 capitalize">
            All Vendors
          </h1>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
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
              <span className="absolute right-3 top-2  ">
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
          </div>
        </div>
        <div className="overflow-auto mt-6 max-w-sm sm:max-w-full">
          <VendorTable />
        </div>
      </div>
    </section>
  );
};

export default Vendor;
