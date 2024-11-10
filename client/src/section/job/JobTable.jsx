import React from 'react'

const JobTable = () => {
  return (
    <div className='overflow-auto mt-6'><table className="border-2 w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
    <thead>
      <tr className="text-gray-900 text-left">
        <th className="px-3 py-4 capitalize tracking-wider">Title</th>
        <th className="px-3 py-4 capitalize tracking-wider">Description</th>
        <th className="px-3 py-4 capitalize tracking-wider">Price</th>
        <th className="px-3 py-4 capitalize tracking-wider">isAssigned</th>
      
      </tr>
    </thead>
    <tbody>
    
    </tbody>
  </table>
  
</div>
  )
}

export default JobTable