import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from './UserTable';
import GetStatistic from '../vendor/GetStatistic';
import { fetchUsers } from '../../Slices/userSlice';


const User = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(()=>{
    dispatch(fetchUsers(searchTerm))
      },[dispatch,searchTerm])
  return (
    <section className="relative bg-gray-100 min-h-screen">
      <div className="container mx-auto px-8 py-10">
        <div>
          <GetStatistic />
        </div>
        {/* table */}
        <div>
          <h1 className="text-md font-semibold text-gray-800 py-4 capitalize">
            All Users
          </h1>
          <div className="flex gap-6 justify-start flex-wrap">
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
          </div>
        </div>
        <div className="overflow-auto mt-6 max-w-sm sm:max-w-full">
        
        <UserTable />
        </div>
        
      </div>
    </section>
  );
};

export default User;
