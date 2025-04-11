import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import './Login.css';
import { IoLockOpenOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include", // Required for sending cookies
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message || "Login Successful!", { position: "top-center" });
        setTimeout(() => {
          navigate('/');
        }, );
      } else {
        toast.error(data.message || "Login Failed", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    }
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

        <div className="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me </label>
          </div>
          <Link  to={'/ForgotPassword'}>
          <span className="span">Forgot password?</span>
          </Link>
        </div>
        <button onClick={handleSubmit} className="button-submit" type="button">
          Sign In
        </button>
        <p className="p">
          Don't have an account? <span className="span"><Link to='/register'>Sign Up</Link></span>
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

export default Login;
