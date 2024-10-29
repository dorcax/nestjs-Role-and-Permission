import React from 'react';
import Register from './component/register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';
import Vendor from './section/user/Vendor.jsx';
import Proposal from './section/proposal/Proposal.jsx';
import Job from './section/job/Job.jsx';

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
        element: <Vendor />
      },
      {
        path: 'proposal',
        element: <Proposal />
      },
      {
        path: 'job',
        element: <Job />
      },
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
