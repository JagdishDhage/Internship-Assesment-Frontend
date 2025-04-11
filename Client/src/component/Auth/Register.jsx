import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import './Register.css';
import { IoLockOpenOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiUser } from "react-icons/ci";
function Register() {
  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    axios.post('http://localhost:3000/user/Register', user)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message || "Login Successful!", { position: "top-center" });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error(error.response?.data?.message || "Login Failed", { position: "top-center" });
      });
  };

  const handleOnChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/user/google';
  };

  return (
    <div className='Login'>
      <form className="form">
      <div className="flex-column">
          <label>Name </label>
        </div>
        <div className="inputForm">
        <CiUser />
          <input
            placeholder="Enter your Name"
            className="input"
            type="text"
            onChange={handleOnChange}
            name="name"
          />
        </div>
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <MdOutlineAlternateEmail />
          <input
            placeholder="Enter your Email"
            className="input"
            type="text"
            onChange={handleOnChange}
            name="email"
          />
        </div>

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <IoLockOpenOutline />
          <input
            placeholder="Enter your Password"
            className="input"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleOnChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        </div>

       
        <button onClick={handleSubmit} className="button-submit" type="button">
          Sign In
        </button>
        <p className="p">
          Don't have an account? <span className="span">Login</span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row">
          <button
            className="btn google"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button className="btn apple" type="button">
            <FaApple size={20} />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
