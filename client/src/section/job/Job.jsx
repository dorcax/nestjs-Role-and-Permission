import {React,useState} from 'react'
import GetStatistic from "../vendor/GetStatistic"
import JobTable from './JobTable';
import CreateJob from './CreateJob';
const Job = () => {
  const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy,setSortBy] =useState("")
    const[isOpen,setIsOpen] =useState(false)
  return (<section className="relative bg-gray-100 min-h-screen">
    <div className="container mx-auto px-8 py-10">
      <div className="flex flex-wrap gap-10 justify-start py-2 w-full">
        
        <GetStatistic/>
      </div>
      {/* table */}
      <div>
        <h1 className="text-md font-semibold text-gray-800 py-4 capitalize">
          All Jobs
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

          

          
            <select name="" id="" className='w-[200px] rounded-md outline-none' value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>

            <option>sort by</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending </option>
            </select>
          
        </div>
    
      </div>
   <div className='flex justify-end'>
     <button className='w-[150px] bg-blue-800  border-2 rounded-md py-2 capitalize text-white hover:bg-blue-600' onClick={()=>setIsOpen(true)}>
      add new job
    </button></div>
    {isOpen &&<CreateJob isOpen={isOpen} setIsOpen={setIsOpen}/>}
      <div className="">
      
        
      <JobTable/>
      </div>
    </div>
  </section>
  )
}

export default Job