import React from 'react';
import Register from './component/register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';
import Vendor from './section/vendor/Vendor.jsx';
import Proposal from './section/proposal/Proposal.jsx';
import Job from './section/job/Job.jsx';
import Modal from './component/Modal.jsx';
import ViewVendor from './section/vendor/ViewVendor.jsx';
import User from './section/user/User.jsx';

const router = createBrowserRouter([
  {
    path: '/',

    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        index:true,
        element: <User />
      },
      {
        path: 'proposal',
        element: <Proposal />
      },
      {
        path: 'job',
        element: <Job />
      },
      {
        path:"modal",
        element:<Modal/>
      },
      {
        path:"vendorview",
        element:<ViewVendor/>
      },{
        path:"vendor",
        element:<Vendor />
      }
    ],
  },
]);
const App = () => {
  return (
    <div className="font-roboto">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
