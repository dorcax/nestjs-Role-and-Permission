import {React,useState} from 'react';
import { Outlet,Link } from 'react-router-dom';

const Dashboard = () => {
  const[isOpen,setIsOpen] =useState(false)



  const handleToggle=()=>{
setIsOpen(!isOpen)
  }
  return (

    <section className="bg-gray-200 w-full min-h-screen ">
      <div className="flex ">
        <div className="hidden md:block md:w-[10rem] md:min-h-screen bg-blue-950 ">
        <h2 className="text-white text-lg text-center py-2">VMS Dashboard</h2>
        <nav className=" mt-4 text-center">
            <ul>
              <li className="text-white hover:bg-blue-800 p-4 rounded">
                <Link to="/dashboard">User</Link>
              </li>
              <li className="text-white hover:bg-blue-800 p-4 rounded">
                <Link to="/dashboard/vendor">Vendor</Link>
              </li>
              <li className="text-white hover:bg-blue-800 p-4 rounded"><Link to="/dashboard/proposal">Proposal</Link></li>
              <li className="text-white hover:bg-blue-800 p-4 rounded"><Link to="/dashboard/job">Job Listing</Link></li>
              <li className="text-white hover:bg-blue-800 p-4 rounded">Payment</li>
              <li className="text-white hover:bg-blue-800 p-4 rounded">Setting</li>
            </ul>
          </nav>
        </div>
        <div className="flex-1 ">
          {/* {children} */}
          <div className=" w-full h-[4rem] shadow-2xl bg-white flex justify-between items-center px-10">
            <div className="relative flex items-center  ">
              <input
                type="search"
                name=""
                id=""
                className="border-2 w-[300px] px-10 rounded-xl outline-none "
                placeholder="Search..."
                aria-label="Search"
              />
              <span className="absolute left-2 px-2 ">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>

            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <button onClick={handleToggle} className='md:hidden'>
            {isOpen ?<i class="fa fa-times" aria-hidden="true"></i>:<i class="fa fa-bars" aria-hidden="true"></i>}
          {/* <i class="fa fa-bars" aria-hidden="true"></i> */}
          {/* <i class="fa fa-times" aria-hidden="true"></i> */}
          </button>
          </div>
          
          <div>
          {isOpen && <div className=" w-full h-[300px] bg-blue-950  transition-all duration-500 ease-in-out">
       
        <nav className=" pt-3 text-center overflow-hidden">
            <ul>
              <li className="text-white hover:bg-blue-800 p-3 rounded">
                <Link to="/dashboard">User</Link>
              </li>
              <li className="text-white hover:bg-blue-800 p-3 rounded">
                <Link to="/dashboard/vendor">Vendor</Link>
              </li>
              <li className="text-white hover:bg-blue-800 p-3 rounded"><Link to="/dashboard/proposal">Proposal</Link></li>
              <li className="text-white hover:bg-blue-800 p-3 rounded"><Link to="/dashboard/job">Job Listing</Link></li>
              <li className="text-white hover:bg-blue-800 p-3 rounded">Payment</li>
              <li className="text-white hover:bg-blue-800 p-3 rounded">Setting</li>
            </ul>
          </nav>
        </div>}
        <Outlet/></div>
        </div>
      </div>
     
    </section>
   
    
    
  );
};

export default Dashboard;
