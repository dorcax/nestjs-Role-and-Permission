import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormError] = useState({});
  const navigate =useNavigate()
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const validateError = validateForm(data);
    setFormError(validateError);
    if(Object.keys(validateError)){
      dispatch(registerUser(data));
      setData({name:"",password:"",email:""})
       navigate("/login")
    }
   
  };
  // validate form
  const validateForm = (data) => {
    let error = {};
    if (!data.name) {
      error.name = 'name is required !';
    }
    if (!data.password) {
      error.password = 'password is required !';
    }
    if (!data.email) {
      error.email = 'email is required ! ';
    }
    return error;
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
        <h1 className="text-blue-800 text-2xl capitalize font-bold py-3">
          hi!
        </h1>
        <p className="text-md text-gray-900 ">Create a new account</p>
        <div className="">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            id=""
            placeholder="name"
            className={clsx("border-b-2  border-b-gray-400 w-[250px] outline-none",formErrors.name?"my-5":"my-10")}
          />
          {formErrors.name && (
            <div className="text-red-800 text-md">{formErrors.name}</div>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            id=""
            placeholder="email"
            className={clsx("border-b-2 border-b-gray-400  w-[250px] outline-none focus:bg-white",formErrors.password?"my-5":"my-8")}
          />
          {formErrors.email && (
            <div className="text-red-800 text-md">{formErrors.email}</div>
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
            className="border-b-2 border-b-gray-400 my-5 w-[250px] outline-none"
          />
          {formErrors.password && (
            <div className="text-red-800 text-md pb-3">
              {formErrors.password}
            </div>
          )}
        </div>
        <button
          className={clsx(
            'mx-auto w-[200px] text-center py-1 uppercase text-sm rounded-md my-6',
            loading ? 'bg-gray-400 text-white' : 'bg-blue-800 text-white' ,
          )}
          disabled={loading}
        >
          sign up
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
            Already have an account ?
            <span className="px-2 text-blue-800 text-md font-bold ">
              <Link to="/login">sign in</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
