import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { loginUser } from '../Slices/authSlice';
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({});
  const navigate =useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const validateError = validateForm(data);
    setFormError(validateError);
    // Only dispatch loginUser if there are no validation errors
      if (Object.keys(validateError).length === 0) {
    dispatch(loginUser(data));
      setData({email:"",password:""})
      navigate("/dashboard")
      
      }

  
  };

  //   validation error
  const validateForm = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = 'enter a valid email !';
    }
    if (!data.password) {
      errors.password = 'enter your password !';
    }
    return errors;
  };
  return (
    <section className=" container shadow-2xl rounded-2xl w-[350px]  mx-auto my-20">
      <form
        action=""
        method="post"
        className="  p-10 flex flex-col justify-center items-start"
        onSubmit={handleSubmission}
      >
        <span className="">
          <i className="fa-solid fa-arrow-left text-blue-800 text-lg pb-4"></i>
        </span>
        <h1 className="text-blue-800 text-2xl capitalize font-bold pt-3">
          welcome!
        </h1>
        <p className="text-md text-gray-900 pb-4">Sign in to continue</p>

        <div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            id=""
            placeholder="email"
            className={clsx(
              'border-b-2 border-b-gray-400 outline-none w-[250px] focus:bg-white',
              formError.email ? 'my-2' : 'my-10',
            )}
          />
          {formError.email && (
            <div className="text-red-800 text-md">{formError.email}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            id=""
            placeholder="password"
            className={clsx(
              'border-b-2 border-b-gray-400  w-[250px] outline-none',
              formError.password ? 'my-2' : 'my-5',
            )}
          />
          {formError.password && (
            <div className="text-red-800 text-md pb-3">
              {formError.password}
            </div>
          )}
        </div>
        <button
           className={clsx(
            'mx-auto w-[200px] text-center py-1 uppercase text-sm rounded-md my-6',
            loading ? 'bg-gray-400 text-white' : 'bg-blue-800 text-white' ,
          )}
          disabled={loading }
        >
          Login
        </button>

        <div className="flex justify-center items-center w-full mt-2">
          <div className="border-t-2 border-gray-400 flex-grow" />
          <span className="px-2  text-blue-800 font-semibold">or</span>
          <div className="border-t-2 border-gray-400 flex-grow" />
        </div>
        <p className="text-center mt-6 text-blue-800 mx-auto capitalize">
          social media signup
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mt-4 items-center mx-auto pb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-blue-800"
          >
            <i className="fab fa-facebook-f text-3xl"></i> {/* Font Awesome */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-blue-500"
          >
            <i className="fab fa-twitter text-3xl"></i> {/* Font Awesome */}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-blue-600"
          >
            <i className="fab fa-linkedin-in text-3xl"></i> {/* Font Awesome */}
          </a>
        </div>
        <div className="mx-auto">
          <p className="text-sm  text-gray-900">
            Don't have an account ?
            <span className="px-2 text-blue-800 text-md font-bold ">
              <Link to="/">sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
