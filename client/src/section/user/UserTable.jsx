import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../Slices/userSlice';
import UpdateUser from './UpdateUser';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loadingg } = useSelector((state) => state.user);
  const [selectedUser,setSelectedUser]=useState(null)
  const[isOpen,setIsOpen] =useState(false)


  const handleUpdateChange =(id)=>{
    setSelectedUser(id)
    setIsOpen(true)
  }
  const handleDelete=(id)=>{
    dispatch(deleteUser(id))
    .then(()=>{
      dispatch(fetchUsers())
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  }
  return (
    <div >
      <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg  ">
        <thead>
          <tr className=" text-gray-900 text-left ">
            {/* <th className='px-6 py-6 font-medium uppercase tracking-wider'>id</th> */}

            <th className="px-3 py-4  capitalize tracking-wider">Name</th>
            <th className="px-3 py-4  capitalize tracking-wider">email</th>
            <th className="px-3 py-4  capitalize tracking-wider">role</th>
          </tr>
        </thead>
        <tbody>
          {users &&users.length >0 ?(
            users.map((userItem) => (
              <tr
                className="border-b-2 hover:bg-gray-100 transition-all text-sm"
                key={userItem?.id}
              >
                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                  {userItem?.name}
                </td>
                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                  {userItem?.email}
                </td>
                <td className="px-3 py-4 text-gray-700">
                  {userItem?.role}
                </td>
                <td className="px-3 md:px-1 py-4 text-blue-800" onClick={()=>handleUpdateChange(userItem)}>
                      <i class="fa-solid fa-pen"></i>
                    </td>
                    <td className="px-3 md:px-1 py-4 text-red-700" onClick={()=>handleDelete(userItem.id)}>
                      <i class="fa-solid fa-trash"></i>
                    </td>
              </tr>
))



):(
  <tr>
      <td colSpan="3">No users found</td>
  </tr>
)}
        </tbody>
      </table>
   {open && <UpdateUser open={isOpen} setIsOpen={setIsOpen}  selectedUser={selectedUser}/>}
    </div>
  );
};

export default UserTable;
