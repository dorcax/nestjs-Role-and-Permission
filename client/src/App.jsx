import React from 'react';
import Register from './component/register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 const App = () => {
  return (
    <div className='font-roboto'>
      <ToastContainer/>
      <Register />
      
     
    </div>
  );
};


export default App
