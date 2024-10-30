import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../Slices/vendorSlice';

const Vendor = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, vendor } = useSelector((state) => state.vendor);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // const token =JSON.parse(localStorage.getItem('token'));

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
  }, [dispatch, token, filter]);



  useEffect(() => {
    if (vendor.vendor) {
      setFilteredVendors(
        vendor.vendor.filter((vendorItem) =>
          vendorItem.businessName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [vendor, searchTerm]);

  const handleSearch = () => {
    if (vendor.vendor) {
      setFilteredVendors(
        vendor.vendor.filter((vendorItem) =>
          vendorItem.businessName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }}
  return (
    <section className="relative bg-gray-100 min-h-screen">
      <div className="container mx-auto px-8 py-10">
        <div className="flex flex-wrap gap-10 justify-start py-2 w-full">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="border-2 w-[220px] bg-white shadow-lg h-[100px] rounded-md flex items-center justify-center text-gray-700 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              <span className="text-lg font-medium">Vendor {index + 1}</span>
            </div>
          ))}
        </div>
        {/* table */}
        <div>
          <h1 className="text-md font-semibold text-gray-800 py-4 capitalize">
            All Vendors
          </h1>
          <div className="flex gap-6 justify-start">
            <div className="relative">
              <input
                type="search"
                name=""
                id=""
                className="border-2 w-[300px] py-1 rounded-md outline-none px-3 "
                placeholder="search for vendor name "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-2  " onClick={handleSearch}>
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

            <div>
              <select name="" id="">
                date created
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-auto mt-6">
          <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden ">
            <tr className=" text-gray-900 text-left ">
              {/* <th className='px-6 py-6 font-medium uppercase tracking-wider'>id</th> */}

              <th className="px-3 py-4  capitalize tracking-wider">
                businessName
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                description
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                businessAddress
              </th>
              <th className="px-3 py-4 capitalize tracking-wider">
                isApproved
              </th>
            </tr>

            <tbody>
              {vendor.vendor &&
                vendor.vendor.map((vendorItem) => (
                  <tr
                    className="border-b-2 hover:bg-gray-100 transition-all text-sm"
                    key={vendorItem.id}
                  >
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.businessName}
                    </td>
                    <td className="px-3 py-4 text-gray-700 ">
                      {/* {vendorItem.description >40 ?`{vendorItem.description.substring(0,40)}....`:vendorItem.description} */}
                      {vendorItem.description.length > 40
                        ? `${vendorItem.description.substring(0, 40)}...`
                        : vendorItem.description}
                    </td>
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.businessAddress}
                    </td>
                    <td className="px-3 py-4 text-gray-700">
                      {vendorItem.isApproved ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-4 text-blue-800">
                      <i class="fa-solid fa-pen"></i>
                    </td>
                    <td className="px-4 py-4 text-red-700">
                      <i class="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Vendor;
