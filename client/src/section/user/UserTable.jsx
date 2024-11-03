import React from 'react'

const UserTable = () => {
  return (
    <div>
    <table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden ">
        <thead>
        <tr className=" text-gray-900 text-left ">
              {/* <th className='px-6 py-6 font-medium uppercase tracking-wider'>id</th> */}

              <th className="px-3 py-4  capitalize tracking-wider">
                Name
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                email
              </th>
              <th className="px-3 py-4  capitalize tracking-wider">
                role
              </th>
              {/* <th className="px-3 py-4 capitalize tracking-wider">
                isApproved
              </th> */}
            </tr>

        </thead>
    </table>

    </div>
  )
}

export default UserTable